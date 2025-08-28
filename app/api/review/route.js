// import { NextResponse } from "next/server";
// import dbConnect from "@/lib/dbConnect";
// import ReviewModel from "@/lib/models/ReviewSchema";
// import LinkModel from "@/lib/models/LinkSchema";
// import jwt from "jsonwebtoken";


// export async function GET(req) {
//   await dbConnect();

//   console.log("Fetching reviews...");

//   try {
//     const authHeader = req.headers.get("authorization");
//     const token = authHeader?.split(" ")[1];

//     if (!token) {
//       return NextResponse.json(
//         { error: "Authorization token is required" },
//         { status: 401 }
//       );
//     }

//     console.log("Token received:", token);

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const adminId = decoded.adminId;

//     if (!adminId) {
//       return NextResponse.json(
//         { error: "Invalid token, adminId not found" },
//         { status: 400 }
//       );
//     }

//     console.log("Admin ID:", adminId);

//     const adminLinks = await LinkModel.find({ adminId : adminId }).select('_id shopName').lean();

//     console.log("Admin links found:", adminLinks.length);

//       if (!adminLinks || adminLinks.length === 0) {
//       return NextResponse.json([], { status: 200 }); // Return empty array if no links found
//     }

//     const linkIds = adminLinks.map(link => link._id);

//      // Find all reviews for these links
//     const reviews = await ReviewModel.find({ 
//       linkId: { $in: linkIds } 
//     }).populate('linkId', 'shopName').sort({ createdAt: -1 });

//     console.log("Reviews fetched:", reviews.length);



//     return NextResponse.json(reviews, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching reviews:", error.message);
//     return NextResponse.json(
//       { error: "Failed to fetch reviews." },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ReviewModel from "@/lib/models/ReviewSchema";
import LinkModel from "@/lib/models/LinkSchema";
import { jwtVerify } from "jose"; // prefer jose for verification

export async function GET(req) {
  await dbConnect();

  try {
    // 1) Prefer HttpOnly cookie set at login, fallback to Authorization header
    let token = req.cookies.get("auth-token")?.value;
    if (!token) {
      const authHeader = req.headers.get("authorization");
      if (authHeader && authHeader.toLowerCase().startsWith("bearer ")) {
        token = authHeader.slice(7);
      }
    }

    if (!token) {
      return NextResponse.json(
        { error: "Authorization token is required" },
        { status: 401 }
      );
    }

    // 2) Verify JWT (HS256) with jose
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret, { algorithms: ["HS256"] });

    const adminId = payload?.adminId;
    if (!adminId) {
      return NextResponse.json(
        { error: "Invalid token, adminId not found" },
        { status: 400 }
      );
    }

    // 3) Query admin links
    const adminLinks = await LinkModel
      .find({ adminId: adminId })
      .select("_id shopName")
      .lean();

    if (!adminLinks || adminLinks.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    const linkIds = adminLinks.map((l) => l._id);

    // 4) Query reviews for those links (populate shopName)
    const reviews = await ReviewModel
      .find({ linkId: { $in: linkIds } })
      .populate("linkId", "shopName")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    // Distinguish token errors from server errors if needed
    if (error?.code === "ERR_JWT_EXPIRED" || error?.name === "JWTExpired") {
      return NextResponse.json({ error: "Token expired" }, { status: 401 });
    }
    if (error?.name === "JWTInvalid" || error?.name === "JWSSignatureVerificationFailed") {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    console.error("Error fetching reviews:", error?.message || error);
    return NextResponse.json(
      { error: "Failed to fetch reviews." },
      { status: 500 }
    );
  }
}
