const express = require("express");
const router = express.Router();
const signUpController = require("../controllers/sign_up_controller");

router.post("/signup", signUpController.signUp);

module.exports = router;
