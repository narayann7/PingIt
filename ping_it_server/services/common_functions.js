const ErrorHandlerClass = require("./error_handler_class");

const commonFunctions = {
  validSignUp: function (body) {
    if (this.isEmail(body.email) == false) {
      if (body.email == "") {
        return ErrorHandlerClass.custom("email is required", 400);
      }
      return ErrorHandlerClass.custom("invalid email", 400);
    }
    if (this.isPassword(body.password) == false) {
      return ErrorHandlerClass.custom(
        "password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
        400
      );
    }
    if (body.username == "") {
      return ErrorHandlerClass.custom("name is required", 400);
    }
    if (body.username.length < 3) {
      return ErrorHandlerClass.custom("name length should greater than 5", 400);
    }

    return true;
  },
  isEmail: (email) => {
    var regExp =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regExp.test(email);
  },
  isPassword: (str) => {
    //Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
    var regExp =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/;

    return regExp.test(str);
  },
  base64encode: (str) => {
    return Buffer.from(str).toString("base64");
  },
  base64decode: (str) => {
    return Buffer.from(str, "base64").toString("ascii");
  },

  getCurrentTime: () => {
    var today = new Date();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return time;
  },
};

module.exports = commonFunctions;
