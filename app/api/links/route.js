import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import LinkModel from "@/lib/models/LinkSchema";
import cloudinary from "@/lib/cloudinaryConfig";
import QRCode from "qrcode";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await dbConnect();

    const formData = await req.formData();

    const shopName = formData.get("shopName") || "";
    const googleLink = formData.get("googleLink") || "";
    const instagramLink = formData.get("instagramLink") || "";
    const whatsappNumber = formData.get("whatsappNumber") || "";
    const portfolioLink = formData.get("portfolioLink") || "";
    const customLinkTitle = formData.get("customLinkTitle") || "";
    const customLink = formData.get("customLink") || "";
    const shopImage = formData.get("shopImage");

    // Upload shop image to Cloudinary
    let shopImageUrl = "";
    if (shopImage && shopImage.size > 0) {
      const arrayBuffer = await shopImage.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "link_shop_images" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(buffer);
      });

      shopImageUrl = uploadResult.secure_url;
    }

    const newLink = new LinkModel({
      shopName: shopName.trim(),
      googleLink: googleLink.trim(),
      instagramLink: instagramLink.trim(),
      whatsappNumber: whatsappNumber.trim(),
      portfolioLink: portfolioLink.trim(),
      customLinkTitle: customLinkTitle.trim(),
      customLink: customLink.trim(),
      shopImage: shopImageUrl,
    });

    const savedLink = await newLink.save();

    const apiUrl =
      process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_API_URL_DEV
        : process.env.NEXT_PUBLIC_API_URL_PROD;

    //Generate Qr code

    const qrCodeData = `${apiUrl}/rating/${savedLink._id}`;
    const qrCodeBuffer = await QRCode.toBuffer(qrCodeData);

    //Upload QR to Cloudinary
    const qrUploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "admin_qr_codes", public_id: savedLink._id.toString() },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(qrCodeBuffer);
    });

    // Save QR URL to Link document
    savedLink.qrCodePath = qrUploadResult.secure_url;
    await savedLink.save();

    return NextResponse.json(
      {
        message: "Link successfully created",
        id: savedLink._id,
        qrCodeUrl: qrUploadResult.secure_url,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating link:", error);
    return NextResponse.json(
      { message: "Failed to create link", error: error.message },
      { status: 500 }
    );
  }
};

export async function GET(req) {
  try {
    await dbConnect();

    const links = await LinkModel.find().sort({ createdAt: -1 });

    return NextResponse.json(links, { status: 200 });
  } catch (error) {
    console.error("Error fetching links:", error);
    return NextResponse.json(
      { message: "Failed to fetch links", error: error.message },
      { status: 500 }
    );
  }
};
