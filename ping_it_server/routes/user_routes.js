const express = require("express");
const router = express.Router();
const controllers = require("../controllers/base");
const isAuthenticated = require("../middlewares/is_authenticated");

// ----  baseurl/api/user?email=your_email
router.get("/", isAuthenticated, controllers.getSingleUser);
router.get("/all", isAuthenticated, controllers.getUsers);
router.get("/me", isAuthenticated, controllers.getUser);
router.post("/me", isAuthenticated, controllers.updateUser);

//---------------------- TESTING ------------------------
router.get("/test", isAuthenticated, (req, res) => {
  res.send(`Hello ${req.query.name}`);
});

module.exports = router;
