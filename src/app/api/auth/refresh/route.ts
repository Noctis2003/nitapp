// this is pretty easy
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const refreshToken = request.cookies.get('refresh_token')?.value;

  if (!refreshToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const res = await fetch("https://nitappbackend.onrender.com/auth/refresh", {
    method: "GET",
    headers: {
      'cookie': `refresh_token=${refreshToken}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  const { access_token, refresh_token } = data;


  const response = NextResponse.redirect(new URL('/featured/confessions', request.url));

 
  response.cookies.set('jwt', access_token, {
    httpOnly: true,
    path: '/',
    sameSite: 'none',
    secure: true,
     maxAge: 60 * 60 * 24 * 7
  });

  response.cookies.set('refresh_token', refresh_token, {
    httpOnly: true,
    path: '/',
    sameSite: 'none',
    secure: true,
     maxAge: 60 * 60 * 24 * 7
  });

// sameSite means that the cookie will only be sent in
//  same-site requests, which means that the cookie will not be sent in cross-site requests
// which means external links will not be able to access the cookie

  return response;
}
