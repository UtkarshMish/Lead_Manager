const { USERNAME, PASSWORD } = require("./.env");
const mongoose = require("mongoose");
module.exports = mongoose.connect(
  `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0-xby9y.mongodb.net/leadManager?retryWrites=true`,
  { useNewUrlParser: true, useCreateIndex: true },
  function(err, db) {
    if (err) throw err;
    console.log("Database connected!");
    // db.close();
  }
);
