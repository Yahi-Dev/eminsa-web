/**
 * Script: Migrate all public/ assets to Cloudinary
 *
 * Usage:
 *   npx tsx scripts/migrate-public-to-cloudinary.ts
 *
 * What it does:
 * 1. Scans public/ for all images and videos
 * 2. Uploads each to Cloudinary under eminsa/site/<relative-path>
 * 3. Outputs a JSON mapping file: scripts/cloudinary-map.json
 *    { "/fotos-eminsa/mtn/DSC07227.jpg": "https://res.cloudinary.com/..." }
 */

import { v2 as cloudinary } from "cloudinary";
import * as fs from "fs";
import * as path from "path";

// Load .env file manually (no dotenv dependency needed)
const envPath = path.resolve(__dirname, "../.env");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) continue;
    const key = trimmed.slice(0, eqIndex).trim();
    const value = trimmed.slice(eqIndex + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PUBLIC_DIR = path.resolve(__dirname, "../public");
const OUTPUT_FILE = path.resolve(__dirname, "cloudinary-map.json");

// Files/folders that MUST stay in public (not migrated)
const SKIP = new Set([
  "icono-Photoroom.png",
  "file.svg",
  "globe.svg",
  "next.svg",
  "vercel.svg",
  "window.svg",
  "robots.txt",
  "sitemap.xml",
  ".well-known",
  "__MACOSX",
]);

const SUPPORTED_EXTENSIONS = new Set([
  ".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg",
  ".mp4", ".mov", ".webm",
]);

function getAllFiles(dir: string, baseDir: string): string[] {
  const results: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(baseDir, fullPath);
    const topLevel = relativePath.split(path.sep)[0];

    if (SKIP.has(topLevel) || SKIP.has(entry.name)) continue;

    if (entry.isDirectory()) {
      results.push(...getAllFiles(fullPath, baseDir));
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (SUPPORTED_EXTENSIONS.has(ext)) {
        results.push(fullPath);
      }
    }
  }

  return results;
}

function getResourceType(ext: string): "image" | "video" | "raw" {
  if ([".mp4", ".mov", ".webm"].includes(ext)) return "video";
  if ([".svg"].includes(ext)) return "raw";
  return "image";
}

async function uploadFile(
  filePath: string,
  publicDir: string
): Promise<{ publicPath: string; url: string }> {
  const relativePath = path.relative(publicDir, filePath);
  const publicPath = "/" + relativePath.replace(/\\/g, "/");
  const ext = path.extname(filePath).toLowerCase();
  const resourceType = getResourceType(ext);

  // Build Cloudinary folder: eminsa/site/<folder>
  const dirPart = path.dirname(relativePath).replace(/\\/g, "/");
  const folder = dirPart === "." ? "eminsa/site" : `eminsa/site/${dirPart}`;

  // Use filename without extension as public_id suffix
  const baseName = path.basename(filePath, ext);

  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      public_id: baseName,
      resource_type: resourceType,
      overwrite: false,
      unique_filename: false,
    });

    console.log(`  ✓ ${publicPath} → ${result.secure_url}`);
    return { publicPath, url: result.secure_url };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`  ✗ ${publicPath} — ${message}`);
    return { publicPath, url: "" };
  }
}

async function main() {
  console.log("Scanning public/ for assets to migrate...\n");

  const files = getAllFiles(PUBLIC_DIR, PUBLIC_DIR);
  console.log(`Found ${files.length} files to upload.\n`);

  // Load existing map if resuming
  let mapping: Record<string, string> = {};
  if (fs.existsSync(OUTPUT_FILE)) {
    mapping = JSON.parse(fs.readFileSync(OUTPUT_FILE, "utf-8"));
    console.log(`Loaded existing map with ${Object.keys(mapping).length} entries (will skip already uploaded).\n`);
  }

  let uploaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const file of files) {
    const relativePath = path.relative(PUBLIC_DIR, file);
    const publicPath = "/" + relativePath.replace(/\\/g, "/");

    // Skip if already uploaded
    if (mapping[publicPath]) {
      skipped++;
      continue;
    }

    const result = await uploadFile(file, PUBLIC_DIR);
    if (result.url) {
      mapping[result.publicPath] = result.url;
      uploaded++;
    } else {
      failed++;
    }

    // Save progress after each upload (resumable)
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(mapping, null, 2));
  }

  console.log(`\n--- Done ---`);
  console.log(`Uploaded: ${uploaded}`);
  console.log(`Skipped (already done): ${skipped}`);
  console.log(`Failed: ${failed}`);
  console.log(`\nMapping saved to: ${OUTPUT_FILE}`);
}

main().catch(console.error);
