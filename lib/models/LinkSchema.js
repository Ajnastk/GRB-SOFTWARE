import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema(
    {
    googleLink: {
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
      qrCodePath: {
      type: String, // Cloudinary URL
      default: "",
      trim: true,
    },
    shopName: {
      type: String,
      required: true,
      trim: true,
    },
    shopImage: {
      type: String,
      default: '',
      trim: true,
    },
    instagramLink: {
      type: String,
      default: "",
      trim: true,
    },
    whatsappNumber: {
      type: String,
      default: "",
      trim: true,
    },

    portfolioLink: {
      type: String,
      default: "",
      trim: true
    },
    customLinkTitle: {
      type: String,
      default: "",
      trim: true,
      required :false
    },
    customLink: {
      type: String,
      default: "",
      trim: true
    }
})

export default mongoose.models.Link || mongoose.model("Link",LinkSchema);