const signUpController = require("../controllers/sign_up_controller");
const loginController = require("../controllers/login_controller");
const sendOtpController = require("../controllers/opt_controller");
const getAccessTokenController = require("../controllers/get_access_token");
const googleController = require("../controllers/login_with_google");
const userController = require("./user_me_controller");
const getSingleUserController = require("../controllers/get_users");
const addFriendController = require("../controllers/add_friend");
const getFriendsController = require("../controllers/add_friend");

const controller = {
  //auth
  login: loginController.login,
  signUp: signUpController.signUp,
  sendOtp: sendOtpController.sendOtp,
  getAccessToken: getAccessTokenController.getAccessToken,
  loginWithGoogle: googleController.loginWithGoogle,
  loginWithGoogleCallback: googleController.loginWithGoogleCallback,

  //user
  getMe: userController.getMe,
  updateMe: userController.updateMe,
  getSingleUser: getSingleUserController.getSingleUser,
  getUsers: getSingleUserController.getUsers,
  addFriend: addFriendController.AddFriend,
  getFriends: getFriendsController.getFriends,
};
module.exports = controller;
