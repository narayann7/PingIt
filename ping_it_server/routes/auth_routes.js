const express = require("express");
const router = express.Router();
const controllers = require("../controllers/base");
const isAuthenticated = require("../middlewares/is_authenticated");

router.post("/sendotp", controllers.sendOtp);
router.post("/signup", controllers.signUp);
router.post("/login", controllers.login);
router.get("/getaccesstoken", controllers.getAccessToken);
router.get("/google", controllers.loginWithGoogle);
router.get("/google/callback", controllers.loginWithGoogleCallback);

//---------------------- TESTING ------------------------
router.get("/test", (req, res) => {

  if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
 }
 
 localStorage.setItem('myFirstKey', 'myFirstValue');
 console.log(localStorage.getItem('myFirstKey'));
  res.send("hello");
  // if (req.User) {
  //   res.json({
  //     message: "success",
  //     user: req.User,
  //   });
  // } else {
  //   res.json({
  //     message: "fail",
  //   });
  // }
});

module.exports = router;
