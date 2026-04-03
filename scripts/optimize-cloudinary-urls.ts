/**
 * Script: Add Cloudinary optimizations to all URLs in source code
 *
 * Usage: npx tsx scripts/optimize-cloudinary-urls.ts [--dry-run]
 *
 * Transforms:
 *   Images: /image/upload/v → /image/upload/f_auto,q_auto/v
 *   Videos: /video/upload/v → /video/upload/f_auto,q_auto,br_2000k/v
 *
 * f_auto = auto format (webp/avif based on browser)
 * q_auto = auto quality (Cloudinary picks optimal compression)
 * br_2000k = video bitrate cap at 2Mbps (huge size reduction)
 */

import * as fs from "fs";
import * as path from "path";

const SRC_DIR = path.resolve(__dirname, "../src");
const TARGET_EXTENSIONS = new Set([".ts", ".tsx", ".json"]);

function getAllSourceFiles(dir: string): string[] {
  const results: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...getAllSourceFiles(fullPath));
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (TARGET_EXTENSIONS.has(ext)) results.push(fullPath);
    }
  }
  return results;
}

function main() {
  const dryRun = process.argv.includes("--dry-run");
  console.log(dryRun ? "DRY RUN\n" : "");

  const sourceFiles = getAllSourceFiles(SRC_DIR);
  let totalReplacements = 0;

  for (const filePath of sourceFiles) {
    let content = fs.readFileSync(filePath, "utf-8");
    const relativePath = path.relative(path.resolve(__dirname, ".."), filePath);
    let fileReplacements = 0;

    // Optimize image URLs: add f_auto,q_auto
    const imageRegex = /\/image\/upload\/v(\d+)\//g;
    const imageMatches = content.match(imageRegex);
    if (imageMatches) {
      // Skip already optimized URLs
      const unoptimized = content.match(/\/image\/upload\/v\d+\//g)?.filter(m => {
        const idx = content.indexOf(m);
        const before = content.slice(Math.max(0, idx - 30), idx);
        return !before.includes("f_auto");
      });
      if (unoptimized && unoptimized.length > 0) {
        content = content.replace(
          /\/image\/upload\/(v\d+\/)/g,
          (match, version) => {
            // Check if already has transforms (f_ or q_ before version)
            return `/image/upload/f_auto,q_auto/${version}`;
          }
        );
        fileReplacements += unoptimized.length;
      }
    }

    // Optimize video URLs: add f_auto,q_auto,br_2000k
    const videoMatches = content.match(/\/video\/upload\/v\d+\//g);
    if (videoMatches) {
      content = content.replace(
        /\/video\/upload\/(v\d+\/)/g,
        `/video/upload/q_auto,br_2000k/$1`
      );
      fileReplacements += videoMatches.length;
    }

    if (fileReplacements > 0) {
      console.log(`  ${relativePath}: ${fileReplacements} URLs optimized`);
      if (!dryRun) {
        fs.writeFileSync(filePath, content);
      }
      totalReplacements += fileReplacements;
    }
  }

  console.log(`\n--- Done ---`);
  console.log(`Total: ${totalReplacements} URLs optimized`);
  if (dryRun) console.log("(dry run — run without --dry-run to apply)");
}

main();
