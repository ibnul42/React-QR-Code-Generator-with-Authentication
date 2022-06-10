const { model, Schema } = require("mongoose");

const mySchema = new Schema({
  name: {
    type: "string",
    require: true,
  },
  username: {
    type: "string",
    unique: true,
    require: true,
  },
  password: {
    type: "string",
    require: true,
  },
  twofactor: {
    type: "string",
    require: true,
  },
});

module.exports = model("users", mySchema);
