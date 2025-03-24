import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const uri = `${process.env.NEXTAUTH_BACKEND_URL}auth/password/reset/confirm/
`;
  try {
    const result = await axios.post(uri, {
      uid: body.uid,
      token: body.token,
      new_password1: body.new_password1,
      new_password2: body.new_password2,
    });
    return NextResponse.json(result.data, { status: 201 });
  } catch (error: any) {
    console.log(error.response.data);
    return NextResponse.json(error.response.data, { status: 400 });
  }
}
