"use client";

import dynamic from 'next/dynamic';

import { GallerySkeleton } from '@/components/ui/Skeletons';
const GallerySection = dynamic(() => import('./GallerySection'), { ssr: false, loading: () => <GallerySkeleton /> });

import LazyMount from '@/components/ui/LazyMount';

export default function GalleryClient() {
  return (
    <LazyMount>
      <GallerySection />
    </LazyMount>
  );
}
