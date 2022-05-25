const signUpController = require("../controllers/sign_up_controller");
const sendOtpController = require("../controllers/opt_controller");
const getAccessTokenController = require("../controllers/get_access_token");
const controller = {
  signUp: signUpController.signUp,
  sendOtp: sendOtpController.sendOtp,
  getAccessToken: getAccessTokenController.getAccessToken,
};
module.exports = controller;
