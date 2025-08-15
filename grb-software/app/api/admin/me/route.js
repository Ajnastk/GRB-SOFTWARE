import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Admin from "@/lib/models/AdminSchema";
import jwt from "jsonwebtoken";

export async function GET(req) {
  await dbConnect();
  try {
    // Get token from cookies (adjust the cookie name if needed)
    const token = req.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.adminId).select("-password");
    if (!admin) {
      return NextResponse.json({ message: "Admin not found" }, { status: 404 });
    }

    return NextResponse.json(admin, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Invalid token or server error" }, { status: 401 });
  }
} 