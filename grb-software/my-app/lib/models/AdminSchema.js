import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: [true, "Mobile number is required"],
      match: [/^\d{10}$/, "Please enter a valid 10-digit mobile number"],
      trim: true,
    },
    googlelink: {
      type: String,
      required: [true, "Google review link is required"],
      validate: {
        validator: function (v) {
          return /^https:\/\/g\.page\/r\/[A-Za-z0-9_-]+\/review$/.test(v);
        },
        message:
          "Please enter a valid Google review link (https://g.page/.../review)",
      },
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false, // protect password in default queries
    },
    qrCodePath: {
      type: String, // Cloudinary URL
      default: "",
      trim: true,
    },
  },
  { timestamps: true }
);

// Prevent overwrite on hot reload in Next.js
export default mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
