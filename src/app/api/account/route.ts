import { NextRequest, NextResponse } from "next/server";
import request from "@/utils/http-request";

export const revalidate = 5;

export async function GET(req: NextRequest) {
  const uri = `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/user/`;
  try {
    const result = await request.get(uri);
    return NextResponse.json(result.data, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Error fetching user data" },
      { status: 400 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const formData = await req.formData();

    const uri = `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/user/`;

    // Send the FormData directly to the backend
    const updateProfile = await request.patch(uri, formData);
    return NextResponse.json(updateProfile.data, { status: 200 });
  } catch (error: any) {
    console.log(error.response);
    console.error("Error updating profile", error);
    return NextResponse.json(
      { error: "Error updating profile" },
      { status: 400 }
    );
  }
}
