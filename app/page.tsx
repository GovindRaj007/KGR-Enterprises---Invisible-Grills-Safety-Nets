import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/services/ServicesSection';
import ImageCarouselClient from '@/components/home/ImageCarouselClient';
import AboutClient from '@/components/about/AboutClient';
import GalleryClient from '@/components/gallery/GalleryClient';
import TestimonialsClient from '@/components/testimonials/TestimonialsClient';
import FeaturedLocations from '@/components/home/FeaturedLocations';

export const metadata: Metadata = {
  title: "KGR Enterprises - Best Invisible Grills & Safety Nets Manufacturer in South India | call 7339306098, 9618568669",
  description: "Premium invisible grills and safety nets installation across Hyderabad, Bangalore, Chennai. Marine-grade stainless steel, superior protection, 15-year warranty. Best quality, trusted service since 2008",
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
    "bird nets",
    "invisible grills",
    "pigeon nets",
    "duct area nets",
    "Chennai",
    "Vijayawada",
    "Visakhapatnam",
  ],
  openGraph: {
    locale: "en_IN",
    type: "website",
    title: "KGR Enterprises - Best Invisible Grills & Safety Nets Manufacturer in South India | call 7339306098, 9618568669",
    description: "Premium invisible grills and safety nets installation across Hyderabad, Bangalore, Chennai. Marine-grade stainless steel, superior protection, 15-year warranty. Best quality, trusted service since 2008",
    url: "https://invisiblegrillsandsafetynets.in/",
    siteName: "KGR Enterprises",
    images: [
      {
        url: "/logo.png",
        width: 300,
        height: 300,
        type: "image/png"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};



export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ImageCarouselClient />
      <ServicesSection />
      <FeaturedLocations />
      <AboutClient />
      <GalleryClient />
      <TestimonialsClient />
    </>
  );
}