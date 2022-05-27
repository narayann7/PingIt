const signUpController = require("../controllers/sign_up_controller");
const loginController = require("../controllers/login_controller");
const sendOtpController = require("../controllers/opt_controller");
const getAccessTokenController = require("../controllers/get_access_token");
const googleController = require("../controllers/login_with_google");

const controller = {
  signUp: signUpController.signUp,
  sendOtp: sendOtpController.sendOtp,
  getAccessToken: getAccessTokenController.getAccessToken,
  loginWithGoogle: googleController.loginWithGoogle,
  loginWithGoogleCallback: googleController.loginWithGoogleCallback,
  login: loginController.login,
};
module.exports = controller;
