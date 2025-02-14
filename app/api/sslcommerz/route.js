import Stripe from "stripe";

const stripe = new Stripe("sk_test_51Qs8sAKHFBYhMdXmFL2B3cVidjfTEc1qcrJZj8ltE0eFAISOsI4ywtgldgzqEUzQZUROX6VwrhhQq796vOHIhsJ000rd7ppBQ0");

export async function POST(req) {
  try {
    const { amount, currency, email } = await req.json(); // Get payment details from the request

    if (!amount || !currency || !email) {
      return new Response(JSON.stringify({ message: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log("Creating Stripe Payment Intent...");

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert amount to cents
      currency,
      receipt_email: email,
      payment_method_types: ["card"],
      description: "Test Payment with Stripe",
    });

    console.log("Payment Intent Created:", paymentIntent);

    return new Response(JSON.stringify({ clientSecret: paymentIntent.client_secret }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ message: "Server error", error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
