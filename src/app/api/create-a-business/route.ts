// Force dynamic rendering for this route
export const dynamic = "force-dynamic";

import request from "@/utils/http-request";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const uri = `${process.env.NEXTAUTH_BACKEND_URL}api/businesses/`;
    const data = await req.formData();

    // Make the POST request using the Axios instance
    const response = await request.post(uri, data);

    // Return the response data with a 201 status on success
    return NextResponse.json(response.data, { status: 201 });
  } catch (error: any) {
    // Log the error response or message for debugging
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );

    // Construct a custom error response
    const errorResponse = {
      message: error.response?.data?.message || "An unexpected error occurred",
      status: error.response?.status || 400,
      details: error.response?.data || null,
    };

    return NextResponse.json(errorResponse, { status: errorResponse.status });
  }
}
