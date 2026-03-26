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

// Auth endpoints to rate-limit against brute force
const AUTH_RATE_LIMITED_PATHS = [
  "/api/auth/sign-in",
  "/api/auth/sign-up",
  "/api/auth/forget-password",
];

// Allowed origins for API mutations
const ALLOWED_ORIGINS = [
  process.env.BETTER_AUTH_URL || "http://localhost:3000",
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  process.env.NEXT_PUBLIC_BASE_URL || "",
].filter(Boolean);

// ── In-memory rate limiter for auth endpoints ──
const authRateMap = new Map<string, { count: number; resetAt: number }>();
const AUTH_RATE_LIMIT = 8;
const AUTH_RATE_WINDOW_MS = 15 * 60 * 1000; // 15 min

let lastCleanup = Date.now();
function cleanupAuthRateMap() {
  const now = Date.now();
  if (now - lastCleanup < 60_000) return;
  lastCleanup = now;
  for (const [k, v] of authRateMap.entries()) {
    if (now > v.resetAt) authRateMap.delete(k);
  }
}

function checkAuthRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = authRateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    authRateMap.set(ip, { count: 1, resetAt: now + AUTH_RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= AUTH_RATE_LIMIT) return false;
  entry.count += 1;
  return true;
}

function getIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0].trim();
  return forwarded || request.headers.get("x-real-ip") || "unknown";
}

function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

function isMutationApiPath(pathname: string): boolean {
  return MUTATION_API_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

function isAuthRateLimitedPath(pathname: string): boolean {
  return AUTH_RATE_LIMITED_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;

  cleanupAuthRateMap();

  // ── Block path traversal ──
  if (pathname.includes("..") || pathname.includes("\\")) {
    return new NextResponse(null, { status: 400 });
  }

  // ── Rate-limit auth endpoints to prevent brute force ──
  if (isAuthRateLimitedPath(pathname) && method === "POST") {
    const ip = getIp(request);
    if (!checkAuthRateLimit(ip)) {
      return NextResponse.json(
        { success: false, message: "Demasiadas solicitudes. Intenta de nuevo más tarde." },
        { status: 429 }
      );
    }
  }

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
