import dotenv from "dotenv";
import { connect } from "mongoose";
import { app } from "./server.js";

dotenv.config();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

export async function connectToDBAndServer() {
  try {
    await connect(MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`Connected to MongoDB and listening on ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}
