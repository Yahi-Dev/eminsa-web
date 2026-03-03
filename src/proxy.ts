import { NextRequest, NextResponse } from "next/server";

/**
 * Proxy pass-through. Authentication is handled by requireAuth()
 * in individual API route handlers using BetterAuth session cookies.
 */
export function proxy(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
