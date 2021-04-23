import mongoose from "mongoose";
import AutoIncrementer from "mongoose-sequence";
const AutoIncrement = AutoIncrementer(mongoose);
const { Schema } = mongoose;
const { String, Number, Date } = Schema.Types;
const Leaddetails = new Schema({
	name: {
		type: String,
		required: true,
	},
	mobile: {
		type: Number,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	area: {
		type: String,
		required: true,
	},
	enquiry_date: {
		type: Date,
		required: true,
	},
});
Leaddetails.plugin(AutoIncrement, { inc_field: "id" });

const LeadDetailsSchema = mongoose.model("Leaddetails", Leaddetails);
export default LeadDetailsSchema;
