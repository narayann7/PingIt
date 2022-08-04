const commonFunctions = require("../services/common_functions");
const ErrorHandlerClass = require("../services/error_handler_class");
const JwtService = require("../services/jwt_service");
const User = require("../models/user_model");

const controller = {
  sendOtp: async (req, res, next) => {
    //validate the request body
    let valid = commonFunctions.validSignUp(req.body);

    if (valid instanceof ErrorHandlerClass) {
      return next(valid);
    }
    const { email, username, password } = req.body;

    try {
      //check if the user already exists
      const exist = await User.exists({ email: email });
      if (exist) {
        return next(ErrorHandlerClass.alreadyExist());
      }
    } catch (error) {
      return next(error);
    }

    //created opt
    // let otp = Math.floor(100000 + Math.random() * 900000);
    let otp = "123456";
    console.log(otp);

    //created jwt token for opt with 30s limit
    otp_token = JwtService.sign({
      payload: { otp: otp },
      expiry: 30,
      secret: commonFunctions.base64encode(email),
    });

    //send the otp token to the user
    respond = {
      otp_token,
      email: email,
      username: username,
      password: password,
    };

    res.status(200).json(respond);
  },
};
module.exports = controller;
