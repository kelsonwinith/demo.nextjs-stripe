"use client";

import { useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

export default function usePaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/success",
        payment_method_data: {
          billing_details: {
            email: "example@example.example",
          },
        },
      },
    });

    if (error) setMessage(error.message || "An unexpected error occurred.");

    setIsLoading(false);
  };

  return { stripe, elements, message, isLoading, handleSubmit };
}
