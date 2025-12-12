import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { servicesData, serviceSpecificLocationFAQs } from "@/data/servicesData";
import { getCanonicalUrl } from "@/lib/canonical-url";
import {
  generateServiceMetadata,
  generateBreadcrumbSchema,
  generateServiceFAQSchema,
  generateLocationContent,
  PRIMARY_LOCATIONS,
} from "@/lib/seo-metadata";
import { generateServiceSchema } from "@/lib/service-schema";
import { PRIMARY } from "@/constants/contacts";
import { Award, CheckCircle2, MapPin, Shield, Star, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ServiceHero from "@/components/services/ServiceHero";
import ServiceImageSlider from "@/components/services/ServiceImageSlider";
import ServiceLocationsSlider from "@/components/services/ServiceLocationsSlider";

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

// Generate metadata for SEO with location keywords
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

  // Generate ETag based on content
  const etag = `W/"${slug}-${service.title
    .replace(/\s+/g, "-")
    .toLowerCase()}"`;

  const canonicalUrl = getCanonicalUrl(`/services/${slug}`);

  return {
    ...baseMetadata,
    verification: {
      google: "P8HUVCb--rZ-IF-X_ZwXQX1FOPvjQI5M0MWRtAwVMfc",
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
  const service: ServiceData | undefined =
    servicesData[slug as keyof typeof servicesData];

  if (!service) notFound();

  const branches = {
    icon: MapPin,
    title: "Main Branches",
    details: [
      {
        label: "Hyderabad",
        value: "15-21-150/17, JK Heights, Balaji Nagar, Kukatpally - 500072",
      },
      {
        label: "Bangalore",
        value:
          "367, 2nd A Main Road, Gokula Extension, Mathikera, Bangalore Division - 560054",
      },
      {
        label: "Chennai",
        value:
          "25/9a, Sathya Moorthy Street, Kamaraj Nagar, Choolaimedu - 600094",
      },
      {
        label: "Andhra Pradesh",
        value: "3-12, Ayyappa Nagar, Benz Circle, Vijayawada - 520007",
      },
      {
        label: "Andhra Pradesh",
        value:
          "21-3/4/3, Viman Nagar, Kakani Nagar, Visakhapatnam, Andhra Pradesh 530009",
      },
    ],
  };

  const mainLocationString = PRIMARY_LOCATIONS.slice(0, 4)
    .map((l) => l.name)
    .join(", ");

  const productName =
    service.title.replace(/\b(dealer|supplier|vendor)\b/gi, "").trim() ||
    service.title;

  const faqs = [
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

  const categoryFaqTemplates: Record<
    string,
    { question: string; answer: string }
  > = {
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

  // Structured data schemas
  const serviceSchema = generateServiceSchema({
    serviceName: service.title,
    description: service.detailedDescription,
    image: service.image,
    slug: slug,
    category: service.category,
    specifications: service.specifications,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: service.title, url: `/services/${slug}` },
  ]);

  const faqSchema = generateServiceFAQSchema(faqs);

  // Combine all schemas
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      serviceSchema,
      breadcrumbSchema,
      faqSchema,
      {
        "@type": "LocalBusiness",
        "@id": "https://invisiblegrillsandsafetynets.in#organization",
        name: "KGR Invisible Grills & Safety Nets",
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

  const BranchIcon = branches.icon;

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
      />

      <div className="min-h-screen bg-background">
        <div className="bg-muted/30 pt-4 md:py-4 md:mt-[26px]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <nav className="flex md:items-center gap-2 text-base md:text-lg text-muted-foreground overflow-x-auto">
                <Link
                  href="/"
                  className="hover:text-primary whitespace-nowrap flex-shrink-0"
                >
                  Home
                </Link>
                <span className="flex-shrink-0">/</span>
                <Link
                  href="/services"
                  className="hover:text-primary whitespace-nowrap flex-shrink-0"
                >
                  Services
                </Link>
                <span className="flex-shrink-0">/</span>
                <span className="text-foreground truncate min-w-0">
                  {service.title}
                </span>
              </nav>
            </div>
          </div>
        </div>

        <div className="container mx-auto pb-2 md:py-4">
          <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
            <div className="space-y-6 md:space-y-8">
              <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
                <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
                  {/* Hero Card - Title and Features */}
                  <ServiceHero
                    service={{ title: service.title, image: service.image }}
                    mainLocationString={mainLocationString}
                  />

                  {/* Image Gallery (client) */}
                  <ServiceImageSlider
                    images={
                      service.images && service.images.length
                        ? service.images
                        : [service.image]
                    }
                    altPrefix={service.title}
                  />

                  <div className="bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 rounded-lg shadow-lg">
                    <div className="p-4 md:p-6 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-3 shadow-lg">
                          <Zap className="h-6 w-6 text-white" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                          About This Service
                        </h2>
                      </div>
                      <p className="text-sm md:text-base text-white/90 leading-relaxed">
                        {service.detailedDescription}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 rounded-lg shadow-lg">
                      <div className="p-4 md:p-6 space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-3 shadow-lg">
                            <Shield className="h-6 w-6 text-white" />
                          </div>
                          <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                            Key Features
                          </h2>
                        </div>
                        <div className="space-y-2">
                          {service.features.map((feature, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2"
                            >
                              <CheckCircle2 className="h-4 w-4 text-white flex-shrink-0" />
                              <span className="text-sm md:text-base text-white/95">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-amber-400 via-orange-500 to-red-600 rounded-lg shadow-lg">
                      <div className="p-4 md:p-6 space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-3 shadow-lg">
                            <Star className="h-6 w-6 text-white" />
                          </div>
                          <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                            Benefits
                          </h2>
                        </div>
                        <div className="space-y-2">
                          {service.benefits.map((benefit, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2"
                            >
                              <CheckCircle2 className="h-4 w-4 text-white flex-shrink-0" />
                              <span className="text-sm md:text-base text-white/95">
                                {benefit}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-violet-400 via-purple-500 to-fuchsia-600 rounded-lg shadow-lg">
                    <div className="p-4 md:p-6 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-3 shadow-lg">
                          <Award className="h-6 w-6 text-white" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                          Technical Specifications
                        </h2>
                      </div>
                      <div className="space-y-2">
                        {service.specifications.map((spec, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center py-2 border-b border-white/20 last:border-0 text-sm md:text-base"
                          >
                            <span className="font-medium text-white">
                              {spec.label}
                            </span>
                            <span className="text-white/90">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-rose-400 via-pink-500 to-red-600 rounded-lg shadow-lg">
                    <div className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl p-4 shadow-lg">
                          <MapPin className="h-6 w-6 text-white" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                          Main Branches
                        </h2>
                      </div>
                      <div className="space-y-4">
                        {branches.details.map((detail, idx) => (
                          <div key={idx} className="space-y-1">
                            <p className="text-sm text-white/80 font-medium">
                              {detail.label}
                            </p>
                            <p className="text-sm md:text-base text-white/95">
                              {detail.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <ServiceLocationsSlider variant="stats" slug={slug} />

                  <Card>
                    <CardContent className="p-4 md:p-6 space-y-4">
                      <h2 className="text-lg md:text-xl font-bold">
                        Frequently Asked Questions
                      </h2>
                      <div className="space-y-4">
                        {faqs.map((faq, index) => (
                          <div key={index} className="space-y-2">
                            <h3 className="font-semibold text-base md:text-lg">
                              {faq.question}
                            </h3>
                            <p className="text-sm md:text-base text-muted-foreground">
                              {faq.answer}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 md:p-6 space-y-4">
                      <h2 className="text-lg md:text-xl font-bold">
                        You May Also Need
                      </h2>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {Object.entries(servicesData)
                          .filter(
                            ([id, s]) =>
                              s.category === service.category && id !== slug
                          )
                          .slice(0, 4)
                          .map(([id, relatedService]) => (
                            <Link
                              key={id}
                              href={`/services/${id}`}
                              className="flex items-center space-x-3 p-3 rounded-lg border hover:border-primary transition-colors group"
                            >
                              <div className="relative h-16 w-16 flex-shrink-0 rounded overflow-hidden">
                                <img
                                  src={relatedService.image}
                                  alt={relatedService.title}
                                  className="object-cover w-full h-full absolute inset-0"
                                  loading="lazy"
                                  decoding="async"
                                  width="160"
                                  height="160"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate group-hover:text-primary">
                                  {relatedService.title}
                                </p>
                                <p className="text-xs text-muted-foreground line-clamp-2">
                                  {relatedService.description}
                                </p>
                              </div>
                            </Link>
                          ))}
                      </div>
                      <Button variant="outline" className="w-full" asChild>
                        <Link href="/services">View All Services</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
