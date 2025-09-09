import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: Number, required: true }, // in days
    currency: { type: String, default: "INR" },
    features: [String],
    createdAt: { type: Date, default: Date.now }
});

export const Plan = mongoose.model("Plan", planSchema);