import { NextRequest, NextResponse } from "next/server";

// Routes that require authentication
const PROTECTED_PATHS = ["/admin", "/es/admin", "/en/admin"];

// State-changing API routes that need origin validation (CSRF)
const MUTATION_API_PATHS = [
  "/api/noticias",
  "/api/proyectos",
  "/api/recursos",
  "/api/upload",
  "/api/admin",
];

// Allowed origins for API mutations
const ALLOWED_ORIGINS = [
  process.env.BETTER_AUTH_URL || "http://localhost:3000",
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  process.env.NEXT_PUBLIC_BASE_URL || "",
].filter(Boolean);

function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

function isMutationApiPath(pathname: string): boolean {
  return MUTATION_API_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;

  // ── CSRF: Validate Origin for state-changing API calls ──────────────────
  if (
    isMutationApiPath(pathname) &&
    ["POST", "PUT", "PATCH", "DELETE"].includes(method)
  ) {
    const origin = request.headers.get("origin");
    const host = request.headers.get("host");

    // If there's an origin header, it must match an allowed origin
    if (origin) {
      const isAllowed =
        ALLOWED_ORIGINS.includes(origin) ||
        (host && origin === `https://${host}`) ||
        (host && origin === `http://${host}`);

      if (!isAllowed) {
        return NextResponse.json(
          { success: false, message: "Origen no permitido" },
          { status: 403 }
        );
      }
    }
  }

  // ── Auth: Protect /admin routes ──────────────────────────────────────────
  if (isProtectedPath(pathname)) {
    // Check for Better Auth session cookie
    const sessionCookie =
      request.cookies.get("better-auth.session_token") ||
      request.cookies.get("__Secure-better-auth.session_token");

    if (!sessionCookie?.value) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
