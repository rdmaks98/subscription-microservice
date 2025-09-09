import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

const createOrder = async (amount, currency = "INR") => {
    const options = {
        amount: amount * 100, // in paise
        currency,
        payment_capture: 1
    };
    const order = await razorpay.orders.create(options);
    return order;
};

export { createOrder, razorpay };