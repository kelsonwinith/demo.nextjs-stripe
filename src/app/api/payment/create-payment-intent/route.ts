import { mockPackages } from "@/database/mockup";
import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { pkg } = body;

    const valid_pkg = mockPackages.find((p) => p.id === pkg.id);

    if (!valid_pkg) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    valid_pkg.price = pkg.price;

    const amountInMinorUnit = valid_pkg.price * 100;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInMinorUnit,
      currency: valid_pkg.currency,
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
