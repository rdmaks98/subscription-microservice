import cron from "node-cron";
import { Subscription } from "../models/subscriptionModel.js";

export const subscriptionCron = () => {
    cron.schedule("*/5 * * * *", async () => { // runs every day at midnight
        const today = new Date();
        const expiredSubscriptions = await Subscription.find({ endDate: { $lte: today }, status: "Active" });

        for (let sub of expiredSubscriptions) {
            sub.status = "Expired";
            await sub.save();
            console.log(`Subscription ${sub._id} expired.`);
        }
    });
}
