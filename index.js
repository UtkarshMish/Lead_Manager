const express = require("express");
const app = express();
var cors = require("cors");
const axios = require("axios");
const con = require("./database");
const mongoose = require("mongoose");
let Users = require("./schema");
let Leaddetails = require("./schema2");
const bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
var path = require("path");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
//USE CORS METHOD
app.use(cors());
//Get The Data
let locdata;
//Get The Lead Details
app.get("/api/leaddetails", async (reqst, res) => {
  let query = Leaddetails.find({}, null);
  let promise = await query.exec((err, data) => {
    locdata = data;
    return res.send(locdata);
  });
});
//Add a new Lead
app.post("/api/newlead", async (reqst, res) => {
  let newLead = new Leaddetails({
    name: reqst.body.name,
    mobile: reqst.body.mobile,
    email: reqst.body.email,
    address: reqst.body.address,
    area: reqst.body.area,
    enquiry_date: reqst.body.enquiry_date
  });
  console.log(newLead);
  let promise = await newLead.save(err => {
    if (!err) return res.send({ success: true });
  });
});
//Get the user Details
app.post("/api/auth", async (req, res) => {
  let userInput = { username: req.body.username, password: req.body.password };
  let query = Users.find(userInput, null);

  let promise = await query.exec((err, data) => {
    if (data[0] && data[0].password === userInput.password) {
      let token = jwt.sign(userInput, "secret");

      res.cookie("token", token);
      return res.send({ auth: true, token: token });
    } else return res.send({ auth: false });
  });
});

app.use("*", function(req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.listen(4000, () => console.log("server strted"));
