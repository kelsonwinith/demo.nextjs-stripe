import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse<Package[]>> {
  return NextResponse.json([
    {
      id: "0",
      name: "Basic Plan",
      description: "A basic subscription plan",
      price: 9.99,
    },
    {
      id: "1",
      name: "Standard Plan",
      description: "A standard subscription plan",
      price: 19.99,
    },
    {
      id: "2",
      name: "Premium Plan",
      description: "A premium subscription plan",
      price: 29.99,
    },
  ]);
}
