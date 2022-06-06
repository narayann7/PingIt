const ErrorHandlerClass = require("../services/error_handler_class");
const User = require("../models/user_model");

const controller = {
  getSingleUser: async function (req, res, next) {
    let email = req.query.email;
    console.log(email);

    if (!email) {
      return next(ErrorHandlerClass.custom("email not found", 400));
    }
    try {
      let user = await User.findOne({
        email: email,
      });
      if (!user) {
        return next(ErrorHandlerClass.custom("user not found", 404));
      }

      user.password = undefined;
      user.authType = undefined;
      user.updatedAt = undefined;
      user.createdAt = undefined;

      res.json({
        message: "success",
        user: user,
      });
    } catch (error) {
      return next(error);
    }
  },
  getUsers: async function (req, res, next) {
    let name = req.query.name;
    if (name) {
      try {
        let users = await User.find({
          username: new RegExp(name, "i"),
        });
        if (!users) {
          return next(ErrorHandlerClass.custom("user not found", 404));
        }

        users.map((user, index) => {
          user.password = undefined;
          user.authType = undefined;
          user.updatedAt = undefined;
          user.createdAt = undefined;

          if (req.User.email == user.email) {
            users.splice(index, 1);
          }
        });

        res.json({
          users: users,
        });
      } catch (error) {
        return next(error);
      }
    } else {
      res.send("no where");
    }
  },
};
module.exports = controller;
