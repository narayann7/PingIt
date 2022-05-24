const signUpController = require("../controllers/sign_up_controller");
const sendOtpController = require("../controllers/opt_controller");
const controller = {
  signUp: signUpController.signUp,
  sendOtp: sendOtpController.sendOtp,
};
module.exports = controller;
