import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Admin from "@/lib/models/AdminSchema";
import bcrypt from "bcryptjs";

const URL = process.env.URL;

export async function POST(req) {
  await dbConnect();

  try {
     const body = await req.json();

    const {name,email,mobile,password,confirmPassword} = body;

    if (password !== confirmPassword) {
      return NextResponse.json({ message: "Passwords do not match" }, { status: 400 });
    }

    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "Email already exists" }, { status: 400 });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      name: name.trim(),
      email: email.trim(),
      mobile: mobile.trim(),
      password: hashPassword,
    });

    const savedAdmin = await newAdmin.save();

     const apiUrl = 
        process.env.NODE_ENV === 'development'
        ? process.env.NEXT_PUBLIC_API_URL_DEV
        : process.env.NEXT_PUBLIC_API_URL_PROD;
    await savedAdmin.save();

    return NextResponse.json(
      {
        message: "Admin successfully created",
        id: savedAdmin._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}