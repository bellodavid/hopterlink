import axios from "axios";
import { useSession } from "next-auth/react";
import { NextResponse } from "next/server";
import request from "@/utils/http-request";

export async function POST(req: Request, context: { params: { id: string } }) {
  const body = await req.json();
  const { id } = context.params;
  const uri = `${process.env.NEXT_PUBLIC_BACKEND_URL}api/businesses/${id}/reviews/`;

  try {
    const reviews = await request.post(uri, {
      // object_id:parseInt(id),
      rating: body.stars,
      comment: body.content,
    });
    return NextResponse.json(reviews.data);
  } catch (error: any) {
    let errorMessage = "Your review was not submitted.";
    let errorData = {};
    if (error.response) {
      errorMessage = error.response.data.error || errorMessage;
      errorData = error.response.data;
    } else if (error.request) {
      // The request was made but no response was received
      errorMessage = "No response received from the server.";
    } else {
      // Something happened in setting up the request that triggered an Error
      errorMessage = error.message;
    }
    // console.log("Error config:", error.config);

    return NextResponse.json(
      { message: errorMessage, data: errorData },
      { status: 400 } // Using 400 as it's a bad request
    );
  }
}

export async function GET(req: Request, context: { params: { id: string } }) {
  const { id } = context.params;
  const uri = `${process.env.NEXT_PUBLIC_BACKEND_URL}api/businesses/${id}/reviews/`;

  try {
    const reviews = await request.get(uri);
    return NextResponse.json(reviews.data);
  } catch (error: any) {
    let errorMessage = "Unable to fetch reviews.";
    let errorData = {};
    if (error.response) {
      errorMessage = error.response.data.error || errorMessage;
      errorData = error.response.data;
    } else if (error.request) {
      errorMessage = "No response received from the server.";
    } else {
      errorMessage = error.message;
    }
    // console.log("Error config:", error.config);
    return NextResponse.json(
      { message: errorMessage, data: errorData },
      { status: 400 } // Using 400 as it's a bad request
    );
  }
}
