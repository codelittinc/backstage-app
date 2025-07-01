import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import authMiddleware from "next-auth/middleware";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow unauthenticated access to the sign-in page and NextAuth API routes
  if (pathname === "/users/sign-in" || pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Use NextAuth's default middleware for all other protected routes
  // @ts-expect-error: NextAuth middleware expects NextRequestWithAuth, but this is safe here
  return authMiddleware(request);
}

export const config = {
  matcher: [
    "/users/:path*",
    "/projects/:path*",
    "/customers/:path*",
    "/repositories/:path*",
    "/timesheets/:path*",
    "/analytics/:path*",
  ],
};
