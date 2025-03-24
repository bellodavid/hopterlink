// Force dynamic rendering for this route
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import request from "@/utils/http-request";

// API route handler for checking business status
export async function GET(req: NextRequest) {
  const uri = `${process.env.NEXT_PUBLIC_BACKEND_URL}api/businesses/check_business`;
  try {
    const result = await request.get(uri);
    console.log(result);
    return NextResponse.json(result.data, { status: 200 });
  } catch (error) {
    console.error("Error fetching recent activities:", error);
    return NextResponse.json(error, { status: 400 });
  }
}
