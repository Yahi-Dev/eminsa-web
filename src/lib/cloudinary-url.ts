/**
 * Client-safe Cloudinary URL helpers — no SDK required.
 * Import this file in client components instead of @/lib/cloudinary.
 */

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
