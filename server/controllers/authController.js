const Admin = require("../model/AdminSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const QRCode = require("qrcode");
const fs = require("fs");
const path = require("path");

const Signup = async (req, res) => {
  try {
    //console.log("Request body:", req.body);  // Log the received request
    const { name, email, mobile, googlelink,password,confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const NewAdmin = new Admin({
      name,
      email,
      mobile,
      password: hashPassword,
      confirmPassword: confirmPassword?.trim(),
      googlelink: googlelink?.trim(),
    

    });
  

    console.log('body given codes',req.body);
     // Save admin to the database
     const getId =await NewAdmin.save();

     // Ensure the 'qr-codes' directory exists
     const qrCodesDir = path.join(__dirname, "../qr-codes");
     if (!fs.existsSync(qrCodesDir)) {
       fs.mkdirSync(qrCodesDir, { recursive: true }); // Create the directory if it doesn't exist
     }
 
     // Generate QR Code using the MongoDB `_id`
     const qrCodePath = path.join(qrCodesDir, `${getId.name}.png`);
     const qrCodeData = `http://localhost:5173/rating/${getId._id}`;
     await QRCode.toFile(qrCodePath, qrCodeData);
 
     // Update the admin document with the QR code path
     getId.qrCodePath = qrCodePath;
     await getId.save();
 


    res.status(201).json({ message: "Admin successfully created",id:getId._id });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.error(error.message);
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.status(200).json({ message: "Login succesfully", token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports ={Signup,Login}




