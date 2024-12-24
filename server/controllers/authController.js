const Admin = require("../model/AdminSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Signup = async (req, res) => {
  try {
    const { name, email, mobile, password,googlelink } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    const NewAdmin = new Admin({
      name,
      email,
      mobile,
      password: hashPassword,
      googlelink: googlelink?.trim(),

    });
     const getId =await NewAdmin.save();

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
