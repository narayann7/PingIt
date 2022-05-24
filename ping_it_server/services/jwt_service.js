const jwt = require("jsonwebtoken");

class JwtService {
  static sign({ payload, expiry = 30, secret = "accessKey" }) {
    return jwt.sign(payload, secret, { expiresIn: expiry });
  }
  static refreshSign({
    payload,
    expiry = "1y",
    secret = "refreshkey:T3gUOqjLl4Anf7E8SQwZpMESKeD9JzRo",
  }) {
    return jwt.sign(payload, secret, { expiresIn: expiry });
  }
  static verify({ token, secret = "accessKey" }) {
    try {
      let data = jwt.verify(token, secret);
      return data;
    } catch (error) {
      return false;
    }
  }
  static refreshVerify({
    token,
    secret = "refreshkey:T3gUOqjLl4Anf7E8SQwZpMESKeD9JzRo",
  }) {
    return jwt.verify(token, secret);
  }
}

module.exports = JwtService;
