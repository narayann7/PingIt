class ErrorHandlerClass extends Error {
  // let status,message;
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  static custom(message, code=400) {
    return new ErrorHandlerClass(code, message);
  }
  static alreadyExist(message = "this email is already used") {
    return new ErrorHandlerClass(406, message);
  }
  static notExist(message = "email not found. please sign up") {
    return new ErrorHandlerClass(409, message);
  }
  static userNotExist(message = "user not exist") {
    return new ErrorHandlerClass(409, message);
  }
  static passwordNotMatched(message = "Password Not Matched") {
    return new ErrorHandlerClass(409, message);
  }
  static invaildAccessToken(message = "unauthorised account") {
    return new ErrorHandlerClass(409, message);
  }
  static invaildRefreshToken(message = "Invaild Refresh Token") {
    return new ErrorHandlerClass(409, message);
  }
  static noNotes(message = "no notes ,create one") {
    return new ErrorHandlerClass(409, message);
  }
  static noNoteFound(message = "no note found") {
    return new ErrorHandlerClass(409, message);
  }
}
module.exports = ErrorHandlerClass;
