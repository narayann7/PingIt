const ErrorHandlerClass = require("../services/error_handler_class");
const JwtService = require("../services/jwt_service");
const User = require("../models/user_model");
const commonFunctions = require("../services/common_functions");

const getAccessTokenController = {
  async getAccessToken(req, res, next) {
    let accessToken;
    let refreshToken = req.body.refreshtoken;
    if (!refreshToken) {
      return next(ErrorHandlerClass.custom("refresh token is required", 400));
    }
    console.log(refreshToken);

    try {
      let result = JwtService.refreshVerify({
        token: req.body.refreshtoken,
      });
      if (!result) return next(ErrorHandlerClass.invaildAccessToken);
      const { _id, email } = result;
      User.findOne({ _id: _id })
        .then((result) => {
          const { _id, email, password } = result;
          const secret = commonFunctions.base64encode(password);
          //token
          accessToken = JwtService.sign({
            payload: { _id: _id, email: email },
            secret: secret,
            expiry: 15,
          });

          res.status(200).json({
            accessToken,
            refreshToken,
          });

          if (!result) {
            return next(ErrorHandlerClass.notExist());
          }
        })
        .catch((err) => {
          return next(err);
        });
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = getAccessTokenController;
