const mongoose = require("mongoose");
let Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);
let Leaddetails = new Schema({
  name: {
    type: "String",
    required: true
  },
  mobile: {
    type: "String",
    required: true
  },
  email: {
    type: "String",
    required: true
  },
  address: {
    type: "String",
    required: true
  },
  area: {
    type: "String",
    required: true
  },
  enquiry_date: {
    type: "String",
    required: true
  }
});
Leaddetails.plugin(AutoIncrement, { inc_field: "id" });

module.exports = mongoose.model("leadDetails", Leaddetails, "leadDetails");
