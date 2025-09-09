import express from "express";
const router = express.Router();
import { subscriptionController } from "../controllers/subscriptionController.js";

router.post("/plans", subscriptionController.createPlan);
router.get("/plans", subscriptionController.getPlans);
router.post("/subscribe", subscriptionController.subscribe);
router.patch("/subscriptions/:id/cancel", subscriptionController.cancelSubscription);

export default router;