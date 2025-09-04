import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Skip static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // Static files
  ) {
    return NextResponse.next();
  }

  // *FIX 1*: More explicit public route checking
  const publicRoutes = [
    '/admin/login',
    '/admin/signup',
    '/admin/forgot-password',
    '/admin/reset-password'
  ];

  const isPublicRoute = publicRoutes.some(route => pathname === route);
  
  if (isPublicRoute) {
    console.log(`✅ Allowing public route: ${pathname}`); // Debug log
    return NextResponse.next();
  }

  // *FIX 2*: Only protect admin routes (not API routes)
  if (pathname.startsWith('/admin') || pathname.startsWith('/review')) {
    const token = req.cookies.get('auth-token')?.value;
    
    if (!token) {
      console.log(`❌ No token for ${pathname}, redirecting to login`);
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = '/admin/login';
      loginUrl.searchParams.set('returnUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret);
      console.log(`✅ Valid token for ${pathname}`);
      return NextResponse.next();
    } catch (error) {
      console.log(`❌ Invalid token for ${pathname}:`, error.message);
      
      const response = NextResponse.redirect(new URL('/admin/login', req.url));
      response.cookies.delete('auth-token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except API routes and static files
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};