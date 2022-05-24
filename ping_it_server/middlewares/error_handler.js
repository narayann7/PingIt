const ErrorHandlerClass = require("../services/error_handler_class");

const error_handler = (err, req, res, next) => {
  let error_data = {
    code: 500,
    error_message: "Internal Server Error",
  };
  if (err instanceof ErrorHandlerClass) {
    error_data.code = err.status;
    error_data.error_message = err.message;
  }
 return res.status(error_data.code).json(error_data);
};

module.exports = error_handler;
