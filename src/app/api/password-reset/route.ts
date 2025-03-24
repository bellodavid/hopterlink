import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const uri = `${process.env.NEXTAUTH_BACKEND_URL}auth/password/reset/`;
  try {
    const result = await axios.post(uri, {
      email: body.email,
    });
    console.log(result.data);
    return NextResponse.json(result.data, { status: 201 });
  } catch (error: any) {
    console.log(error.response.data);
    return NextResponse.json(error, { status: 400 });
  }
}
