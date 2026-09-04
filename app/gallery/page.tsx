import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';

import GalleryClient from '@/components/gallery/GalleryClient';

export const metadata: Metadata = {
  title: "Installation Gallery | KGR Invisible Grills & Safety Nets",
  description: "Our portfolio of invisible grill, safety net and bird protection installations across Bangalore, Hyderabad, Chennai and Andhra Pradesh. 5000+ projects.",
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-video-preview': -1,
    'max-snippet': -1,
  },
  alternates: {
    canonical: "https://invisiblegrillsandsafetynets.in/gallery/",
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
    "Bangalore installations",
    "Hyderabad projects",
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
  url: "https://invisiblegrillsandsafetynets.in/gallery/",
    images: [
      {
        url: "/images/service-gallery-1.jpg",
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
    'description': 'Portfolio and gallery of professional invisible grills and safety nets installations across Bangalore, Hyderabad, Chennai, and South India. 5000+ completed projects.',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-6">
          <div className="[&_ol]:md:items-center [&_ol]:md:flex">
            <Breadcrumbs
              items={[
                { label: "Gallery" },
              ]}
              darkMode={false}
            />
          </div>
        </div>
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
            Invisible Grills &amp; Safety Nets Gallery
          </h1>
          <p className="text-muted-foreground max-w-3xl">
            Completed invisible grill, safety net and bird protection installations from
            Bangalore, Hyderabad, Chennai, Vijayawada and Visakhapatnam.
          </p>
        </div>
        <GalleryClient />
      </div>
    </>
  );
}