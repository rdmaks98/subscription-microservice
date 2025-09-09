import { Plan } from "../models/planModel.js";
import { Subscription } from "../models/subscriptionModel.js";
import { createOrder } from "../services/paymentService.js";
import { sendEmail } from "../services/notificationService.js";

export const subscriptionController = {
    async createPlan(req, res) {
        try {
            const { name, price, duration, features } = req.body;
            const plan = new Plan({ name, price, duration, features });
            await plan.save();
            res.json({ success: true, plan });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },


    async getPlans(req, res) {
        try {
            const plans = await Plan.find();
            res.json(plans);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async subscribe(req, res) {
        try {
            const { userId, planId, email } = req.body;
            const plan = await Plan.findById(planId);
            if (!plan) return res.status(404).json({ error: "Plan not found" });

            // Razorpay order
            const order = await createOrder(plan.price, plan.currency);

            // Save subscription
            const subscription = new Subscription({
                userId,
                planId,
                endDate: new Date(Date.now() + plan.duration * 24 * 60 * 60 * 1000),
                status: "Active",
                paymentId: order.id
            });
            await subscription.save();

            // Send notification
            await sendEmail(email, "Subscription Started", `Your subscription for ${plan.name} started.`);

            res.json({ success: true, order, subscription });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async cancelSubscription(req, res) {
        try {
            const { id } = req.params;
            const subscription = await Subscription.findById(id);
            if (!subscription) return res.status(404).json({ error: "Subscription not found" });

            subscription.status = "Cancelled";
            await subscription.save();
            res.json({ success: true, subscription });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}