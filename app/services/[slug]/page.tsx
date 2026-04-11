import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { servicesData, serviceSpecificLocationFAQs } from "@/data/servicesData";
import { validLocations, locationData } from "@/constants/locations";
import { getCanonicalUrl } from "@/lib/canonical-url";
import {
  generateServiceMetadata,
  generateServiceFAQSchema,
  PRIMARY_LOCATIONS,
} from "@/lib/seo-metadata";
import { generateServiceSchema } from "@/lib/service-schema";
import { PRIMARY } from "@/constants/contacts";
import { CheckCircle2, ArrowRight, Phone, Shield, Fence, Wind, Ruler, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import HeroWithHeaderWrapper from "@/components/layout/HeroWithHeaderWrapper";
import ServiceImageSlider from "@/components/services/ServiceImageSlider";
import ServiceFAQ from "@/components/services/ServiceFAQ";
import ServiceCTA from "@/components/services/ServiceCTA";
import RelatedServices from "@/components/services/RelatedServices";

type FAQ = { question: string; answer: string };

interface ServiceData {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  category: string;
  features: string[];
  benefits: string[];
  images?: string[];
  image: string;
  specifications: Array<{ label: string; value: string }>;
}

type Props = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

// Generate static params for all services
export async function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData[slug as keyof typeof servicesData];

  if (!service) {
    return {
      title: "Service Not Found - KGR Enterprises",
      verification: {
        google: "P8HUVCb--rZ-IF-X_ZwXQX1FOPvjQI5M0MWRtAwVMfc",
      },
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const baseMetadata = generateServiceMetadata({
    serviceName: service.title,
    serviceSlug: slug,
    shortDescription: service.description,
    longDescription: service.detailedDescription,
    image: service.image,
  });

  const etag = `W/"${slug}-${service.title.replace(/\s+/g, "-").toLowerCase()}"`;
  const canonicalUrl = getCanonicalUrl(`/services/${slug}`);

  return {
    ...baseMetadata,
    verification: {
      google: "P8HUVCb--rZ-IF-X_ZwXQX1FOPvjQI5M0MWRtAwVMfc",
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
    alternates: {
      canonical: canonicalUrl,
    },
    other: {
      ...(baseMetadata.other as Record<string, string>),
      ETag: etag,
    } as Record<string, string>,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  
  // Redirect dealer page to dedicated dealer page
  if (slug === "invisible-grills-dealer") {
    redirect("/invisible-grills-dealer");
  }
  
  const service: ServiceData | undefined = servicesData[slug as keyof typeof servicesData];

  if (!service) notFound();

  const productName =
    service.title.replace(/\b(dealer|supplier|vendor)\b/gi, "").trim() || service.title;

  // Build FAQ array
  const faqs: FAQ[] = [
    {
      question: `What is the cost of ${productName}?`,
      answer: `Costs vary by area, size and specifications. Contact ${PRIMARY.display} for a free quote and site inspection.`,
    },
    {
      question: `Do you provide ${productName} in Hyderabad, Bangalore and Chennai?`,
      answer: `Yes — we provide ${productName} across Hyderabad, Bangalore, Chennai, Vijayawada and major cities in Andhra Pradesh.`,
    },
    {
      question: `How long does ${productName} installation take?`,
      answer: `Installation typically takes 4-6 hours depending on size and site conditions.`,
    },
  ];

  // Add category-specific FAQ
  const categoryFaqTemplates: Record<string, { question: string; answer: string }> = {
    "invisible-grills": {
      question: `Can ${productName} be customized to my balcony or window size?`,
      answer: `Yes — ${productName} systems are fully customizable. We measure on-site and offer mesh size and finish options to match your design and safety needs. Contact us for a free site survey.`,
    },
    "safety-nets": {
      question: `Are the safety nets weather and UV resistant?`,
      answer: `Yes — our safety nets use UV-stabilized HDPE material designed to withstand sun and rain with long-term durability.`,
    },
    "bird-protection": {
      question: `Will bird nets or spikes harm birds?`,
      answer: `No — our bird protection solutions are humane and designed to prevent nesting without causing harm to birds. We prioritize humane, long-lasting control.`,
    },
    sports: {
      question: `Are sports nets suitable for both indoor and outdoor use?`,
      answer: `Yes — our sports nets are built for both indoor and outdoor environments with materials rated for weather exposure and heavy use.`,
    },
  };

  const categoryTemplate = categoryFaqTemplates[service.category];
  if (categoryTemplate) {
    faqs.push(categoryTemplate);
  } else {
    faqs.push({
      question: `Can you customize ${productName} to my requirements?`,
      answer: `Yes — we provide tailored solutions and on-site assessments to ensure the right fit and finish.`,
    });
  }

  // Add location-specific FAQs
  try {
    const serviceFAQs = serviceSpecificLocationFAQs[slug];
    if (serviceFAQs) {
      PRIMARY_LOCATIONS.forEach((loc) => {
        const cityKey = loc.name.toLowerCase();
        const kebabKey = cityKey.replace(/ /g, "-");
        const stateKey = (loc.state || "").toLowerCase().replace(/ /g, "-");

        const candidates = [cityKey, kebabKey, stateKey].filter(Boolean);
        let cityFaqs: FAQ[] | null = null;
        for (const k of candidates) {
          if (serviceFAQs[k as keyof typeof serviceFAQs]) {
            cityFaqs = serviceFAQs[k as keyof typeof serviceFAQs] as FAQ[];
            break;
          }
        }

        if (Array.isArray(cityFaqs)) {
          cityFaqs.forEach((f: FAQ) => faqs.push(f));
        }
      });
    }
  } catch (e) {
    console.warn("Failed to merge service-specific FAQs", e);
  }

  // Generate structured data schemas
  const serviceSchema = generateServiceSchema({
    serviceName: service.title,
    description: service.detailedDescription,
    image: service.image,
    slug: slug,
    category: service.category,
    specifications: service.specifications,
  });

  const faqSchema = generateServiceFAQSchema(faqs);

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      serviceSchema,
      faqSchema,
      {
        "@type": "LocalBusiness",
        "@id": "https://invisiblegrillsandsafetynets.in#organization",
        name: "KGR Enterprises",
        image: {
          "@type": "ImageObject",
          url: "https://invisiblegrillsandsafetynets.in/logo.png",
          width: "180",
          height: "180",
        },
        telephone: PRIMARY.phone,
        priceRange: "₹₹₹",
        url: "https://invisiblegrillsandsafetynets.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Hyderabad",
          addressRegion: "Telangana",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Hyderabad" },
          { "@type": "City", name: "Bangalore" },
          { "@type": "City", name: "Chennai" },
          { "@type": "City", name: "Vijayawada" },
        ],
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "09:00",
          closes: "21:00",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
      />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <HeroWithHeaderWrapper>
          <section className="relative py-16 md:py-28 overflow-hidden" style={{ borderRadius: '1rem' }}>
            <div className="absolute inset-0">
              <img 
                src={service.image} 
                alt={service.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[hsl(222,47%,8%,0.45)] via-[hsl(222,47%,10%,0.35)] to-[hsl(222,47%,10%,0.25)]" />
            </div>
            <div className="absolute inset-0 grid-pattern-dark opacity-30" />
            
            <div className="container mt-[-2rem] relative z-10">
              {/* Breadcrumbs */}
              <Breadcrumbs
                items={[
                  { label: "Services", href: "/services" },
                  { label: service.title },
                ]}
                darkMode={true}
              />

              <div className="mx-auto max-w-4xl text-center">
                {/* Service Category Badge */}
                <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white">
                  {service.category === 'invisible-grills' && <Fence className="h-4 w-4 text-accent" />}
                  {service.category === 'safety-nets' && <Shield className="h-4 w-4 text-accent" />}
                  {service.category === 'bird-protection' && <Wind className="h-4 w-4 text-accent" />}
                  {service.category === 'sports' && <Sparkles className="h-4 w-4 text-accent" />}
                  {!['invisible-grills', 'safety-nets', 'bird-protection', 'sports'].includes(service.category) && <Ruler className="h-4 w-4 text-accent" />}
                  {service.title.includes('Specialist') ? service.category : `${service.title} Specialist`}
                </span>
                
                <h1 className="mb-6 font-heading text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                  {service.title}
                </h1>
                <p className="mb-8 text-lg text-white/80 md:text-xl">
                  {(service as any).heroDescription || service.description}
                </p>
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Button size="lg" className="cta-gradient" asChild>
                    <Link href="/contact" className="flex items-center gap-2">
                      Get Free Quote <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20" asChild>
                    <a href={`tel:${PRIMARY.phone}`} className="flex items-center gap-2">
                      <Phone className="h-5 w-5" /> Call Now
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </HeroWithHeaderWrapper>

        {/* Image Slider */}
        <ServiceImageSlider
          images={
            service.images && service.images.length
              ? service.images
              : [service.image]
          }
          altPrefix={service.title}
        />

        {/* Features Section */}
        <section className="section-bg-1 relative py-16 md:py-24">
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="container relative z-10">
            <h2 className="mb-12 text-center font-heading text-3xl font-bold text-foreground md:text-4xl">
              Why Choose {service.title}?
            </h2>
            <div className="flex flex-col items-center justify-center">
              {/* Features Card */}
              <div className="rounded-2xl bg-gradient-to-br from-[hsl(222,47%,11%)] via-[hsl(217,33%,17%)] to-[hsl(215,25%,22%)] p-8 shadow-lg border border-white/10 w-full md:max-w-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="h-6 w-6 text-accent flex-shrink-0" />
                  <h3 className="font-heading text-xl font-bold text-white">Key Features</h3>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-white/90">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Applications Section - Light Background */}
        <section className="relative py-16 md:py-24 bg-gray-50">
          <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23000000\" fill-opacity=\"0.05\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}} />
          <div className="container relative z-10">
            <div className="grid gap-12 md:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="mb-6 font-heading text-3xl font-bold text-gray-900 md:text-4xl">
                  Applications & Use Cases
                </h2>
                <p className="mb-8 text-gray-700">
                  {service.description}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-800">
                      <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm md:text-base">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-[hsl(222,47%,11%)] via-[hsl(217,33%,17%)] to-[hsl(215,25%,22%)] p-8 border border-white/10">
                <h3 className="mb-6 font-heading text-xl font-semibold text-white">Technical Specifications</h3>
                <dl className="space-y-4">
                  {service.specifications.map((spec, index) => (
                    <div key={index} className="flex justify-between border-b border-white/10 pb-2">
                      <dt className="text-white/60">{spec.label}</dt>
                      <dd className="font-medium text-white">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* Service Areas Links - Dark Background */}
        <section className="section-bg-1 relative py-16 md:py-24">
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="container relative z-10">
            <h2 className="mb-8 text-center font-heading text-3xl font-bold text-foreground">
              {service.title} by Location
            </h2>
            <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-4">
              {validLocations.map((loc) => {
                const locData = locationData[loc];
                return (
                  <Link
                    key={loc}
                    href={`/services/${slug}/${loc}`}
                    className="flex items-center justify-between rounded-xl bg-gradient-to-br from-[hsl(222,47%,11%)] via-[hsl(217,33%,17%)] to-[hsl(215,25%,22%)] p-4 transition-all hover:shadow-lg hover:-translate-y-1"
                  >
                    <span className="font-medium text-white">{locData.name}</span>
                    <ArrowRight className="h-4 w-4 text-accent" />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ Section - White Background */}
        <ServiceFAQ faqs={faqs} />

        {/* CTA Section */}
        <ServiceCTA />

        {/* Related Services - Dark Background */}
        <section className="section-bg-5 relative pb-16 md:pb-24">
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="container relative z-10">
            <h2 className="mb-12 text-center font-heading text-3xl font-bold text-foreground md:text-4xl">
              You May Also Need
            </h2>
            <RelatedServices currentService={slug} />
          </div>
        </section>
      </div>
    </>
  );
}
