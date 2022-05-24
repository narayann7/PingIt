const express = require("express");
const router = express.Router();
const controllers = require("../controllers/base");

router.post("/sendopt", controllers.sendOtp);
router.post("/signup", controllers.signUp);



module.exports = router;
