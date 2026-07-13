"use client";

import dynamic from 'next/dynamic';

import { GallerySkeleton } from '@/components/ui/Skeletons';
const GallerySection = dynamic(() => import('./GallerySection'), { ssr: false, loading: () => <GallerySkeleton /> });

import LazyMount from '@/components/ui/LazyMount';

interface GalleryClientProps {
  showBreadcrumbs?: boolean;
}

export default function GalleryClient({ showBreadcrumbs = false }: GalleryClientProps) {
  return (
    <LazyMount>
      <GallerySection showBreadcrumbs={showBreadcrumbs} />
    </LazyMount>
  );
}
