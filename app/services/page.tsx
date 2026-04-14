import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { servicesData } from "@/data/servicesData";
import { ServicesSectionClient, ServiceLocationsSliderClient } from "@/components/services/ServicesClientWrapper";

export const metadata: Metadata = {
  title: "Our Services - Invisible Grills, Safety Nets & Bird Protection",
  description:
    "Complete range of safety solutions: Invisible grills, balcony safety net, children protection nets, bird nets, pigeon nets, sports nets. Professional installation across South India.",
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
    // Category & Service Types
    "types of safety nets",
    "grill systems comparison",
    "invisible vs traditional grills",
    "service categories",
    // Problem-Solving Keywords
    "child safety solutions",
    "bird protection systems",
    "child-safe balcony",
    "bird-proof solutions",
    "rust-proof materials",
    "UV-resistant nets",
    // Service Features
    "marine-grade grills",
    "cable mesh systems",
    "unobstructed views",
    "professional installation",
    "durable safety nets",
    // Specific Services
    "invisible grills",
    "safety nets",
    "pigeon nets",
    "bird nets",
    "children protection nets",
    "sports nets",
    "terrace protection",
    // Quality & Trust
    "certified installation",
    "expert services",
    "best quality materials",
    "15-year warranty",
    "trusted service provider",
    // Long-tail Service Keywords
    "affordable safety systems",
    "professional installation services",
    "custom grill solutions",
    "all types of safety nets",
    "specialized installation experts",
    // Comparative & Discovery
    "safety solutions for families",
    "best bird protection methods",
    "how to choose safety nets",
    "professional vs DIY installation",
    "compare safety options",
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

  const servicesPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "KGR Enterprises Services",
    description:
      "Complete range of safety solutions including invisible grills, safety nets, bird protection, and sports nets.",
    url: "https://invisiblegrillsandsafetynets.in/services/",
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
            url: `https://invisiblegrillsandsafetynets.in/services/${slug}/`,
            image: service.image,
            provider: {
              "@type": "Organization",
              name: "KGR Enterprises",
              url: "https://invisiblegrillsandsafetynets.in/",
            },
          },
        }),
      ),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesPageSchema) }}
      />
      <div className="container mx-auto px-4 py-6">
        <Breadcrumbs
          items={[
            { label: "Services" },
          ]}
          darkMode={false}
        />
      </div>
      <ServicesSectionClient />
      <ServiceLocationsSliderClient />
    </>
  );
}
