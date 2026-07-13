import type { Metadata } from 'next';

import GalleryClient from '@/components/gallery/GalleryClient';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "Gallery - Our Safety Installations | KGR Invisible Grills & Safety Nets",
  description: "View our portfolio of invisible grills, safety nets, and pigeon net installations across Chennai, Hyderabad, Bangalore, and Andhra Pradesh. 5000+ successful projects completed.",
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
    "pigeon net projects",
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
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'KGR Enterprises',
    'url': 'https://invisiblegrillsandsafetynets.in',
    'logo': 'https://invisiblegrillsandsafetynets.in/logo.png',
    'description': 'Portfolio and gallery of professional invisible grills and safety nets installations across Chennai, Hyderabad, Bangalore, and Andhra Pradesh. 5000+ completed projects.',
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'bestRating': '5',
      'worstRating': '1',
      'ratingCount': '1126',
      'reviewCount': '1126'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <div className="min-h-screen bg-background">
        <GalleryClient showBreadcrumbs />
      </div>
    </>
  );
}