const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: "String",
    required: true,
  },
  username: {
    type: "String",
    required: true,
  },
  email: {
    type: "String",
    required: false,
  },
  password: {
    type: "String",
    required: true,
  },
  authenticationCode: {
    type: "String",
    required: false,
  },
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
