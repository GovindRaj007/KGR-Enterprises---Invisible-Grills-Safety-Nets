"use client";

import dynamic from 'next/dynamic';
import { ServiceCardsSkeleton } from '@/components/ui/Skeletons';

const ServicesSection = dynamic(
  () => import('./ServicesSection'),
  { 
    ssr: false,
    loading: () => <ServiceCardsSkeleton />
  }
);

const ServiceLocationsSlider = dynamic(
  () => import('./ServiceLocationsSlider'),
  { 
    ssr: false,
    loading: () => <div className="h-40 bg-muted animate-pulse rounded" />
  }
);

export function ServicesSectionClient() {
  return <ServicesSection />;
}

export function ServiceLocationsSliderClient() {
  return <ServiceLocationsSlider />;
}
