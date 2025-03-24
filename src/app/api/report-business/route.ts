import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import request from "@/utils/http-request";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const uri = `${process.env.NEXTAUTH_BACKEND_URL}api/businesses/${body.business}/complaints/`;
    const result = await request.post(uri, {
      content: body.content,
    });
    return NextResponse.json(result.data, { status: 200 });
  } catch (error) {
    console.error(error); // For backend logging
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          message: error.message,
          details: error.response?.data || "No additional error information",
        },
        { status: error.response?.status || 500 }
      );
    } else {
      return NextResponse.json(
        {
          message: "An unexpected error occurred",
        },
        { status: 500 }
      );
    }
  }
}
