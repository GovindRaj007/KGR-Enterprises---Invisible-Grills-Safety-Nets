import type { Metadata } from "next";
export const dynamic = 'force-static';
import { servicesData } from "@/data/servicesData";
import { ServicesSectionClient, ServiceLocationsSliderClient } from "@/components/services/ServicesClientWrapper";

export const metadata: Metadata = {
  title: "Our Services - Invisible Grills, Safety Nets & Pigeon Nets",
  description:
    "Complete range of safety solutions: Invisible grills, balcony safety nets, children protection nets, pigeon nets, sports nets. Professional installation across South India.",
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
  openGraph: {
    title: "KGR Enterprises Services - Complete Safety Solutions",
    description:
      "Invisible grills, safety nets, pigeon nets, and sports nets installation services",
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

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'KGR Enterprises',
    'url': 'https://invisiblegrillsandsafetynets.in',
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'bestRating': '5',
      'worstRating': '1',
      'ratingCount': '1126',
      'reviewCount': '1126'
    }
  };

  const servicesPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "KGR Enterprises Services",
    description:
      "Complete range of safety solutions including invisible grills, safety nets, pigeon nets, and sports nets.",
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

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [organizationSchema, servicesPageSchema]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
      />
      <ServicesSectionClient showBreadcrumbs />
      <ServiceLocationsSliderClient />
    </>
  );
}
