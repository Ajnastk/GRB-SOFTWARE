import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ReviewModel from "@/lib/models/ReviewSchema";
import AdminModel from "@/lib/models/AdminSchema";

export async function POST(req, { params }) {
  try {
   const { adminId } = await params; 
   await dbConnect();
    const { rating, description } = await req.json();

    if (!adminId) {
      return NextResponse.json({ error: "AdminId is not found" }, { status: 400 });
    }

    if (rating <= 3) {
      if (!description || description.trim() === "") {
        return NextResponse.json(
          { error: "Cannot submit a review without a description for ratings 3 or below." },
          { status: 400 }
        );
      }

      const newReview = new ReviewModel({
        description: description.trim(),
        rating,
        adminId,
      });

      await newReview.save();

      return NextResponse.json(
        { message: "Review submitted successfully." },
        { status: 200 }
      );
    } else if (rating >= 4) {
      const adminData = await AdminModel.findById(adminId);

      if (!adminData || !adminData.googleLink) {
        return NextResponse.json(
          { error: "Google review link is not configured." },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { redirectUrl: adminData.googleLink },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error submitting review:", error.message);
    return NextResponse.json(
      { error: "An error occurred while submitting the review." },
      { status: 500 }
    );
  }
}