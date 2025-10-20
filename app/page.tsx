import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/services/ServicesSection';
import ImageCarouselClient from '@/components/home/ImageCarouselClient';
import AboutClient from '@/components/about/AboutClient';
import GalleryClient from '@/components/gallery/GalleryClient';
import TestimonialsClient from '@/components/testimonials/TestimonialsClient';

export const metadata: Metadata = {
  title: "Best Invisible Grills & Safety Nets Services | call 7339306098, 9618568669",
  description: "KGR Enterprises offers professional invisible grills and safety nets installation in Hyderabad, Bangalore, Chennai. Quality service, 5-year warranty. Call +91 95517 67356",
   keywords: [
    "invisible grills in Hyderabad",
    "Kgr invisible grills",
    "invisible grills near me",
    "invisible grills in Bangalore",
    "safety nets in Hyderabad",
    "safety nets near me",
    "Kgr safety nets",
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
    title: "Best Invisible Grills & Safety Nets Services | Call 7339306098, 9618568669",
    description: "Trusted Invisible Grills & Safety Nets installation services for balconies, children protection, and bird control. Professional team, quality materials, 5-year warranty.",
  url: "https://invisiblegrillsandsafetynets.in",
    images: [
      {
        url: "/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "KGR Enterprises Home"
      }
    ],
  },
};

export default function HomePage() {
  return (
    <>
  <HeroSection />
  <ImageCarouselClient />
  <ServicesSection />
  <AboutClient />
  <GalleryClient />
  <TestimonialsClient />
    </>
  );
}