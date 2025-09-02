const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getPackage(): Promise<Package[]> {
  const response = await fetch(`${API_URL}/api/package`);
  return response.json();
}
