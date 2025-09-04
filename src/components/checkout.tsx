"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useCheckout, usePayment } from "@/hooks/checkout.hook";
import { Package } from "@/types/package.type";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { Appearance, loadStripe } from "@stripe/stripe-js";
import { AlertCircle, CreditCard, LoaderCircle } from "lucide-react";
import { RefObject } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
);

type ShareProps = {
  pkg: RefObject<Package | null>;
};

export default function Checkout({ pkg }: ShareProps) {
  const { clientSecret } = useCheckout({ pkg });

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
      <PaymentForm pkg={pkg} />
    </Elements>
  );
}

function PaymentForm({ pkg }: ShareProps) {
  const { stripe, elements, message, isLoading, handleSubmit } = usePayment();

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <PaymentElement
        options={{
          layout: "tabs",
          fields: { billingDetails: { email: "never" } },
        }}
      />
      {message && (
        <Alert variant="destructive">
          <AlertCircle />
          <AlertTitle>Unable to process your payment.</AlertTitle>
          <AlertDescription>
            <p>Please verify your billing information and try again.</p>
            <ul className="list-inside list-disc text-sm">
              <li>{message}</li>
            </ul>
          </AlertDescription>
        </Alert>
      )}
      <Button disabled={isLoading || !stripe || !elements}>
        {isLoading ? (
          <LoaderCircle className="animate-spin" />
        ) : (
          <div className="flex flex-row items-center gap-2">
            <CreditCard />
            Pay now
            <span className="font-medium">
              ({pkg.current?.price}. {pkg.current?.currency.toLocaleUpperCase()}
              )
            </span>
          </div>
        )}
      </Button>
    </form>
  );
}

function getCssVariable(varName: string) {
  const root = document.documentElement;
  return getComputedStyle(root).getPropertyValue(varName).trim();
}
