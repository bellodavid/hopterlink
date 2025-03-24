import { NextRequest, NextResponse } from "next/server";
import request from "@/utils/http-request";

export async function GET(req: NextRequest) {
  const uri = `${process.env.NEXT_PUBLIC_BACKEND_URL}api/activities/`;
  try {
    const result = await request.get(uri);
    return NextResponse.json(result.data.results, { status: 200 });
  } catch (error) {
    console.error("Error fetching recent activities:", error);
    return NextResponse.json(error, { status: 400 });
  }
}
