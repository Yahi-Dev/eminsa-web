import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

/**
 * Validates the Better Auth session from the request headers.
 * Returns { session } on success or { error: NextResponse } on failure.
 */
export async function requireAuth(_request: NextRequest) {
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

/**
 * Validates the session AND checks that the user has the "admin" role.
 * Returns { session } on success or { error: NextResponse } on failure.
 */
export async function requireAdminRole(_request: NextRequest) {
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

  const role = (session.user as { role?: unknown }).role;
  if (typeof role !== "string" || role !== "admin") {
    return {
      error: NextResponse.json(
        { success: false, message: "Acceso denegado: se requiere rol de administrador" },
        { status: 403 }
      ),
    };
  }

  return { session };
}
