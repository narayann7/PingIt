const commonFunctions = require("../services/common_functions");
const ErrorHandlerClass = require("../services/error_handler_class");
const JwtService = require("../services/jwt_service");
const bcrypt = require("bcrypt");
const User = require("../models/user_model");

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
    });
    try {
      const result = await user.save();

      let secret = commonFunctions.base64encode(hashedPassword);
      //token
      accessToken = JwtService.sign({
        payload: { _id: result._id, email: result.email },
        secret: secret,
        expiry: 30,
      });
      refreshToken = JwtService.refreshSign({
        payload: {
          _id: result._id,
          email: result.email,
        },
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
