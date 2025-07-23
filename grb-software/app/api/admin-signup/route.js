import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Admin from "@/lib/models/AdminSchema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import QRCode from "qrcode";
import cloudinary from "@/lib/cloudinaryConfig";
import formidable from "formidable";

const URL = process.env.URL;

export async function POST(req) {
  await dbConnect();

  try {
     const formData = await req.formData();

     const name = formData.get('name');
     const email = formData.get("email");
    const mobile = formData.get("mobile");
    const googleLink = formData.get("googleLink");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const shopName = formData.get("shopName");
    const instagramLink = formData.get("instagramLink");
    const whatsappNumber = formData.get("whatsappNumber");
    const portfolioLink = formData.get("portfolioLink");
    const shopImage = formData.get("shopImage");
    const customLink = formData.get("customLink");
    const customLinkTitle = formData.get("customLinkTitle");

    if (password !== confirmPassword) {
      return NextResponse.json({ message: "Passwords do not match" }, { status: 400 });
    }

    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "Email already exists" }, { status: 400 });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    let shopImageUrl = "";
    if (shopImage && shopImage.size > 0) {
      const arrayBuffer = await shopImage.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "admin_shop_images" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(buffer);
      });

      shopImageUrl = uploadResult.secure_url;
    }

    const newAdmin = new Admin({
      name: name.trim(),
      email: email.trim(),
      mobile: mobile.trim(),
      password: hashPassword,
      googleLink: googleLink.trim(),
      shopName: shopName?.trim() || "",
      instagramLink: instagramLink?.trim() || "",
      whatsappNumber: whatsappNumber?.trim() || "",
      customLinkTitle: customLinkTitle?.trim() || "",
      customLink: customLink?.trim() || "",
      portfolioLink: portfolioLink?.trim() || "",
      shopImage: shopImageUrl,
    });

    const savedAdmin = await newAdmin.save();

    // Generate QR code buffer

     const apiUrl = 
        process.env.NODE_ENV === 'development'
        ? process.env.NEXT_PUBLIC_API_URL_DEV
        : process.env.NEXT_PUBLIC_API_URL_PROD;

    const qrCodeData = `${apiUrl}/rating/${savedAdmin._id}`;
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