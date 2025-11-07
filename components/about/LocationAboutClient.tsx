"use client";

import dynamic from 'next/dynamic';
import { AboutSkeleton } from '@/components/ui/Skeletons';

const LocationAboutSection = dynamic(
  () => import('./LocationAboutSection'),
  { 
    ssr: false,
    loading: () => <AboutSkeleton />
  }
);

import LazyMount from '@/components/ui/LazyMount';

export default function LocationAboutClient({ location }: { location: string }) {
  return (
    <LazyMount>
      <LocationAboutSection location={location} />
    </LazyMount>
  );
}