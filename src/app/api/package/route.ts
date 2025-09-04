import "server-only";

import { mockPackages } from "@/database/mockup";
import { Package } from "@/types/package.type";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse<Package[]>> {
  return NextResponse.json(mockPackages);
}
