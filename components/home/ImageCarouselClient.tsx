"use client";

import dynamic from 'next/dynamic';

import { CarouselSkeleton } from '@/components/ui/Skeletons';
const ImageCarousel = dynamic(() => import('./ImageCarousel'), { ssr: false, loading: () => <CarouselSkeleton /> });

import LazyMount from '@/components/ui/LazyMount';

export default function ImageCarouselClient() {
  return (
    <LazyMount>
      <ImageCarousel />
    </LazyMount>
  );
}
