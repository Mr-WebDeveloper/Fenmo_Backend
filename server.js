import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import expenseRoutes from "./src/routes/expenseRoutes.js";
import connectDB from "./src/config/db.js";

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "*" }));
app.use(express.json());

app.use("/expenses", expenseRoutes);

app.get("/health", (req, res) => res.send("Server Running Successfully"));

app.use((req, res) => res.status(404).json({ error: "Route not found." }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error." });
});

const PORT = process.env.PORT || 8000;

const username = process.env.MONGO_USER;
const password = encodeURIComponent(process.env.MONGO_PASSWORD);
const cluster = process.env.MONGO_CLUSTER;
const dbName = process.env.MONGO_DB;

const mongoURL = `mongodb+srv://${username}:${password}@${cluster}/${dbName}?retryWrites=true&w=majority`;
  
connectDB(mongoURL).then(() => {
  app.listen(PORT, () => {
    console.log(`Fenmo API is running on http://localhost:${PORT}`);
  }); 
});
