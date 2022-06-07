const UserFriends = require("../models/user_friend_list");
const controller = {
  AddFriend: function (req, res, next) {
    try {
      UserFriends.findOneAndUpdate(
        {
          userId: req.User._id.valueOf(),
        },
        { $push: { friends: req.body } },
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
