const commonFunctions = require("../services/common_functions");
const ErrorHandlerClass = require("../services/error_handler_class");

const controller = {
  signUp: (req, res, next) => {
    
    //validate the request body
    let result = commonFunctions.validSignUp(req.body);

    if (result instanceof ErrorHandlerClass) {
      return next(result);
    }
    if (result == true) {
        res.send(req.body);
      }
  },
};

module.exports = controller;
