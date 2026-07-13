#!/usr/bin/env node
/**
 * Post-build optimization script
 * Copies optimization manifest to output directory for static export
 */

const fs = require('fs');
const path = require('path');

const manifestSource = path.join(process.cwd(), 'public', 'optimized-images.json');
const outDir = path.join(process.cwd(), 'out');
const manifestDest = path.join(outDir, 'optimized-images.json');

// Copy optimization manifest to output directory
try {
  if (fs.existsSync(manifestSource)) {
    // Ensure out directory exists
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    fs.copyFileSync(manifestSource, manifestDest);
    console.log('✅ Copied optimization manifest to static export');
  } else {
    console.log('ℹ️  No optimization manifest found (first build?)');
  }
} catch (err) {
  console.warn('⚠️  Could not copy optimization manifest:', err.message);
  // Don't fail the build if manifest copy fails
}

// Also ensure optimized images directory is in output
const imagesSrc = path.join(process.cwd(), 'public', 'images', 'optimized');
const imagesDest = path.join(process.cwd(), 'out', 'images', 'optimized');

try {
  if (fs.existsSync(imagesSrc)) {
    // Recursively copy directory
    const copyDirRecursive = (src, dest) => {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }

      const files = fs.readdirSync(src);
      files.forEach(file => {
        const srcPath = path.join(src, file);
        const destPath = path.join(dest, file);

        if (fs.statSync(srcPath).isDirectory()) {
          copyDirRecursive(srcPath, destPath);
        } else {
          fs.copyFileSync(srcPath, destPath);
        }
      });
    };

    copyDirRecursive(imagesSrc, imagesDest);
    console.log('✅ Copied optimized images to static export');
  }
} catch (err) {
  console.warn('⚠️  Warning: Could not copy all optimized images:', err.message);
  // Don't fail the build if image copy fails - originals will still work
}
