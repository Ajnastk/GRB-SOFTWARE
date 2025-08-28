// import { NextResponse } from 'next/server';
// import { jwtVerify } from 'jose';

// const PUBLIC_FILE = /\.(.*)$/;

// export async function middleware(req) {
//   const { pathname } = req.nextUrl;

//   // Skip public files and Next.js internals
//   if (
//     pathname.startsWith('/_next') ||
//     pathname.startsWith('/api/public') ||
//     PUBLIC_FILE.test(pathname)
//   ) {
//     return NextResponse.next();
//   }

//   // Protect admin and review pages
//   if (pathname.startsWith('/admin') || pathname.startsWith('/review')) {
//     const authHeader = req.headers.get('authorization');
//     if (!authHeader) {
//       console.error("Authorization header missing");
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const token = authHeader.split(' ')[1];
//     if (!token) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     try {
//       const secret = new TextEncoder().encode(process.env.JWT_SECRET);
//       const { payload } = await jwtVerify(token, secret);

//       // Attach decoded info to request headers if needed
//       const requestHeaders = new Headers(req.headers);
//       requestHeaders.set('x-admin-id', payload.adminId);

//       return NextResponse.next({
//         request: { headers: requestHeaders },
//       });
//     } catch (error) {
//       console.error("JWT verification failed:", error.message);
//       return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     '/admin/:path*',
//     '/review/:path*',
//   ],
// };

// middleware.js
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const PUBLIC_FILE = /\.(.*)$/;

async function verifyJWT(token) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  return jwtVerify(token, secret); // HS256 by default; configure SignJWT accordingly
}

export async function middleware(req) {
  const { pathname, searchParams } = req.nextUrl;

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
    // Prefer cookie
    let token = req.cookies.get('auth-token')?.value;

    // Optional: fallback to Authorization header if present (useful for API fetches)
    if (!token) {
      const authHeader = req.headers.get('authorization');
      if (authHeader && authHeader.toLowerCase().startsWith('bearer ')) {
        token = authHeader.slice(7);
      }
    }

    if (!token) {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = '/admin/login';
      loginUrl.searchParams.set('from', pathname + (searchParams?.toString() ? `?${searchParams}` : ''));
      return NextResponse.redirect(loginUrl);
    }

    try {
      const { payload } = await verifyJWT(token);

      // Attach decoded info to request headers (available to server code, not client)
      const requestHeaders = new Headers(req.headers);
      if (payload.adminId) requestHeaders.set('x-admin-id', String(payload.adminId));
      if (payload.role) requestHeaders.set('x-admin-role', String(payload.role));
      if (payload.email) requestHeaders.set('x-admin-email', String(payload.email));
      if (payload.name) requestHeaders.set('x-admin-name', String(payload.name));

      return NextResponse.next({ request: { headers: requestHeaders } });
    } catch (error) {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = '/admin/login';
      loginUrl.searchParams.set('reason', 'expired');
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/review/:path*'],
};

