import { Package } from "@/types/package.type";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/api";

export async function getPackage(): Promise<Package[]> {
  const response = await fetch(`${API_URL}/package`);
  return response.json();
}

export async function getClientSecret(pkg: Package | null): Promise<string> {
  const response = await fetch(`${API_URL}/payment/create-payment-intent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pkg }),
  });
  return response.json();
}
