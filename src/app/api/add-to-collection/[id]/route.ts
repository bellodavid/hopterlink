import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import request from "@/utils/http-request";
export async function POST(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  const uri = `${process.env.NEXTAUTH_BACKEND_URL}api/businesses/${id}/add_to_collection/`;
  try {
    const result = await request.post(uri, { id });
    return NextResponse.json(result.data, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(error, { status: 400 });
  }
}
