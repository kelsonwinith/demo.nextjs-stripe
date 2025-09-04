import { mockPackages } from "@/database/mockup";
import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ pkgId: string }> },
) {
  try {
    const { pkgId } = await params;

    const pkg = mockPackages.find((p) => p.id === pkgId);
    if (!pkg) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: pkg.price * 100,
      currency: pkg.currency,
      receipt_email: "customer@example.com",
      automatic_payment_methods: { enabled: true },
    });
    return NextResponse.json(paymentIntent.client_secret);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
