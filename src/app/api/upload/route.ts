import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-middleware";
import { uploadToCloudinary } from "@/lib/cloudinary";

const MAX_BYTES = 10 * 1024 * 1024; // 10MB

const VALID_FOLDERS = [
  "eminsa/noticias",
  "eminsa/proyectos",
  "eminsa/recursos",
];

export async function POST(request: NextRequest) {
  const auth = await requireAuth(request);
  if ("error" in auth) return auth.error;

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = formData.get("folder") as string | null;
    const resourceType = (formData.get("resourceType") as string) || "auto";

    if (!file || !folder) {
      return NextResponse.json(
        { success: false, message: "file y folder son requeridos" },
        { status: 400 }
      );
    }

    if (!VALID_FOLDERS.includes(folder)) {
      return NextResponse.json(
        { success: false, message: "Carpeta no válida" },
        { status: 400 }
      );
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { success: false, message: "Archivo supera el límite de 10MB" },
        { status: 400 }
      );
    }

    // Convert File to base64 data URI for Cloudinary SDK
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    const result = await uploadToCloudinary(
      base64,
      folder,
      resourceType as "image" | "raw" | "auto"
    );

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format,
      bytes: result.bytes,
    });
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    return NextResponse.json(
      { success: false, message: "Error al subir archivo" },
      { status: 500 }
    );
  }
}
