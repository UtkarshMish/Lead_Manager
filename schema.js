const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let Users = new Schema({
  ID: {
    type: "Number"
  },
  username: {
    type: "String",
    unique: true,
    required: true
  },
  password: {
    type: "String",
    required: true
  }
});

module.exports = mongoose.model("users", Users, "users");
