const ErrorHandlerClass = require("../services/error_handler_class");
const JwtService = require("../services/jwt_service");
const User = require("../models/user_model");
const commonFunctions = require("../services/common_functions");

const isAuthenticated = (req, res, next) => {
  let authHeader = req.headers.authorization;
  let refreshToken = req.headers.refreshtoken;

  if (!authHeader) return next(ErrorHandlerClass.invaildAccessToken);

  try {
    const accessToken = authHeader.split(" ")[1];
    let result = JwtService.refreshVerify({
      token: refreshToken,
    });

    if (!result) return next(ErrorHandlerClass.invaildAccessToken);
    const { _id, email } = result;

    User.findOne({ _id: _id })
      .then((result) => {
        if (!result) {
          return next(ErrorHandlerClass.notExist());
        }
        const { _id, email, password, authType, username } = result;
        const secret = commonFunctions.base64encode(password);

        const validAccessToken = JwtService.verify({
          token: accessToken,
          secret: secret,
        });
        if (!validAccessToken)
          return next(ErrorHandlerClass.custom("Invalid access token", 401));

        const user = {
          _id,
          authType,
          username,
          email,
        };

        req.User = user;

        next();
      })
      .catch((err) => {
        return next(err);
      });
  } catch (error) {
    return next(error);
  }
};

module.exports = isAuthenticated;
