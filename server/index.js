import express, { json, urlencoded } from "express";
const app = express();
import cors from "cors";
import { connectDB } from "./database/database.js";
import UserSchema from "./database/UserSchema.js";
import JsonWebToken from "jsonwebtoken";
import { join } from "path";
import LeadDetails from "./database/LeadDetails.js";

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static(join("./", "public")));
connectDB();
//USE CORS METHOD
app.use(cors());
//Get The Lead Details
app.get("/api/leaddetails", async (_reqst, res) => {
	let query = LeadDetails.find({}, null);
	let data = await query.exec();
	res.send(data);
});
//Add a new Lead
app.post("/api/newlead", async (reqst, res) => {
	let newLead = new LeadDetails({
		name: reqst.body.name,
		mobile: reqst.body.mobile,
		email: reqst.body.email,
		address: reqst.body.address,
		area: reqst.body.area,
		enquiry_date: reqst.body.enquiry_date,
	});
	console.log(newLead);
	try {
		let { errors } = await newLead.save();
		if (!errors) {
			return res.send({ success: true });
		}
	} catch (err) {
		res.send({ success: false, errors: err.message });
	}
});
//Get the user Details
app.post("/api/auth", async (req, res) => {
	const userInput = { username: req.body.username, password: req.body.password };
	const query = UserSchema.find(userInput, null);
	try {
		const response = await query.exec();
		if (response && response.password === userInput.password) {
			const token = JsonWebToken.sign(userInput, "secret");
			res.cookie("token", token);
			return res.send({ auth: true, token: token });
		}
	} catch (err) {
		return res.send({ auth: false, error: err.message });
	}
});

app.use("*", function (_req, res) {
	res.sendFile(join("./public", "index.html"));
});
const port = process.env.PORT || 4000;
app.listen(port, () => console.log("server strted on port: " + port));
