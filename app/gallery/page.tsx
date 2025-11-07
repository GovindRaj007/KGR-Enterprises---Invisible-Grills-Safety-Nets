import type { Metadata } from 'next';
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
       "invisible grills in Hyderabad",
    "Kgr invisible grills",
    "invisible grills near me",
    "invisible grills in Bangalore",
    "safety nets in Hyderabad",
    "safety net installation near me",
    "Kgr safety nets",
    "invisible grill installation",
    "best invisible grills in hyderabad",
    "best invisible grills in bangalore",
    "balcony safety nets in bangalore",
    "pigeon nets in hyderabad",
    "best invisible grills in chennai",
    "safety nets in bangalore",
    "balcony safety nets in hyderabad",
    "invisible grills in chennai",
    "safety nets in Chennai",
    "balcony safety nets in Chennai",
    "pigeon nets in chennai",
    "invisible grills in vijayawada",
    "safety nets in vijayawada",
    "balcony safety nets in vijayawada",
    "children safety nets in Hyderabad",
    "children safety nets in Visakhapatnam",
    "best invisible grills in visakhapatnam",
    "bird nets",
    "invisible grills",
    "pigeon nets",
    "duct area nets",
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
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://invisiblegrillsandsafetynets.in/'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Gallery',
        'item': 'https://invisiblegrillsandsafetynets.in/gallery'
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="min-h-screen bg-background">
        <GalleryClient />
      </div>
    </>
  );
}