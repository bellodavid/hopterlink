// Force dynamic rendering for this route
export const dynamic = "force-dynamic";
// Remove revalidate since ISR isn’t supported for fully dynamic routes

import { NextRequest, NextResponse } from "next/server";
import request from "@/utils/http-request";

// API route handler for fetching categories
export async function GET(req: NextRequest) {
  const uri = `${process.env.NEXT_PUBLIC_BACKEND_URL}api/categories/`;
  try {
    const result = await request.get(uri);
    return NextResponse.json(result.data, { status: 200 });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(error, { status: 400 });
  }
}
