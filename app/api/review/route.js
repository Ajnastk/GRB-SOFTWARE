import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ReviewModel from "@/lib/models/ReviewSchema";
import jwt from "jsonwebtoken";

export async function GET(req) {
  await dbConnect();

  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        { error: "Authorization token is required" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const adminId = decoded.adminId;

    if (!adminId) {
      return NextResponse.json(
        { error: "Invalid token, adminId not found" },
        { status: 400 }
      );
    }

    const reviews = await ReviewModel.find({ adminId });

    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    console.error("Error fetching reviews:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch reviews." },
      { status: 500 }
    );
  }
}