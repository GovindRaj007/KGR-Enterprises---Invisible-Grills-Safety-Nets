import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/services/ServicesSection';
import ImageCarouselClient from '@/components/home/ImageCarouselClient';
import AboutClient from '@/components/about/AboutClient';
import GalleryClient from '@/components/gallery/GalleryClient';
import TestimonialsClient from '@/components/testimonials/TestimonialsClient';

export const metadata: Metadata = {
  title: "Best Invisible Grills & Safety Nets | call 7339306098, 9618568669",
  description: "KGR Enterprises offers professional invisible grills and safety nets installation in Hyderabad, Bangalore, Chennai. Quality service, 5-year warranty. Call +91 95517 67356",
     keywords: [
      "kgr invisible grills",
      "invisible grills in hyderabad",
      "best invisible grills in hyderabad",
      "safety nets in hyderabad",
      "best safety nets in hyderabad",
      "best invisible grills in bangalore",
      "invisible grills in bangalore",
      "safety nets in bangalore",
      "invisible grills in chennai",
      "best safety nets in bangalore",
      "safety nets in chennai",
      "invisible grills in visakhapatnam",
      "safety nets in visakhapatnam",
      "best invisible grills in chennai",
      "best safety nets in chennai",
      "best invisible grills in visakhapatnam",
      "best safety nets in visakhapatnam",
      "pegion nets in hyderabad",
      "balcony safety nets in hyderabad",
      "pegion nets in bangalore",
      "balcony safety nets in bangalore",
      "pegion nets in chennai",
      "balcony safety nets in chennai"
  ],
  openGraph: {
    title: "Invisible Grills & Safety Nets in hyderabad, Bangalore, Chennai, Vijayawada",
    description: "Best invisible grills, safety nets, bird protection, and sports nets in South India",
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