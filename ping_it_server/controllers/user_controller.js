const User = require("../models/user_model");

const controller = {
  getUser: function (req, res, next) {
    if (!req.User) {
      return next(ErrorHandlerClass.custom("user not found", 400));
    }

    res.json({
      message: "success",
      user: req.User,
    });
  },
  updateUser: async function (req, res, next) {
    if (!req.User) {
      return next(ErrorHandlerClass.custom("user not found", 400));
    }
    console.log(req.body);

    var update = {};
    if (req.body.username) {
      update.username = req.body.username;
    }
    if (req.body.displayPictureUrl) {
      update.displayPictureUrl = req.body.displayPictureUrl;
    }

    try {
      const finalResult = await User.findOneAndUpdate(
        {
          _id: req.User._id,
        },
        {
          $set: update,
        }
      );
      res.send(finalResult);
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = controller;
