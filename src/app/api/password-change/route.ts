import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import request from "@/utils/http-request";
export async function POST(req: NextRequest) {
  const body = await req.json();
  const uri = `${process.env.NEXTAUTH_BACKEND_URL}auth/password/change/`;
  try {
    const result = await request.post(uri, {
      new_password1: body.newpassword1,
      new_password2: body.newpassword2,
    });
    console.log(result.data);
    return NextResponse.json(result.data, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(error.response.data, { status: 400 });
  }
}
