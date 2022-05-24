const ErrorHandlerClass = require("../services/error_handler_class");

const error_handler = (err, req, res, next) => {
  let error_data = {
    status: 500,
    message: "Internal Server Error",
    error: err.message,
  };
  if (err instanceof ErrorHandlerClass) {
    error_data.status = err.status;
    error_data.message = err.message;
  }
  res.status(error_data.status).json(error_data);
};

module.exports = error_handler;
