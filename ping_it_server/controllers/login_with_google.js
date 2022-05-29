const { urlGoogle, getGoogleAccountFromCode } = require("../services/google");
const User = require("../models/user_model");
const commonFunctions = require("../services/common_functions");
const ErrorHandlerClass = require("../services/error_handler_class");
const JwtService = require("../services/jwt_service");
const bcrypt = require("bcrypt");
const common = require("./common");
require("dotenv").config();
function sendData(userDetails, res) {
  const result = common.setUserInDb(userDetails);
  const { accessToken, refreshToken } = result;

  return {
    accessToken,
    refreshToken,
    userDetails,
  };
}

const controller = {
  loginWithGoogle: function (req, res) {
    let url = urlGoogle();
    res.redirect(url);
    // res.send({url})
  },

  loginWithGoogleCallback: async function (req, res, next) {
    var result = req.url;
    var code = result.split("code=")[1];
    var codex = code.split("&scope=")[0];
    codex = codex.replace(/%2F/g, "/");

    try {
      var data = await getGoogleAccountFromCode(codex);
      const { name, email, id, picture } = data;

      const exist = await User.exists({ email: email });

      let respond;
      if (exist) {
        const userDetails = await User.findOne({ email: email });
        respond = sendData(userDetails, res);
      } else {
        const hashedPassword = await bcrypt.hash(id, 10);

        const user = new User({
          email,
          username: name,
          password: hashedPassword,
          authType: "GOOGLE",
          displayPictureUrl: picture,
        });

        const userDetails = await user.save();
        respond = sendData(userDetails, res);
      }

      res.redirect(
        `${process.env.APP_BASE_URL}/login/?user=${respond.refreshToken}`
      );
    } catch (error) {
      next(error);
    }
  },
};

module.exports = controller;
