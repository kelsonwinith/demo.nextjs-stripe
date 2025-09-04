"use client";

import { getClientSecret } from "@/lib/api";
import { Package } from "@/types/package.type";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { useSuspenseQuery } from "@tanstack/react-query";
import { RefObject, useState } from "react";

type UseCheckoutProps = {
  pkg: RefObject<Package | null>;
};

export function useCheckout({ pkg }: UseCheckoutProps) {
  const { data } = useSuspenseQuery({
    queryKey: ["checkout"],
    queryFn: async () => await getClientSecret(pkg.current?.id as string),
  });

  return { clientSecret: data };
}

export function usePayment() {
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
            email: "example@example.com",
          },
        },
      },
    });

    if (error) setMessage(error.message || "An unexpected error occurred.");

    setIsLoading(false);
  };

  return { stripe, elements, message, isLoading, handleSubmit };
}
