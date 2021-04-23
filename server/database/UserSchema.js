import mongoose from "mongoose";
const { Schema } = mongoose;
const { Number, String } = Schema.Types;
const Users = new Schema({
	ID: {
		type: Number,
		unique: true,
	},
	username: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

const UserSchema = mongoose.model("Users", Users);
export default UserSchema;
