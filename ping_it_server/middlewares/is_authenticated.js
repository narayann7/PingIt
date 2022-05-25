const ErrorHandlerClass = require("../services/error_handler_class");
const JwtService = require("../services/jwt_service");
const User = require("../models/user_model");

const isAuthenticated = (req, res, next) => {
  let authHeader = req.headers.authorization;

  if (!authHeader) return next(ErrorHandlerClass.invaildAccessToken);

  try {
    const accessToken = authHeader.split(" ")[1];
    let result = JwtService.refreshVerify({
      token: accessToken,
    });
    console.log(result);
    if (!result) return next(ErrorHandlerClass.invaildAccessToken);

    const { _id, email } = result;

    // const result = await

    User.findOne({ _id: _id })
      .then((result) => {
        console.log(result);

        if (!result) {
          return next(ErrorHandlerClass.notExist());
        }
      })
      .catch((err) => {
        return next(err);
      });

    const user = {
      _id,
      email,
    };

    req.User = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = isAuthenticated;
