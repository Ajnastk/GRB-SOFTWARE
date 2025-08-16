import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ReviewModel from "@/lib/models/ReviewSchema";
import LinkModel from "@/lib/models/LinkSchema";
import jwt from "jsonwebtoken";


export async function GET(req) {
  await dbConnect();

  console.log("Fetching reviews...");

  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        { error: "Authorization token is required" },
        { status: 401 }
      );
    }

    console.log("Token received:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const adminId = decoded.adminId;

    if (!adminId) {
      return NextResponse.json(
        { error: "Invalid token, adminId not found" },
        { status: 400 }
      );
    }

    console.log("Admin ID:", adminId);

    const adminLinks = await LinkModel.find({ adminId : adminId }).select('_id shopName').lean();

    console.log("Admin links found:", adminLinks.length);

      if (!adminLinks || adminLinks.length === 0) {
      return NextResponse.json([], { status: 200 }); // Return empty array if no links found
    }

    const linkIds = adminLinks.map(link => link._id);

     // Find all reviews for these links
    const reviews = await ReviewModel.find({ 
      linkId: { $in: linkIds } 
    }).populate('linkId', 'shopName').sort({ createdAt: -1 });

    console.log("Reviews fetched:", reviews.length);



    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    console.error("Error fetching reviews:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch reviews." },
      { status: 500 }
    );
  }
}