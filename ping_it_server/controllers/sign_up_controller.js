const commonFunctions = require("../services/common_functions");
const ErrorHandlerClass = require("../services/error_handler_class");
const JwtService = require("../services/jwt_service");
const bcrypt = require("bcrypt");
const User = require("../models/user_model");

const controller = {
  signUp: async (req, res, next) => {
    let { otp_token, email, username, password } = req.body;

    let verfied = JwtService.verify({
      token: otp_token,
      secret: commonFunctions.base64encode(email),
    });

    if (!verfied) {
      return next(ErrorHandlerClass.custom("OTP token is invalid", 401));
    }

    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      username,
      password: hashedPassword,
      refreshTokenId: email,
    });
    const result = await user.save();
    // let secret = commonFunctions.base64encode(email);
    // //token
    // accessToken = JwtService.sign({
    //   payload: { _id: result._id, email: result.email },
    //   secret: secret,
    // });
    // refreshToken = JwtService.refreshSign({
    //   _id: result._id,
    //   email: result.email,
    // });

    return res.status(200).json(user);
  },
};

module.exports = controller;
