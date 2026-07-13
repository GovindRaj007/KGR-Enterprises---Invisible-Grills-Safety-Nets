'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

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

const manifestUrl = '/optimized-images.json';
let manifestCache: Record<string, string[]> | null = null;
let manifestPromise: Promise<Record<string, string[]>> | null = null;

async function getManifest() {
  if (manifestCache) return manifestCache;

  // If the optimized manifest was preloaded before hydration, use it and avoid a fetch
  if (typeof window !== 'undefined' && (window as any).__OPTIMIZED_IMAGES__) {
    manifestCache = (window as any).__OPTIMIZED_IMAGES__ as Record<string, string[]>;
    return manifestCache;
  }

  if (!manifestPromise) {
    manifestPromise = fetch(manifestUrl)
      .then(async (response) => {
        if (!response.ok) return {};
        return (await response.json()) as Record<string, string[]>;
      })
      .catch(() => ({}));
  }
  manifestCache = await manifestPromise;
  return manifestCache;
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
  const [optimizedSrc, setOptimizedSrc] = useState(src);
  const [isFallback, setIsFallback] = useState(false);

  const fallbackSrc = useMemo(() => src, [src]);

  useEffect(() => {
    if (src.startsWith('http') || src.startsWith('/images/optimized/')) {
      setOptimizedSrc(src);
      setIsFallback(false);
      return;
    }

    setOptimizedSrc(src);
    setIsFallback(false);

    let isMounted = true;

    getManifest().then((manifest) => {
      if (!isMounted) return;
      const basename = src.split('/').pop()?.split('.')[0];
      if (basename && manifest[basename]?.length) {
        setOptimizedSrc(manifest[basename][0]);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [src]);

  const imageSrc = isFallback ? fallbackSrc : optimizedSrc;

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
