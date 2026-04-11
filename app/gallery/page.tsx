import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';

import GalleryClient from '@/components/gallery/GalleryClient';

export const metadata: Metadata = {
  title: "Gallery - Our Safety Installations | KGR Invisible Grills & Safety Nets",
  description: "View our portfolio of invisible grills, safety nets, and bird protection installations across Hyderabad, Bangalore, Chennai. 5000+ successful projects completed.",
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-video-preview': -1,
    'max-snippet': -1,
  },
  keywords: [
    // Portfolio & Gallery Keywords
    "installation portfolio",
    "project showcase",
    "successful installations",
    "before and after",
    "real installations",
    "proven work",
    // Social Proof Keywords
    "5000+ projects completed",
    "customer projects",
    "completed installations",
    "installation examples",
    "gallery showcase",
    // Quality Indicators
    "professional work",
    "quality installations",
    "expert craftsmanship",
    "precision fitting",
    "finished work examples",
    // Service Type Gallery Keywords
    "invisible grills gallery",
    "safety nets installations",
    "bird protection projects",
    "balcony solutions",
    "terrace projects",
    // Specific Service Showcases
    "invisible grill examples",
    "safety net projects",
    "pigeon net installations",
    "children safety projects",
    "residential installations",
    "commercial projects",
    // Location-based Gallery
    "Hyderabad installations",
    "Bangalore projects",
    "Chennai work samples",
    "installation across South India",
    // Inspiration & Discovery Keywords
    "design inspiration",
    "installation ideas",
    "safety solutions showcase",
    "see our work",
    "view our projects",
    "gallery of safety solutions",
    "customer success stories visuals",
  ],
  openGraph: {
    title: "Installation Gallery - KGR Invisible Grills & Safety Nets",
    description: "Browse our portfolio of professional safety net and invisible grill installations",
  url: "https://invisiblegrillsandsafetynets.in/gallery",
    images: [
      {
        url: "/og-gallery.jpg",
        width: 1200,
        height: 630,
        alt: "KGR Enterprises Gallery"
      }
    ],
  },
};

export default function GalleryPage() {

  return (
    <>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumbs
            items={[
              { label: "Gallery" },
            ]}
            darkMode={false}
          />
        </div>
        <GalleryClient />
      </div>
    </>
  );
}