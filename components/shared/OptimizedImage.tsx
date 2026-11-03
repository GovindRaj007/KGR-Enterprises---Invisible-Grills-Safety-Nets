'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

type OptimizedImageProps = {
  src: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
  style?: React.CSSProperties;
  width?: number;
  height?: number;
  priority?: boolean;
  fetchPriority?: 'high' | 'low' | 'auto';
  sizes?: string;
  fill?: boolean;
  [key: string]: unknown;
};

// basename -> optimized WebP path, inlined at build time by next.config.ts.
// Resolving it synchronously means the server-rendered HTML already points at
// the small WebP, so the browser never downloads the heavy original first.
const OPTIMIZED_IMAGES: Record<string, string> = JSON.parse(
  process.env.NEXT_PUBLIC_OPTIMIZED_IMAGES || '{}'
);

function resolveOptimizedSrc(src: string): string {
  if (src.startsWith('http') || src.startsWith('/images/optimized/')) return src;
  const basename = src.split('/').pop()?.split('.')[0];
  return (basename && OPTIMIZED_IMAGES[basename]) || src;
}

const OptimizedImage = ({
  src,
  alt,
  className = '',
  loading = 'lazy',
  style = {},
  width = 1200,
  height = 800,
  priority = false,
  fetchPriority,
  sizes,
  fill = false,
  ...props
}: OptimizedImageProps) => {
  // Falls back to the original file if the optimized one fails to load.
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    setIsFallback(false);
  }, [src]);

  const imageSrc = isFallback ? src : resolveOptimizedSrc(src);

  return (
    <Image
      src={imageSrc}
      alt={alt}
      className={className}
      loading={priority ? 'eager' : loading}
      priority={priority}
      fetchPriority={priority ? 'high' : fetchPriority}
      unoptimized
      sizes={sizes ?? '(max-width: 768px) 100vw, 50vw'}
      style={style}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      onError={() => {
        if (!isFallback) {
          setIsFallback(true);
        }
      }}
      {...props}
    />
  );
};

export default OptimizedImage;
