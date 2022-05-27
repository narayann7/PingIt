const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String,  },
    displayPictureUrl: { type: String },
    authType: { type: String },
    // refreshToken: { type: String, require: true, unique: true },
  },
  { timestamps: true }
);

const User = Mongoose.model("User", userSchema, "users");

module.exports = User;
