import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('jwt')?.value;
  const pathname = request.nextUrl.pathname;

  if (process.env.NODE_ENV === 'development') {
    console.log('JWT Token:', token);
  }

  // 🔁 If user is on the homepage `/` and has token, redirect to confessions
  if (pathname === '/' && token) {
    const redirectTo =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/featured/confessions'
        : 'https://your-production-domain.com/featured/confessions';

    return NextResponse.redirect(redirectTo);
  }

  // 🛡️ If visiting protected /featured pages, block if no token
  if (pathname.startsWith('/featured') && !token) {
    const loginUrl =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : 'https://your-production-domain.com';

    return NextResponse.redirect(new URL(loginUrl, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/featured/:path*'],
};
