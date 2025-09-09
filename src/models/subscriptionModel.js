import mongoose from "mongoose";
const subscriptionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    planId: { type: mongoose.Schema.Types.ObjectId, ref: "Plan", required: true },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, required: true },
    status: { type: String, enum: ["Active", "Expired", "Cancelled"], default: "Active" },
    paymentId: { type: String },
    createdAt: { type: Date, default: Date.now }
});

export const Subscription = mongoose.model("Subscription", subscriptionSchema);