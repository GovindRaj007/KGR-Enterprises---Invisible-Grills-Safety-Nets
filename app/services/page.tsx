import type { Metadata } from "next";
import ServicesSection from "@/components/services/ServicesSection";
import { servicesData } from "@/data/servicesData";
import ServiceLocationsSlider from "@/components/services/ServiceLocationsSlider";

export const metadata: Metadata = {
  title: "Our Services - Invisible Grills, Safety Nets & Bird Protection",
  description:
    "Complete range of safety solutions: Invisible grills, balcony safety nets, children protection nets, bird nets, pigeon nets, sports nets. Professional installation across South India.",
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-video-preview": -1,
    "max-snippet": -1,
  },
  alternates: {
    canonical: "https://invisiblegrillsandsafetynets.in/services",
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
    description:
      "Invisible grills, safety nets, bird protection, and sports nets installation services",
    url: "https://invisiblegrillsandsafetynets.in/services",
    images: [
      {
        url: "/og-services.jpg",
        width: 1200,
        height: 630,
        alt: "Invisible Grills & Safety Nets - Hyderabad - Bangalore - Chennai - Vijayawada",
      },
    ],
    locale: "en-IN",
  },
};

export default function ServicesPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://invisiblegrillsandsafetynets.in/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: "https://invisiblegrillsandsafetynets.in/services",
      },
    ],
  };

  const servicesPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "KGR Enterprises Services",
    description:
      "Complete range of safety solutions including invisible grills, safety nets, bird protection, and sports nets.",
    url: "https://invisiblegrillsandsafetynets.in/services",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: Object.entries(servicesData).map(
        ([slug, service], index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Service",
            name: service.title,
            description: service.description,
            url: `https://invisiblegrillsandsafetynets.in/services/${slug}`,
            image: service.image,
            provider: {
              "@type": "Organization",
              name: "KGR Enterprises",
              url: "https://invisiblegrillsandsafetynets.in",
            },
          },
        })
      ),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesPageSchema) }}
      />
      <ServicesSection />
      <section className="pb-12 md:pb-16">
        <div className="container mx-auto px-4">
          <ServiceLocationsSlider variant="stats" slug="" />
        </div>
      </section>
    </>
  );
}
