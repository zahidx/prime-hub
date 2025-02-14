"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function PaymentPage() {
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initiatePayment = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: 100, 
            currency: "usd",
            email: "test@example.com",
          }),
        });

        const data = await res.json();
        if (res.ok && data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          alert("Payment initiation failed");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    initiatePayment();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-2xl font-semibold mb-6">Secure Payment</h1>

      {loading ? (
        <p className="text-gray-400">Loading payment details...</p>
      ) : clientSecret ? (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      ) : (
        <p className="text-red-500">Failed to load payment details</p>
      )}
    </div>
  );
}

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setErrorMessage("");

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: "http://localhost:3000/payment?status=success" },
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
    } else {
      alert("Payment successful!");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md w-96">
      <PaymentElement />
      {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full mt-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
}
