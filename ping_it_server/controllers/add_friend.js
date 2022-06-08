const UserFriends = require("../models/user_friend_list");
const ErrorHandlerClass = require("../services/error_handler_class");
const common = require("./common");
const controller = {
  AddFriend: async function (req, res, next) {
    try {
      var result = await common.addFriendDb(req.User._id.valueOf(), req.body);
      if (result instanceof ErrorHandlerClass) {
        return next(result);
      }
      result = await common.addFriendDb(req.body.friendId, {
        friendId: req.User._id.valueOf(),
        friendName: req.User.username,
        friendDisplayPictureUrl: req.User.displayPictureUrl,
        friendEmail: req.User.email,
      });
      if (result instanceof ErrorHandlerClass) {
        return next(result);
      }
      return res.status(200).json({
        message: "Friend added successfully",
      });
      // var userFriend = new UserFriends({
      //   userId: req.body.friendId,
      // });

      // userFriend.save((err, result) => {
      //   res.send(result);
      // });
    } catch (error) {
      return next(error);
    }
  },
  getFriends: function (req, res, next) {
    try {
      UserFriends.findOne(
        { userId: req.User._id.valueOf() },
        (error, success) => {
          res.send(success);
        }
      );
    } catch (error) {
      return next(error);
    }
  },
};
module.exports = controller;
