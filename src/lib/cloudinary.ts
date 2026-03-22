import { v2 as cloudinary } from "cloudinary";

// ─── Client-side URL transform (no SDK needed) ───────────────────────────────

export interface CldTransformOptions {
  width?: number;
  height?: number;
  quality?: "auto" | "auto:best" | "auto:good" | "auto:eco" | "auto:low" | number;
  format?: "auto" | "webp" | "avif" | "jpg" | "png";
  fit?: "fill" | "scale" | "crop" | "thumb" | "pad";
  gravity?: "auto" | "face" | "center";
}

/**
 * Inserts Cloudinary transformation parameters into an existing Cloudinary URL.
 * Works client-side and server-side — no SDK required.
 *
 * Input:  https://res.cloudinary.com/cloud/image/upload/v123/folder/img.jpg
 * Output: https://res.cloudinary.com/cloud/image/upload/f_auto,q_auto,w_800/v123/folder/img.jpg
 */
export function getCldUrl(
  src: string | null | undefined,
  options: CldTransformOptions = {}
): string {
  if (!src) return "";

  // Only transform absolute Cloudinary URLs — pass through everything else as-is
  if (!src.startsWith("http") || !src.includes("res.cloudinary.com")) return src;

  const {
    width,
    height,
    quality = "auto",
    format = "auto",
    fit = "fill",
    gravity,
  } = options;

  const transforms: string[] = [];

  if (format) transforms.push(`f_${format}`);
  if (quality) transforms.push(`q_${quality}`);
  if (fit) transforms.push(`c_${fit}`);
  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  if (gravity) transforms.push(`g_${gravity}`);

  const transformStr = transforms.join(",");

  // Insert transforms after /upload/ and before the version or path
  return src.replace(
    /\/upload\/(v\d+\/|(?!v\d+\/))/,
    `/upload/${transformStr}/$1`
  );
}

/**
 * Returns a tiny (30px) blurred placeholder URL for use as blurDataURL.
 */
export function getCldBlurPlaceholder(src: string | null | undefined): string {
  if (!src) return "";
  return getCldUrl(src, { width: 30, quality: 30, format: "webp", fit: "fill" });
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  resource_type: string;
  format: string;
  bytes: number;
  width?: number;
  height?: number;
}

/**
 * Sube un archivo (base64 data URI) a Cloudinary.
 */
export async function uploadToCloudinary(
  fileData: string,
  folder: string,
  resourceType: "image" | "raw" | "auto" = "auto"
): Promise<CloudinaryUploadResult> {
  const result = await cloudinary.uploader.upload(fileData, {
    folder,
    resource_type: resourceType,
  });

  return {
    secure_url: result.secure_url,
    public_id: result.public_id,
    resource_type: result.resource_type,
    format: result.format,
    bytes: result.bytes,
    width: result.width,
    height: result.height,
  };
}

/**
 * Elimina un asset de Cloudinary por public_id.
 */
export async function deleteFromCloudinary(
  publicId: string,
  resourceType: "image" | "raw" = "image"
): Promise<void> {
  await cloudinary.uploader.destroy(publicId, {
    resource_type: resourceType,
  });
}
