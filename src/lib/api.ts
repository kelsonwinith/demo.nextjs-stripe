import { Package } from "@/types/package.type";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/api";

export async function getPackage(): Promise<Package[]> {
  const response = await fetch(`${API_URL}/package`);
  return response.json();
}

export async function getClientSecret(pkgId: string): Promise<string> {
  const response = await fetch(
    `${API_URL}/payment/create-payment-intent/${pkgId}`,
  );
  return response.json();
}
