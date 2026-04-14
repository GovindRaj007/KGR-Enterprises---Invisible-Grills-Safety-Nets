"use client";

import dynamic from 'next/dynamic';
import { 
  ServiceCardsSkeleton,
} from '@/components/ui/Skeletons';

const RelatedServicesComponent = dynamic(
  () => import('./RelatedServices'),
  { 
    ssr: false,
    loading: () => <ServiceCardsSkeleton />
  }
);

export function RelatedServicesClient({ currentService }: { currentService: string }) {
  return <RelatedServicesComponent currentService={currentService} />;
}
