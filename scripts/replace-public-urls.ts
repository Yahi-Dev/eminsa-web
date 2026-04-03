/**
 * Script: Replace local /public/ references with Cloudinary URLs
 *
 * Usage:
 *   npx tsx scripts/replace-public-urls.ts [--dry-run]
 *
 * Reads cloudinary-map.json and replaces all occurrences in src/ files.
 */

import * as fs from "fs";
import * as path from "path";

const MAP_FILE = path.resolve(__dirname, "cloudinary-map.json");
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
      if (TARGET_EXTENSIONS.has(ext)) {
        results.push(fullPath);
      }
    }
  }

  return results;
}

function main() {
  const dryRun = process.argv.includes("--dry-run");

  if (!fs.existsSync(MAP_FILE)) {
    console.error("cloudinary-map.json not found. Run migrate-public-to-cloudinary.ts first.");
    process.exit(1);
  }

  const mapping: Record<string, string> = JSON.parse(fs.readFileSync(MAP_FILE, "utf-8"));
  const entries = Object.entries(mapping).filter(([, url]) => url !== "");

  // Sort by path length descending to replace longer paths first
  // (avoids partial matches like /images/ replacing before /images/eic/...)
  entries.sort((a, b) => b[0].length - a[0].length);

  console.log(`Loaded ${entries.length} mappings.`);
  console.log(dryRun ? "DRY RUN — no files will be modified.\n" : "\n");

  const sourceFiles = getAllSourceFiles(SRC_DIR);
  let totalReplacements = 0;

  for (const filePath of sourceFiles) {
    let content = fs.readFileSync(filePath, "utf-8");
    let fileReplacements = 0;
    const relativePath = path.relative(path.resolve(__dirname, ".."), filePath);

    for (const [localPath, cloudinaryUrl] of entries) {
      // Match the path in quotes (both single and double)
      const escaped = localPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`(?<=["'\`])${escaped}(?=["'\`])`, "g");

      const matches = content.match(regex);
      if (matches) {
        fileReplacements += matches.length;
        if (!dryRun) {
          content = content.replace(regex, cloudinaryUrl);
        }
        console.log(`  ${relativePath}: ${localPath} (${matches.length}x)`);
      }
    }

    if (fileReplacements > 0 && !dryRun) {
      fs.writeFileSync(filePath, content);
    }

    totalReplacements += fileReplacements;
  }

  console.log(`\n--- Done ---`);
  console.log(`Total replacements: ${totalReplacements}`);
  if (dryRun) {
    console.log("(dry run — run without --dry-run to apply changes)");
  }
}

main();
