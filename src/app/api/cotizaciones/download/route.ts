import { NextRequest, NextResponse } from "next/server";

/**
 * Proxy download: fetches a Cloudinary file and serves it with the original filename.
 * Usage: GET /api/cotizaciones/download?url=<cloudinary_url>&name=<original_filename>
 */
export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  const name = request.nextUrl.searchParams.get("name") || "archivo";

  if (!url) {
    return NextResponse.json({ error: "URL requerida" }, { status: 400 });
  }

  // Only allow Cloudinary URLs
  if (!url.startsWith("https://res.cloudinary.com/")) {
    return NextResponse.json({ error: "URL no permitida" }, { status: 400 });
  }

  try {
    const upstream = await fetch(url);
    if (!upstream.ok) {
      return NextResponse.json({ error: "Archivo no encontrado" }, { status: upstream.status });
    }

    const contentType = upstream.headers.get("content-type") || "application/octet-stream";
    const body = await upstream.arrayBuffer();

    return new NextResponse(body, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${encodeURIComponent(name)}"`,
        "Cache-Control": "private, max-age=3600",
      },
    });
  } catch {
    return NextResponse.json({ error: "Error descargando archivo" }, { status: 500 });
  }
}
