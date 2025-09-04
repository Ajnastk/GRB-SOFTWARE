// import { NextResponse } from "next/server";
// import dbConnect from "@/lib/dbConnect";
// import Admin from "@/lib/models/AdminSchema";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";


// export async function POST(req) {
//   await dbConnect();
//   try {
//     const body = await req.json();
//     const { email, password } = body;

//     const admin = await Admin.findOne({ email }).select("+password");
//     if (!admin) {
//       return NextResponse.json({ message: "Invalid email or password" }, { status: 400 });
//     }

//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch) {
//       return NextResponse.json({ message: "Invalid email or password" }, { status: 400 });
//     }

//     const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

//     return NextResponse.json({ message: "Login successfully", token }, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { message: "Internal server error", error: error.message },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Admin from "@/lib/models/AdminSchema";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();
    const { email, password } = body || {};

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }

    const admin = await Admin.findOne({ email }).select("+password");
    if (!admin) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const payload = { 
      adminId: String(admin._id), 
      email: admin.email, 
      name: admin.name || 'Admin', 
      role: admin.role || 'admin' 
    };
    
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1h')
      .sign(secret);

    const res = NextResponse.json({ 
      message: 'Login successful',
      user: { // *ADD*: Return user data to frontend
        id: admin._id,
        name: admin.name,
        email: admin.email
      }
    });
    
    // *CRITICAL*: Set cookie with consistent attributes
    res.cookies.set('auth-token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60, // 1 hour
    });

    console.log('✅ Login successful, cookie set for:', admin.email); // Debug log
    return res;
  } catch (error) {
    console.error('❌ Login error:', error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}