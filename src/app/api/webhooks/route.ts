import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let event;

  try {
    const signature = (await headers()).get("stripe-signature");
    if (!signature) throw new Error("No stripe-signature header found");

    event = stripe.webhooks.constructEvent(
      await req.text(),
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string,
    );
  } catch (err: any) {
    const errorMessage = err.message;
    // On error, log and return the error message.
    if (err) console.log(err);
    console.log(`Error message: ${errorMessage}`);
    return NextResponse.json(
      { message: `Webhook Error: ${errorMessage}` },
      { status: 400 },
    );
  }

  const permittedEvents = ["payment_intent.succeeded"];

  if (permittedEvents.includes(event.type)) {
    let data;

    try {
      switch (event.type) {
        case "payment_intent.succeeded":
          data = event.data.object;
          console.log(`Payment status: ${data.status}`);
          break;
        default:
          throw new Error(`Unhandled event: ${event.type}`);
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { message: "Webhook handler failed" },
        { status: 500 },
      );
    }
  }
  // Return a response to acknowledge receipt of the event.
  return NextResponse.json({ message: "Received" }, { status: 200 });
}
