import { usePackageContext } from "@/components/package/context/package.context";
import usePaymentForm from "@/components/package/hooks/usePaymentForm.hook";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { PaymentElement } from "@stripe/react-stripe-js";
import { AlertCircle, CreditCard, LoaderCircle } from "lucide-react";

export default function PaymentForm() {
  const { selectedPackage } = usePackageContext();
  const { stripe, elements, message, isLoading, handleSubmit } =
    usePaymentForm();

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
              ({selectedPackage.current?.price}.{" "}
              {selectedPackage.current?.currency.toLocaleUpperCase()})
            </span>
          </div>
        )}
      </Button>
    </form>
  );
}
