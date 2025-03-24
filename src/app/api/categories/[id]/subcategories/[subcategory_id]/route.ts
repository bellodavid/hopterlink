import { NextResponse } from "next/server";
import request from "@/utils/http-request";

export async function GET(
  req: Request,
  { params }: { params: { id: string; subcategory_id: string } }
) {
  const { id, subcategory_id } = params;
  const uri = `api/categories/${id}/subcategories/${subcategory_id}/businesses/`;
  const businesses = await request.get(uri);
  if (businesses) {
    return NextResponse.json(businesses.data);
  } else {
    return NextResponse.json(
      { message: "Businesses not found" },
      { status: 404 }
    );
  }
}
