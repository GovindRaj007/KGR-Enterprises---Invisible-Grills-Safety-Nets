import type { Metadata } from 'next';
import GalleryClient from '@/components/gallery/GalleryClient';

export const metadata: Metadata = {
  title: "Gallery - Our Safety Installations | KGR Enterprises",
  description: "View our portfolio of invisible grills, safety nets, and bird protection installations across Hyderabad, Bangalore, Chennai. 5000+ successful projects completed.",
  keywords: [
    "safety nets gallery",
    "invisible grills photos",
    "installation examples",
    "customer projects",
    "safety installations Hyderabad",
    "safety installations Bangalore",
  ],
  openGraph: {
    title: "Installation Gallery - KGR Enterprises",
    description: "Browse our portfolio of professional safety net and invisible grill installations",
    url: "https://safetypronets.com/gallery",
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
      {/* Page Header */}
      {/* <div className="bg-gradient-to-r from-primary/10 to-accent/10 py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Our <span className="text-gradient">Installation Gallery</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our portfolio of 5000+ successful safety installations across Hyderabad, 
            Bangalore, Chennai, and Andhra Pradesh
          </p>
        </div>
      </div> */}

  {/* Gallery Section */}
  <GalleryClient />
    </div>
  );
}