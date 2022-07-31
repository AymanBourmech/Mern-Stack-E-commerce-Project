import express from "express";
const router = express.Router();
import stripe from "stripe";

const Stripe = stripe(process.env.STRIPE_SECRET_KEY);
router.post("/", async (req, res) => {
  let status, error;
  const { token, amount } = req.body;
  try {
    await Stripe.charges.create({
      source: token.id,
      amount,
      currency: "usd",
    });
    status = "success";
  } catch (error) {
    console.log(error);
    status = "Failure";
  }
  res.json({ error, status });
});
export default router;
