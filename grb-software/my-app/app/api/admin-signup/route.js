import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Admin from "@/lib/models/AdminSchema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import QRCode from "qrcode";
import cloudinary from "@/lib/cloudinaryConfig";

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const { name, email, mobile, googlelink, password, confirmPassword } = body;

    if (password !== confirmPassword) {
      return NextResponse.json({ message: "Passwords do not match" }, { status: 400 });
    }

    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "Email already exists" }, { status: 400 });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      name,
      email,
      mobile,
      password: hashPassword,
      confirmPassword: confirmPassword?.trim(),
      googlelink: googlelink?.trim(),
    });

    const savedAdmin = await newAdmin.save();

    // Generate QR code buffer
    const qrCodeData = `http://localhost:3000/rating/${savedAdmin._id}`;
    const qrCodeBuffer = await QRCode.toBuffer(qrCodeData);

    // Upload QR to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "image", public_id: `qr_codes/${savedAdmin._id}` },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(qrCodeBuffer);
    });

    // Save QR URL to admin
    savedAdmin.qrCodePath = uploadResult.secure_url;
    await savedAdmin.save();

    return NextResponse.json(
      {
        message: "Admin successfully created",
        id: savedAdmin._id,
        qrCodeUrl: uploadResult.secure_url,
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
