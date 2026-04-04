import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const recurso = await prisma.recurso.findFirst({
      where: { id: parseInt(id, 10) },
      select: { archivo: true, nombreArchivo: true, nombre: true },
    });

    if (!recurso || !recurso.archivo) {
      return NextResponse.json(
        { success: false, message: "Recurso no encontrado" },
        { status: 404 }
      );
    }

    const response = await fetch(recurso.archivo);
    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: "Error al descargar el archivo" },
        { status: 502 }
      );
    }

    const filename = recurso.nombreArchivo || recurso.nombre || "recurso";
    const contentType =
      response.headers.get("content-type") || "application/octet-stream";

    return new NextResponse(response.body, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${encodeURIComponent(filename)}"`,
      },
    });
  } catch (error) {
    console.error("Error downloading recurso:", error);
    return NextResponse.json(
      { success: false, message: "Error interno" },
      { status: 500 }
    );
  }
}
