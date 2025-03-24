// Force dynamic rendering for this route
export const dynamic = "force-dynamic";

import request from "@/utils/http-request";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // Construct the URI for fetching a specific category by ID
  const uri = `/api/categories/${parseInt(params.id)}`;
  try {
    const result = await request.get(uri);
    const response = result.data;
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error fetching category:", error);
    return NextResponse.json(error, { status: 400 });
  }
}
