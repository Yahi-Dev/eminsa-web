import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

/**
 * Validates the Better Auth session from the request headers.
 * Returns { session } on success or { error: NextResponse } on failure.
 */
export async function requireAuth(_request: NextRequest) {
  // Use next/headers to ensure cookies are properly forwarded in App Router
  const reqHeaders = await headers();
  const session = await auth.api.getSession({ headers: reqHeaders });
  if (!session) {
    return {
      error: NextResponse.json(
        { success: false, message: "No autorizado" },
        { status: 401 }
      ),
    };
  }
  return { session };
}
