import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function GET() {
  try {
    console.log('🔍 /api/me called');
    
    // Check if cookies function works
    const cookieStore = await cookies();
    
    const token = cookieStore.get('auth-token')?.value || '';
    
    if (!token) {
      console.log('❌ No auth-token cookie found');
      return NextResponse.json({ user: null }, { status: 401 });
    }

    // Check JWT_SECRET
    if (!process.env.JWT_SECRET) {
      console.error('❌ JWT_SECRET environment variable is missing!');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    console.log('🔐 JWT_SECRET length:', process.env.JWT_SECRET.length);
    
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    console.log('🔓 Verifying JWT...');
    
    const { payload } = await jwtVerify(token, secret);

    if (!payload.adminId) {
      console.error('❌ JWT payload missing adminId:', payload);
      return NextResponse.json({ user: null }, { status: 401 });
    }
    
    const user = {
      id: payload.adminId,
      name: payload.name || 'Admin',
      email: payload.email || '',
      role: payload.role || 'admin',
    };
    
    console.log('👤 Returning user data:', user);
    return NextResponse.json({ user });
    
  } catch (error) {
    console.error('❌ /api/me error details:');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    // Handle specific JWT errors
    if (error.name === 'JWTExpired') {
      return NextResponse.json({ error: 'Token expired' }, { status: 401 });
    }
    if (error.name === 'JWTInvalid') {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
    
    return NextResponse.json({ 
      error: 'Internal server error', 
      details: process.env.NODE_ENV === 'development' ? error.message : undefined 
    }, { status: 500 });
  }
}