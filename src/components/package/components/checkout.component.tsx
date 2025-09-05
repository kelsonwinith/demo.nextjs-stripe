"use client";

import PaymentForm from "@/components/package/components/paymentForm.component";
import { usePackageContext } from "@/components/package/context/package.context";
import { getClientSecret } from "@/lib/api";
import { Elements } from "@stripe/react-stripe-js";
import { Appearance, loadStripe } from "@stripe/stripe-js";
import { useSuspenseQuery } from "@tanstack/react-query";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
);

export default function Checkout() {
  const { selectedPackage } = usePackageContext();

  const { data: clientSecret } = useSuspenseQuery({
    queryKey: ["checkout"],
    queryFn: async () => await getClientSecret(selectedPackage.current),
  });

  const appearance: Appearance = {
    theme: "flat",
    rules: {
      ".Label": {
        color: getCssVariable("--color-primary"),
      },
      ".Input": {
        color: getCssVariable("--color-primary-foreground"),
        fontWeight: "500",
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={{ appearance, clientSecret }}>
      <PaymentForm />
    </Elements>
  );
}

function getCssVariable(varName: string) {
  const root = document.documentElement;
  return getComputedStyle(root).getPropertyValue(varName).trim();
}
