import { NextRequest, NextResponse } from "next/server";

// Rutas API que requieren autenticación
const PROTECTED_API_ROUTES = ["/api/noticias", "/api/proyectos", "/api/recursos"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Solo proteger rutas API admin
  const isProtectedApi = PROTECTED_API_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (!isProtectedApi) return NextResponse.next();

  // Verificar token desde cookie o header Authorization
  const tokenFromCookie = request.cookies.get("eminsa_token")?.value;
  const authHeader = request.headers.get("authorization");
  const tokenFromHeader = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;

  const token = tokenFromCookie || tokenFromHeader;

  // Validar que el token tiene el formato mock esperado
  if (!token || !token.startsWith("eminsa_mock_")) {
    return NextResponse.json(
      { error: "No autorizado. Token inválido o ausente." },
      { status: 401 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
