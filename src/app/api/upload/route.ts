import { NextRequest, NextResponse } from "next/server";
import { requireAdminRole } from "@/lib/auth-middleware";
import { uploadToCloudinary } from "@/lib/cloudinary";

const MAX_BYTES = 10 * 1024 * 1024; // 10MB

const VALID_FOLDERS = [
  "eminsa/noticias",
  "eminsa/proyectos",
  "eminsa/recursos",
];

const VALID_RESOURCE_TYPES = ["image", "raw", "auto"] as const;
type ResourceType = (typeof VALID_RESOURCE_TYPES)[number];

const VALID_MIME_TYPES = new Set([
  // Images
  "image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml",
  // Documents
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
]);

export async function POST(request: NextRequest) {
  const auth = await requireAdminRole(request);
  if ("error" in auth) return auth.error;

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = formData.get("folder") as string | null;
    const rawResourceType = formData.get("resourceType") as string | null;

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

    // Whitelist-validate resourceType
    const resourceType: ResourceType =
      rawResourceType && VALID_RESOURCE_TYPES.includes(rawResourceType as ResourceType)
        ? (rawResourceType as ResourceType)
        : "auto";

    // Validate MIME type
    if (file.type && !VALID_MIME_TYPES.has(file.type)) {
      return NextResponse.json(
        { success: false, message: "Tipo de archivo no permitido" },
        { status: 400 }
      );
    }

    if (file.size === 0) {
      return NextResponse.json(
        { success: false, message: "El archivo está vacío" },
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

    const result = await uploadToCloudinary(base64, folder, resourceType);

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
