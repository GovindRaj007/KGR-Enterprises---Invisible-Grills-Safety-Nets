import type { Metadata } from "next";
import { HeroSlider } from "@/components/home/HeroSlider";
import HeroWithHeaderWrapper from "@/components/layout/HeroWithHeaderWrapper";
import ServicesSection from "@/components/services/ServicesSection";
import ImageCarouselClient from "@/components/home/ImageCarouselClient";
import AboutClient from "@/components/about/AboutClient";
import GalleryClient from "@/components/gallery/GalleryClient";
import TestimonialsClient from "@/components/testimonials/TestimonialsClient";
import ServiceLocationsSlider from "@/components/services/ServiceLocationsSlider";

export const metadata: Metadata = {
  title:
    "KGR Enterprises - Best Invisible Grills & Safety Nets Manufacturer in South India | call 7339306098, 9618568669",
  description:
    "Premium invisible grills and safety nets installation across Hyderabad, Bangalore, Chennai. Marine-grade stainless steel, superior protection, 15-year warranty. Best quality, trusted service since 2008",
  keywords: [
    // Brand & Company Keywords
    "KGR Enterprises",
    "KGR safety solutions",
    "trusted safety net provider",
    "certified installation services",
    // Main Service Keywords
    "invisible grills",
    "safety nets",
    "marine-grade invisible grills",
    "cable mesh grills",
    "bird protection nets",
    "pigeon nets",
    "child-safe balcony",
    "rust-proof safety solutions",
    // Generic Service Terms
    "safety net installation",
    "invisible grill installation",
    "balcony protection",
    "child safety solutions",
    "bird-proof solutions",
    "terrace safety nets",
    // Geographic - Primary Cities
    "invisible grills in Hyderabad",
    "safety nets in Bangalore",
    "invisible grills in Chennai",
    "safety nets in Vijayawada",
    "invisible grills in Visakhapatnam",
    // Quality & Trust Indicators
    "best invisible grills",
    "premium safety nets",
    "professional installation",
    "15-year warranty",
    "family-owned business",
    "expert installation team",
    // Long-tail & Voice Search
    "affordable invisible grills near me",
    "best safety net company",
    "how to install invisible grills",
    "balcony safety net solutions",
    "professional grills installation service",
    "certified safety net dealers",
  ],
  openGraph: {
    locale: "en_IN",
    type: "website",
    title:
      "KGR Enterprises - Best Invisible Grills & Safety Nets Manufacturer in South India | call 7339306098, 9618568669",
    description:
      "Premium invisible grills and safety nets installation across Hyderabad, Bangalore, Chennai. Marine-grade stainless steel, superior protection, 15-year warranty. Best quality, trusted service since 2008",
    url: "https://invisiblegrillsandsafetynets.in/",
    siteName: "KGR Enterprises",
    images: [
      {
        url: "/logo.png",
        width: 300,
        height: 300,
        type: "image/png",
      },
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
      <HeroWithHeaderWrapper>
        <div style={{ borderRadius: '1rem' }}>
          <HeroSlider />
        </div>
      </HeroWithHeaderWrapper>
      <ImageCarouselClient />
      <ServicesSection />
      <AboutClient />
      <GalleryClient />
      <ServiceLocationsSlider />
      <TestimonialsClient />
    </>
  );
}
