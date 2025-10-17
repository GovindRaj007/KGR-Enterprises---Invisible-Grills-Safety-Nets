"use client";

import dynamic from 'next/dynamic';

import { TestimonialsSkeleton } from '@/components/ui/Skeletons';
const TestimonialsSection = dynamic(() => import('./TestimonialsSection'), { ssr: false, loading: () => <TestimonialsSkeleton /> });

import LazyMount from '@/components/ui/LazyMount';

export default function TestimonialsClient() {
  return (
    <LazyMount>
      <TestimonialsSection />
    </LazyMount>
  );
}
