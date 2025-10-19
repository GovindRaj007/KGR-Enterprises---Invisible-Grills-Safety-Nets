import type { Metadata } from 'next';
import ServicesSection from '@/components/services/ServicesSection';

export const metadata: Metadata = {
  title: "Our Services - Invisible Grills, Safety Nets & Bird Protection",
  description: "Complete range of safety solutions: Invisible grills, balcony safety nets, children protection nets, bird nets, pigeon nets, sports nets. Professional installation across South India.",
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
  },
};

export default function ServicesPage() {
  return <ServicesSection />;
}