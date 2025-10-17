import type { Metadata } from 'next';
import ServicesSection from '@/components/services/ServicesSection';

export const metadata: Metadata = {
  title: "Our Services - Invisible Grills, Safety Nets & Bird Protection",
  description: "Complete range of safety solutions: Invisible grills, balcony safety nets, children protection nets, bird nets, pigeon nets, sports nets. Professional installation across South India.",
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