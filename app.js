import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import subscriptionRoutes from "./src/routes/subscriptionRoutes.js";
import { subscriptionCron } from "./src/middleware/cronjobService.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ MongoDB Connected");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1);
    }
};
app.use(bodyParser.json());

app.use(cors());

connectDB();
// Routes
app.use("/api", subscriptionRoutes);
// subscriptionCron();

app.get("/api", (req, res) => {
    res.send("Subscription Payment Microservice is running");
});

app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`));