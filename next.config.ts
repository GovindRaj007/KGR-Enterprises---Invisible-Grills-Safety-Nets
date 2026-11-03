import fs from 'fs'
import path from 'path'
import type { NextConfig } from 'next'

// Map of image basename -> optimized WebP path, written by the prebuild step
// (scripts/optimize-images.ts). Inlined at build time so OptimizedImage can put
// the small WebP straight into the server-rendered HTML instead of loading the
// original first and swapping after hydration. Missing manifest (e.g. a fresh
// clone running `next dev`) simply means the original images are used.
function readOptimizedImages(): Record<string, string> {
  try {
    const manifest: Record<string, string[]> = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), 'public', 'optimized-images.json'), 'utf8')
    )
    return Object.fromEntries(
      Object.entries(manifest).filter(([, files]) => files.length).map(([name, files]) => [name, files[0]])
    )
  } catch {
    return {}
  }
}

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'export',
  outputFileTracingRoot: process.cwd(),
  env: {
    NEXT_PUBLIC_OPTIMIZED_IMAGES: JSON.stringify(readOptimizedImages()),
  },
  images: {
    unoptimized: true,
    loader: 'custom',
    loaderFile: './image-loader.ts',
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    formats: ['image/webp'],
    minimumCacheTTL: 60,
  },
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    optimizeCss: true,
  },
}

export default nextConfig
