// Force dynamic rendering for this route
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import request from "@/utils/http-request";

// API route handler for fetching businesses within a subcategory
export async function GET(
  req: Request,
  { params }: { params: { id: string; subcategory_id: string } }
) {
  const { id, subcategory_id } = params;
  const uri = `api/categories/${id}/subcategories/${subcategory_id}/businesses/`;
  try {
    const businesses = await request.get(uri);
    if (businesses) {
      return NextResponse.json(businesses.data);
    } else {
      return NextResponse.json(
        { message: "Businesses not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error fetching businesses:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
