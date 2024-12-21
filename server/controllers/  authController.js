const Admin = require("../model/AdminSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Signup = async (req, res) => {
  try {
    const { name, email, number, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      name,
      email,
      number,
      password: hashPassword,
    });

    await newAdmin.save();
    res.status(201).json("Admin creation successfully finished");
  } catch (err) {
    res.status(500).json("Internal server error");
    console.errror(err.message);
  }
};

const login = async (req, res) => {
  try {
    const { name, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch=await bcrypt.compare(password,admin.password);
    if(!isMatch){
        return res.status(400).json({message:'Invalid email or password'});
    }

    const token=jwt.sign({id:adimn._id},process.env.JWT_SECRET,{
        expiresIn:'1h',
    });
    return res.status(200).json({message:'Login successfully',token})
  } catch (err){
    return res.status(500).json({message:'Internal server error',error:err.message});
}
};

module.exports = {Signup,login};
