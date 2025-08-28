import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function GET(req) {
  try {
    const token = req.cookies.get('auth-token')?.value;
    if (!token) return NextResponse.json({ user: null }, { status: 401 });

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    const user = {
      id: payload.adminId || null,
      name: payload.name || 'Admin',
      email: payload.email || '',
      role: payload.role || 'admin',
      // add image/avatar URL if included in token or fetch from DB here
    };

    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
