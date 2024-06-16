import cors from "cors";
import issueRoutes from "./routes/issues.js";
import express from "express";
import { connectToDBAndServer } from "./connect.js";

export const app = express();
app.use(cors());
app.use(express.json());
app.use((request, _, next) => {
  console.log(`PATH : (${request.path}) HTTP METHOD: (${request.method})`);
  next();
});

app.use("/api/issues", issueRoutes);

connectToDBAndServer();
