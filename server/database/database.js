import { config } from "dotenv";
import mongoose from "mongoose";
config();
let DB = null;
export async function connectDB() {
	const { URL, DB_PORT } = process.env;
	const URI = `mongodb://${URL}:&${DB_PORT}/leadManager?retryWrites=true`;
	const OPTIONS = { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true };
	const connectedDB = await mongoose.connect(URI, OPTIONS);
	DB = connectedDB;
	console.log("CONNECTED DB !!");
}
export function disconnectDB() {
	if (DB != null) {
		DB.disconnect();
	}
}
