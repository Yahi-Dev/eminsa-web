import { NextRequest, NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";

const MAX_BYTES = 10 * 1024 * 1024; // 10MB

const VALID_MIME_TYPES = new Set([
  "image/jpeg", "image/png", "image/gif", "image/webp",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
]);

const VALID_EXTENSIONS = new Set([
  ".jpg", ".jpeg", ".png", ".gif", ".webp",
  ".pdf", ".doc", ".docx", ".xls", ".xlsx",
]);

const DANGEROUS_EXTENSIONS = new Set([
  ".php", ".phtml", ".php3", ".php4", ".php5",
  ".exe", ".bat", ".cmd", ".sh", ".bash",
  ".js", ".jsp", ".asp", ".aspx", ".cgi",
  ".py", ".rb", ".pl",
]);

// Simple rate limit: 10 uploads per IP per 10 minutes
const uploadRateMap = new Map<string, { count: number; resetAt: number }>();

function checkUploadRate(ip: string): boolean {
  const now = Date.now();
  const entry = uploadRateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    uploadRateMap.set(ip, { count: 1, resetAt: now + 10 * 60 * 1000 });
    return true;
  }
  if (entry.count >= 10) return false;
  entry.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
    if (!checkUploadRate(ip)) {
      return NextResponse.json(
        { success: false, message: "Demasiadas subidas. Intente más tarde." },
        { status: 429 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ success: false, message: "Archivo requerido" }, { status: 400 });
    }

    const fileName = file.name?.toLowerCase() || "";
    const allExtensions = fileName.match(/\.\w+/g) || [];
    const lastExt = allExtensions[allExtensions.length - 1] || "";

    if (allExtensions.some((ext) => DANGEROUS_EXTENSIONS.has(ext))) {
      return NextResponse.json({ success: false, message: "Tipo de archivo no permitido" }, { status: 400 });
    }
    if (lastExt && !VALID_EXTENSIONS.has(lastExt)) {
      return NextResponse.json({ success: false, message: "Extensión no permitida" }, { status: 400 });
    }
    if (file.type && !VALID_MIME_TYPES.has(file.type)) {
      return NextResponse.json({ success: false, message: "Tipo de archivo no permitido" }, { status: 400 });
    }
    if (file.size === 0) {
      return NextResponse.json({ success: false, message: "El archivo está vacío" }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ success: false, message: "Archivo supera 10MB" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    const resourceType = file.type.startsWith("image/") ? "image" : "raw";
    const result = await uploadToCloudinary(base64, "eminsa/cotizaciones", resourceType);

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      name: file.name,
      size: result.bytes,
      format: result.format,
    });
  } catch (error) {
    console.error("Error uploading cotizacion file:", error);
    return NextResponse.json({ success: false, message: "Error al subir archivo" }, { status: 500 });
  }
}
