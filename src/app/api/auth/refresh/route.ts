import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const refreshToken = request.cookies.get('refresh_token')?.value;

  if (!refreshToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const res = await fetch("http://localhost:4000/auth/refresh", {
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
    sameSite: 'strict',
    secure: true,
  });

  response.cookies.set('refresh_token', refresh_token, {
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    secure: true,
  });

  return response;
}
