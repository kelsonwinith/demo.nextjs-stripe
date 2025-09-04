import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { stripe } from "@/lib/stripe";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

type StatusType =
  | "succeeded"
  | "processing"
  | "requires_payment_method"
  | string;

const STATUS_CONTENT_MAP: Record<
  StatusType,
  {
    icon: ReactNode;
    text: string;
  }
> = {
  succeeded: {
    icon: (
      <span role="img" aria-label="Success">
        ✅
      </span>
    ),
    text: "Payment Succeeded!",
  },
  processing: {
    icon: (
      <span role="img" aria-label="Processing">
        ⏳
      </span>
    ),
    text: "Payment Processing...",
  },
  requires_payment_method: {
    icon: (
      <span role="img" aria-label="Failed">
        ❌
      </span>
    ),
    text: "Payment Failed",
  },
  default: {
    icon: (
      <span role="img" aria-label="Unknown">
        ❔
      </span>
    ),
    text: "Unknown Status",
  },
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    payment_intent: string;
    payment_intent_client_secret: string;
  }>;
}) {
  const { payment_intent, payment_intent_client_secret } = await searchParams;

  const paymentIntentId =
    typeof payment_intent === "string"
      ? payment_intent
      : Array.isArray(payment_intent)
        ? payment_intent[0]
        : undefined;

  if (!paymentIntentId) redirect("/");

  let paymentIntent;
  try {
    paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  } catch {
    redirect("/");
  }

  if (!paymentIntent) redirect("/");

  const status: StatusType = paymentIntent.status || "default";
  const statusContent =
    STATUS_CONTENT_MAP[status] || STATUS_CONTENT_MAP["default"];

  return (
    <div className="bg-background flex min-h-screen items-center justify-center">
      <Card className="mx-auto w-full max-w-md shadow-lg">
        <CardHeader className="flex flex-col items-center gap-2">
          <div className="mb-2 flex items-center justify-center rounded-full">
            <span className="text-3xl">{statusContent.icon}</span>
          </div>
          <CardTitle className="text-center text-xl font-bold">
            {statusContent.text}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {paymentIntent ? (
            <div className="mb-4">
              <table className="w-full text-sm">
                <tbody>
                  <tr>
                    <td className="text-muted-foreground font-medium">ID</td>
                    <td className="text-right">{paymentIntentId}</td>
                  </tr>
                  <tr>
                    <td className="text-muted-foreground font-medium">
                      Status
                    </td>
                    <td className="text-right">{status}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <Skeleton className="mb-4 h-12 w-full" />
          )}
          {paymentIntent && (
            <Button asChild variant="outline" className="mb-2 w-full">
              <Link
                href={`https://dashboard.stripe.com/payments/${paymentIntentId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View details
              </Link>
            </Button>
          )}
          <Button asChild className="w-full" variant="default">
            <Link href="/">Test another</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
