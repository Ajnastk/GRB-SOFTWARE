import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Admin from "@/lib/models/AdminSchema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();
    const { email, password } = body;

    const admin = await Admin.findOne({ email }).select("+password");
    if (!admin) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 400 });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 400 });
    }

    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    return NextResponse.json({ message: "Login successfully", token }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}