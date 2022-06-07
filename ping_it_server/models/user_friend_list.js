const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

const userFriendListSchema = new Schema(
  {
    userId: { type: String, require: true },
    friends: [
      {
        friendId: { type: String, require: true },
        friendName: { type: String, require: true },
        friendDisplayPictureUrl: { type: String, require: true },
        friendEmail: { type: String, require: true },
      },
    ],
  },
  { timestamps: true }
);
const UserFriends = Mongoose.model(
  "UserFriends",
  userFriendListSchema,
  "userFriends"
);

module.exports = UserFriends;
