import type { Metadata } from 'next';
import GalleryClient from '@/components/gallery/GalleryClient';

export const metadata: Metadata = {
  title: "Gallery - Our Safety Installations | KGR Invisible Grills & Safety Nets",
  description: "View our portfolio of invisible grills, safety nets, and bird protection installations across Hyderabad, Bangalore, Chennai. 5000+ successful projects completed.",
  keywords: [
    "safety nets photos",
    "invisible grills photos",
    "invisible grills installation photos",
    "invisible grills services",
    "pegion nets in Hyderabad",
    "safety nets services",
    "Pegion nets services in bangalore",
    "safety nets services in Bangalore",
    "Safety nets services in Hyderabad photos",
    "invisible grills in chennai photos",
    "invisible grills in visakhapatnam photos"
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
    <div className="min-h-screen bg-background">
  <GalleryClient />
    </div>
  );
}