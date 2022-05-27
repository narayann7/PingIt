const commonFunctions = require("../services/common_functions");
const ErrorHandlerClass = require("../services/error_handler_class");
const JwtService = require("../services/jwt_service");
const bcrypt = require("bcrypt");
const common = require("./common");
const User = require("../models/user_model");

const controller = {
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const result = await User.findOne({ email: email });
      if (!result) {
        return next(ErrorHandlerClass.notExist());
      }

      const check = await bcrypt.compare(password, result.password);

      if (!check) return next(ErrorHandlerClass.passwordNotMatched());

      const { accessToken, refreshToken } = common.setUserInDb(result);
      res.json({ accessToken, refreshToken });
    } catch (error) {
      return next(error);
    }
  },
};
module.exports = controller;