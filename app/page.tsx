import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/services/ServicesSection';
import ImageCarouselClient from '@/components/home/ImageCarouselClient';
import AboutClient from '@/components/about/AboutClient';
import GalleryClient from '@/components/gallery/GalleryClient';
import TestimonialsClient from '@/components/testimonials/TestimonialsClient';

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
    locale: "en_US",
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

const homePageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://invisiblegrillsandsafetynets.in/",
      "url": "https://invisiblegrillsandsafetynets.in/",
      "name": "KGR Enterprises - Best Invisible Grills & Safety Nets Manufacturer in South India | call 7339306098, 9618568669",
      "isPartOf": {
        "@id": "https://invisiblegrillsandsafetynets.in/#website"
      },
      "primaryImageOfPage": {
        "@id": "https://invisiblegrillsandsafetynets.in/#primaryimage"
      },
      "image": {
        "@id": "https://invisiblegrillsandsafetynets.in/#primaryimage"
      },
      "thumbnailUrl": "https://invisiblegrillsandsafetynets.in/logo.png",
      "datePublished": "2008-01-01T00:00:00+00:00",
      "dateModified": "2025-10-29T13:06:13+00:00",
      "description": "Premium invisible grills and safety nets installation across Hyderabad, Bangalore, Chennai. Marine-grade stainless steel, superior protection, 15-year warranty. Best quality, trusted service since 2008",
      "breadcrumb": {
        "@id": "https://invisiblegrillsandsafetynets.in/#breadcrumb"
      },
      "inLanguage": "en-US",
      "potentialAction": [
        {
          "@type": "ReadAction",
          "target": [
            "https://invisiblegrillsandsafetynets.in/"
          ]
        }
      ]
    },
    {
      "@type": "ImageObject",
      "inLanguage": "en-US",
      "@id": "https://invisiblegrillsandsafetynets.in/#primaryimage",
      "url": "https://invisiblegrillsandsafetynets.in/logo.png",
      "contentUrl": "https://invisiblegrillsandsafetynets.in/logo.png",
      "width": 300,
      "height": 300,
      "caption": "kgr-logo"
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://invisiblegrillsandsafetynets.in/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://invisiblegrillsandsafetynets.in/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://invisiblegrillsandsafetynets.in/services/"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "About",
          "item": "https://invisiblegrillsandsafetynets.in/about/"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Gallery",
          "item": "https://invisiblegrillsandsafetynets.in/gallery/"
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": "Contact",
          "item": "https://invisiblegrillsandsafetynets.in/contact/"
        },
        {
          "@type": "ListItem",
          "position": 6,
          "name": "Hyderabad",
          "item": "https://invisiblegrillsandsafetynets.in/locations/hyderabad/"
        },
        {
          "@type": "ListItem",
          "position": 7,
          "name": "Bangalore",
          "item": "https://invisiblegrillsandsafetynets.in/locations/bangalore/"
        },
        {
          "@type": "ListItem",
          "position": 8,
          "name": "Chennai",
          "item": "https://invisiblegrillsandsafetynets.in/locations/chennai/"
        },
        {
          "@type": "ListItem",
          "position": 9,
          "name": "Vijayawada",
          "item": "https://invisiblegrillsandsafetynets.in/locations/vijayawada/"
        },
        {
          "@type": "ListItem",
          "position": 10,
          "name": "Visakhapatnam",
          "item": "https://invisiblegrillsandsafetynets.in/locations/visakhapatnam/"
        }
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://invisiblegrillsandsafetynets.in/#website",
      "url": "https://invisiblegrillsandsafetynets.in/",
      "name": "KGR Enterprises",
      "description": "Premium invisible grills and safety nets installation across Hyderabad, Bangalore, Chennai. Marine-grade stainless steel, superior protection, 15-year warranty. Best quality, trusted service since 2008",
      "inLanguage": "en-US"
    }
  ]
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homePageSchema),
        }}
      />
      <HeroSection />
      <ImageCarouselClient />
      <ServicesSection />
      <AboutClient />
      <GalleryClient />
      <TestimonialsClient />
    </>
  );
}