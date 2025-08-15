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
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false, // protect password in default queries
    },
  },
  { timestamps: true }
);

// Prevent overwrite on hot reload in Next.js
export default mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
