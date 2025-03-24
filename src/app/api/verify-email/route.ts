import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log("Request body:", body);
  console.log("Key:", body.token.key);
  try {
    const uri = `${process.env.NEXTAUTH_BACKEND_URL}auth/registration/verify-email/`;
    const result = await axios.post(uri, {
      key: body.token.key,
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
