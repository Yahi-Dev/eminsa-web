import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

/**
 * Validates the Better Auth session from the request headers.
 * Returns { session } on success or { error: NextResponse } on failure.
 */
export async function requireAuth(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });
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
