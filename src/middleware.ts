import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const jwt = request.cookies.get("jwt")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;
  
  // Redirect root path to featured if logged in
  if (pathname === "/" && jwt) {
    return NextResponse.redirect(new URL("/featured/collab", request.url));
  }

  // Protect featured routes
  if (pathname.startsWith("/featured") && !jwt) {
    if (refreshToken) {
      console.log("Refresh token found, redirecting to refresh route");
      return NextResponse.redirect(new URL("/auth/refresh", request.url));
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
