import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/services/ServicesSection';
import ImageCarouselClient from '@/components/home/ImageCarouselClient';
import AboutClient from '@/components/about/AboutClient';
import GalleryClient from '@/components/gallery/GalleryClient';
import TestimonialsClient from '@/components/testimonials/TestimonialsClient';

export const metadata: Metadata = {
  title: "Home - Best Invisible Grills & Safety Nets in Hyderabad",
  description: "KGR Enterprises offers professional invisible grills and safety nets installation in Hyderabad, Bangalore, Chennai. Quality service, 5-year warranty. Call +91 95517 67356",
  openGraph: {
    title: "KGR Enterprises - Professional Safety Solutions",
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