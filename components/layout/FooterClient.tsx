"use client";

import dynamic from 'next/dynamic';

import { FooterSkeleton } from '@/components/ui/Skeletons';
const Footer = dynamic(() => import('./Footer'), { ssr: false, loading: () => <FooterSkeleton /> });

import LazyMount from '@/components/ui/LazyMount';

export default function FooterClient() {
  return (
    <LazyMount>
      <Footer />
    </LazyMount>
  );
}
