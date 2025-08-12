import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Skip public files and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/public') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Protect admin and review pages
  if (pathname.startsWith('/admin') || pathname.startsWith('/review')) {
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      console.error("Authorization header missing");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);

      // Attach decoded info to request headers if needed
      const requestHeaders = new Headers(req.headers);
      requestHeaders.set('x-admin-id', payload.adminId);

      return NextResponse.next({
        request: { headers: requestHeaders },
      });
    } catch (error) {
      console.error("JWT verification failed:", error.message);
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/review/:path*',
  ],
};
