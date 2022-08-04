const commonFunctions = require("../services/common_functions");
const ErrorHandlerClass = require("../services/error_handler_class");
const JwtService = require("../services/jwt_service");
const bcrypt = require("bcrypt");
const common = require("./common");
const User = require("../models/user_model");
const UserFriends = require("../models/user_friend_list");

const controller = {
  signUp: async (req, res, next) => {
    let { otp_token, otp, email, username, password } = req.body;

    //validate otp
    let verfied = JwtService.verify({
      token: otp_token,
      secret: commonFunctions.base64encode(email),
    });

    if (!verfied) {
      return next(ErrorHandlerClass.custom("OTP token is invalid", 401));
    }
    if (verfied.otp != otp) {
      return next(ErrorHandlerClass.custom("OTP is invalid", 401));
    }

    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      username,
      password: hashedPassword,
      authType: "EMAIL",
      displayPictureUrl: "",
    });
    try {
      const userDetails = await user.save();

      const result = common.setUserInDb(userDetails);

      const { accessToken, refreshToken, id } = result;
      var userFriend = new UserFriends({
        userId: id,
      });

      userFriend.save((err, result) => {
       
      });

      res.status(200).json({
        accessToken,
        refreshToken,
        user,
      });
    } catch (error) {
      return next(ErrorHandlerClass.custom(error, 400));
    }
  },
};

module.exports = controller;
