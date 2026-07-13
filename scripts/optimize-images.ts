#!/usr/bin/env node
/**
 * Image Optimization Script
 * Converts images to WebP/AVIF formats and generates responsive sizes
 * Creates optimized versions while keeping originals for reference
 * Run as: node scripts/optimize-images.ts or npm run optimize:images
 */

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PUBLIC_ROOT = path.join(process.cwd(), 'public');
const IMAGE_SOURCE_DIR = path.join(PUBLIC_ROOT, 'images');
const OUTPUT_DIR = path.join(IMAGE_SOURCE_DIR, 'optimized');
const BACKUP_DIR = path.join(IMAGE_SOURCE_DIR, '.original-backup');

// Ensure directories exist
if (fs.existsSync(OUTPUT_DIR)) {
  fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
}
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// Only create backup if it doesn't exist (first run only)
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

// Single optimized size tuned for mobile-first delivery
const optimizedSize = 640;
const outputFormat = 'webp';

interface ImageFile {
  name: string;
  path: string;
  ext: string;
}

/**
 * Get all image files from public/images directory
 * Skips already-optimized images to prevent re-processing
 */
function getImageFiles(dir: string): ImageFile[] {
  const files: ImageFile[] = [];

  if (!fs.existsSync(dir)) {
    console.warn(`Directory ${dir} does not exist. Skipping image optimization.`);
    return files;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  entries.forEach((entry) => {
    if (entry.name === 'optimized' || entry.name === '.original-backup') {
      return;
    }

    const entryPath = path.join(dir, entry.name);

    if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        if (!/-(320w|640w|768w|1024w|1280w|1920w|2560w)\.(jpg|jpeg|png|webp|avif)$/.test(entry.name)) {
          files.push({
            name: entry.name,
            path: entryPath,
            ext
          });
        }
      }
    } else if (entry.isDirectory()) {
      files.push(...getImageFiles(entryPath));
    }
  });

  return files;
}

/**
 * Generate relative path for output file
 */
function getOutputPath(inputPath: string, size: number, format: string, sourceRoot: string): string {
  const relative = path.relative(sourceRoot, inputPath);
  const dir = path.dirname(relative);
  const name = path.basename(relative, path.extname(relative));

  const outputSubDir = path.join(OUTPUT_DIR, dir);
  if (!fs.existsSync(outputSubDir)) {
    fs.mkdirSync(outputSubDir, { recursive: true });
  }

  return path.join(outputSubDir, `${name}-${size}w.${format}`);
}

function collectFiles(dir: string): string[] {
  const files: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectFiles(entryPath));
    } else if (entry.isFile()) {
      files.push(entryPath);
    }
  }
  return files;
}

/**
 * Optimize a single image
 */
async function optimizeImage(file: ImageFile, sourceRoot: string): Promise<boolean> {
  try {
    const image = sharp(file.path);
    const metadata = await image.metadata();

    if (!metadata.width) {
      console.warn(`⚠️  Skipping ${file.name} - unable to determine dimensions`);
      return false;
    }

    const targetWidth = Math.min(optimizedSize, metadata.width);
    const outputPath = getOutputPath(file.path, targetWidth, outputFormat, sourceRoot);

    await sharp(file.path)
      .resize(targetWidth, targetWidth, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 80, effort: 4 })
      .toFile(outputPath);

    const stats = fs.statSync(outputPath);
    if (!stats || stats.size === 0) {
      fs.rmSync(outputPath, { force: true });
      throw new Error('Generated file is empty');
    }

    console.log(`✅ Optimized: ${file.name} → 1 ${outputFormat} @ ${targetWidth}px`);
    return true;
  } catch (err) {
    console.error(`❌ Error optimizing ${file.name}:`, err instanceof Error ? err.message : err);
    return false;
  }
}

/**
 * Main optimization process
 */
async function main(): Promise<void> {
  console.log('🖼️  Starting image optimization...\n');

  const files = [
    ...getImageFiles(IMAGE_SOURCE_DIR),
    ...(fs.existsSync(path.join(PUBLIC_ROOT, 'logo.png')) ? [{ name: 'logo.png', path: path.join(PUBLIC_ROOT, 'logo.png'), ext: '.png' }] : [])
  ];

  if (files.length === 0) {
    console.log('ℹ️  No images found to optimize.');
    return;
  }

  console.log(`Found ${files.length} images to optimize\n`);

  let optimized = 0;
  for (const file of files) {
    const sourceRoot = file.path.includes(path.join(PUBLIC_ROOT, 'images')) ? IMAGE_SOURCE_DIR : PUBLIC_ROOT;
    const success = await optimizeImage(file, sourceRoot);
    if (success) optimized++;
  }

  console.log(`\n✨ Optimization complete: ${optimized}/${files.length} images processed`);
  console.log(`📁 Optimized images saved to: ${path.relative(process.cwd(), OUTPUT_DIR)}`);
  
  // Deploy optimized images - Create manifest for Next build
  try {
    const manifestPath = path.join(process.cwd(), 'public', 'optimized-images.json');
    const manifest: Record<string, string[]> = {};

    const optimizedFiles = collectFiles(OUTPUT_DIR);

    optimizedFiles.forEach((filePath) => {
      const stats = fs.statSync(filePath);
      if (!stats || stats.size === 0) {
        fs.rmSync(filePath, { force: true });
        return;
      }

      const relativePath = path.relative(OUTPUT_DIR, filePath).replace(/\\/g, '/');
      const match = relativePath.match(/^(.*?)-(\d+)w\.webp$/);
      if (match) {
        const [, origName] = match;
        const key = origName;
        if (!manifest[key]) manifest[key] = [];
        manifest[key].push(`/images/optimized/${relativePath}`);
      }
    });

    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log(`✅ Created optimization manifest at ${path.relative(process.cwd(), manifestPath)}`);
  } catch (err) {
    console.warn(`⚠️  Could not create manifest:`, err instanceof Error ? err.message : err);
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
