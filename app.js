import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import subscriptionRoutes from "./src/routes/subscriptionRoutes.js";
import { subscriptionCron } from "./src/middleware/cronjobService.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(bodyParser.json());

subscriptionCron();
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// Routes
app.use("/api", subscriptionRoutes);

app.get("/", (req, res) => {
    res.send("Subscription Payment Microservice is running");
});

app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`));