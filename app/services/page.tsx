import type { Metadata } from 'next';
import ServicesSection from '@/components/services/ServicesSection';

export const metadata: Metadata = {
  title: "Our Services - Invisible Grills, Safety Nets & Bird Protection",
  description: "Complete range of safety solutions: Invisible grills, balcony safety nets, children protection nets, bird nets, pigeon nets, sports nets. Professional installation across South India.",
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
    title: "KGR Enterprises Services - Complete Safety Solutions",
    description: "Invisible grills, safety nets, bird protection, and sports nets installation services",
  url: "https://invisiblegrillsandsafetynets.in/services",
    images: [
      {
        url: "/og-services.jpg",
        width: 1200,
        height: 630,
        alt: "Invisible Grills & Safety Nets - Hyderabad - Bangalore - Chennai - Vijayawada",
      }
    ],
    locale: "en-IN",
  },
};

export default function ServicesPage() {
  return <ServicesSection />;
}