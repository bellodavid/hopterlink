import request from "@/utils/http-request";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const uri = `/api/businesses/${parseInt(params.id)}/`;
  try {
    const result = await request.get(uri);
    const response = result.data;
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error fetching business:", error);

    // Return a cleaner error response
    return NextResponse.json(
      {
        message: "Error fetching business",
        details: error?.response?.data || error.message,
      },
      { status: error?.response?.status || 400 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const uri = `/api/businesses/${parseInt(params.id)}/`;
  try {
    const data = await req.formData();

    const result = await request.patch(uri, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const response = result.data;
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error updating business:", error);
    return NextResponse.json(
      {
        message: "Error updating business",
        details: error?.response?.data || error.message,
      },
      { status: error?.response?.status || 400 }
    );
  }
}
