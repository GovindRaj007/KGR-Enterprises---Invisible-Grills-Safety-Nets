"use client";

import dynamic from 'next/dynamic';

import { AboutSkeleton } from '@/components/ui/Skeletons';
const AboutSection = dynamic(() => import('./AboutSection'), { ssr: false, loading: () => <AboutSkeleton /> });

import LazyMount from '@/components/ui/LazyMount';

export default function AboutClient() {
  return (
    <LazyMount>
      <AboutSection />
    </LazyMount>
  );
}
