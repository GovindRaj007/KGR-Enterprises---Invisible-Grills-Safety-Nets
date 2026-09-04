import type { Metadata } from "next";
export const dynamic = 'force-static';
import OptimizedImage from "@/components/shared/OptimizedImage";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  servicesData,
  serviceSpecificLocationFAQs,
  resolveServiceSlug,
} from "@/data/servicesData";
import { validLocations, locationData, PRIMARY_LOCATION } from "@/constants/locations";
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
  heroDescription?: string;
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
  const canonicalSlug = resolveServiceSlug(slug);
  const service = servicesData[canonicalSlug as keyof typeof servicesData];

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
    serviceSlug: canonicalSlug,
    shortDescription: service.description,
    longDescription: service.detailedDescription,
    image: service.image,
  });

  const etag = `W/"${canonicalSlug}-${service.title.replace(/\s+/g, "-").toLowerCase()}"`;
  const canonicalUrl = getCanonicalUrl(`/services/${canonicalSlug}`);

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
  const canonicalSlug = resolveServiceSlug(slug);
  const service: ServiceData | undefined = servicesData[canonicalSlug as keyof typeof servicesData];

  if (!service) notFound();

  const productName =
    service.title.replace(/\b(dealer|supplier|vendor)\b/gi, "").trim() || service.title;

  const isClothDrying = canonicalSlug === 'cloth-drying';
  const isInvisibleGrills = service.category === "invisible-grills" && !isClothDrying;

  // Build FAQ array
  const faqs: FAQ[] = isInvisibleGrills
    ? [
        {
          question: "What are Invisible Grills?",
          answer:
            "Invisible grills are stainless steel cable systems installed on balconies and windows to provide strong protection without blocking your view. Our installation teams fit transparent grill systems precisely for homes and apartments.",
        },
        {
          question: "Are Invisible Grills Safe?",
          answer:
            "Yes — our premium invisible grills are designed for child safety, pet safety, and anti-theft protection while maintaining airflow and unobstructed views.",
        },
        {
          question: "How Strong are Invisible Grills?",
          answer:
            "Our SS316 and SS304 invisible grills use high-tensile cables that can resist impact, prevent theft, and support everyday household safety requirements.",
        },
        {
          question: "How Long do Invisible Grills Last?",
          answer:
            "With marine-grade stainless steel and professional installation, our invisible grills are built to last 15+ years with minimal maintenance.",
        },
        {
          question: "Do Invisible Grills Prevent Theft?",
          answer:
            "Yes — the strong stainless steel cable structure acts as a secure barrier for balconies and windows, making unauthorized access much harder.",
        },
        {
          question: "Can Invisible Grills Stop Children from Falling?",
          answer:
            "Absolutely — our balcony and window grills are installed to prevent accidental falls and ensure child safety in apartments and homes.",
        },
        {
          question: "Are Invisible Grills Good for Pets?",
          answer:
            "Yes — our pet-safe invisible grills keep cats and dogs safe on balconies and windows while allowing fresh air and daylight.",
        },
        {
          question: "Do Invisible Grills Prevent Pigeons?",
          answer:
            "Properly installed invisible grills work with pigeon nets to prevent birds from nesting and keep your balcony clean.",
        },
        {
          question: "How are Invisible Grills Installed?",
          answer:
            "We perform a free site survey, measure the opening, and install the grill system using corrosion-resistant anchors and stainless steel cables for a seamless finish.",
        },
        {
          question: "Which Invisible Grill is Best?",
          answer:
            "Our SS316 invisible grills are the top choice for coastal climate durability and premium performance, while SS304 is a strong, cost-effective option for interior applications.",
        },
      ]
    : [
        {
          question: `What is the cost of ${productName}?`,
          answer: `Costs vary by area, size and specifications. Contact ${PRIMARY.display} for a free quote and site inspection.`,
        },
        {
          question: `Do you provide ${productName} in Bangalore, Hyderabad and Chennai?`,
          answer: `Yes — we provide ${productName} across Bangalore, Hyderabad, Chennai, Vijayawada and Visakhapatnam.`,
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
      question: `Will pigeon nets or spikes harm birds?`,
      answer: `No — our pigeon net solutions are humane and designed to prevent nesting without causing harm to birds. We prioritize humane, long-lasting control.`,
    },
    sports: {
      question: `Are sports nets suitable for both indoor and outdoor use?`,
      answer: `Yes — our sports nets are built for both indoor and outdoor environments with materials rated for weather exposure and heavy use.`,
    },
  };

  // For cloth-drying keep using the original safety-nets template (preserve page-specific content)
  const categoryKeyForTemplate = isClothDrying ? 'safety-nets' : service.category;
  const categoryTemplate = categoryFaqTemplates[categoryKeyForTemplate];
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
    const serviceFAQs = serviceSpecificLocationFAQs[canonicalSlug];
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
    slug: canonicalSlug,
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
          streetAddress: PRIMARY_LOCATION.streetAddress,
          addressLocality: PRIMARY_LOCATION.name,
          addressRegion: PRIMARY_LOCATION.state,
          postalCode: PRIMARY_LOCATION.postalCode,
          addressCountry: "IN",
        },
        areaServed: validLocations.map((slug) => ({
          "@type": "City",
          name: locationData[slug].name,
        })),
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
              <OptimizedImage
                src={service.image} 
                alt={`${service.title} installation by KGR Enterprises for homes, balconies and commercial properties`}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[hsl(222,47%,8%,0.95)] via-[hsl(222,47%,10%,0.88)] to-[hsl(222,47%,10%,0.75)]" />
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
                  {isClothDrying ? <Ruler className="h-4 w-4 text-accent" /> : service.category === 'invisible-grills' && <Fence className="h-4 w-4 text-accent" />}
                  {service.category === 'safety-nets' && <Shield className="h-4 w-4 text-accent" />}
                  {service.category === 'bird-protection' && <Wind className="h-4 w-4 text-accent" />}
                  {service.category === 'sports' && <Sparkles className="h-4 w-4 text-accent" />}
                  {!['invisible-grills', 'safety-nets', 'bird-protection', 'sports'].includes(service.category) && !isClothDrying && <Ruler className="h-4 w-4 text-accent" />}
                  {isClothDrying ? 'Cloth Hangers' : service.title.includes('Specialist') ? service.category : `${service.title} Specialist`}
                </span>
                
                <h1 className="mb-6 font-heading text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                  {service.title}
                </h1>
                <p className="mb-8 text-lg text-white/80 md:text-xl">
                  {service.heroDescription || service.description}
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

        {isInvisibleGrills && (
          <section className="section-bg-5 relative py-16 md:py-24">
            <div className="absolute inset-0 grid-pattern opacity-20" />
            <div className="container relative z-10">
              <div className="mb-8 text-center">
                <p className="text-sm uppercase tracking-[0.3em] text-accent">Invisible Grill Installation</p>
                <h2 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
                  Invisible Grill Services for Balcony, Window & Apartment Safety
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-base text-foreground/80">
                  Our invisible grills near me service covers installation of transparent balcony grills, window invisible grills, and premium SS316 invisible grill systems. We design each solution to keep children safe, support pets, and preserve open views.
                </p>
              </div>

              <div className="mb-8 flex flex-wrap justify-center gap-3">
                {[
                  { label: 'Invisible Grill Installation', href: '#installation' },
                  { label: 'Invisible Grill Benefits', href: '#benefits' },
                  { label: 'Invisible Grill FAQ', href: '#faq' },
                  { label: `${service.title} Gallery`, href: '#gallery' },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:border-accent hover:text-accent"
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              <div id="installation" className="grid gap-8 lg:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-2xl font-semibold text-foreground">
                    Professional <span className="text-accent">Invisible Grill Fitting</span>
                  </h3>
                  <p className="text-foreground/80">
                    We install invisible grills with precision and care. Whether you need an invisible balcony grill, invisible window grill, or transparent grill system, our team handles on-site measurement, corrosion-resistant mounting, and a clean finish.
                  </p>
                </div>
                <div>
                  <h3 className="mb-4 text-2xl font-semibold text-foreground">
                    <span className="text-accent">Premium</span> Materials & Warranty
                  </h3>
                  <p className="text-foreground/80">
                    Choose between SS316 invisible grill or SS304 invisible grill options. Both offer premium invisible grill performance, but SS316 is ideal for coastal climates and long-term durability.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        <section id="gallery" className="relative bg-white py-12 md:py-16">
          <div className="container relative z-10">
            <h2 className="mb-6 text-center font-heading text-xl font-bold text-gray-900 md:text-2xl">
              <span className="block text-md font-medium text-gray-600 md:text-base">{service.title}</span>
              <span className="inline-block mt-2 rounded-md px-4 py-1.5 text-2xl font-extrabold tracking-tight text-[#FF6B42] md:text-3xl" style={{background: 'linear-gradient(90deg, rgba(255,107,66,0.08), rgba(255,107,66,0.02))'}}>
                Gallery
              </span>
            </h2>
            
              <ServiceImageSlider
                images={
                  service.images && service.images.length
                    ? service.images
                    : [service.image]
                }
                altPrefix={`${service.title}`}
              />
        
          </div>
        </section>

        {/* Features Section */}
        <section className="section-bg-1 relative py-16 md:py-24">
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="container relative z-10">
            <h2 className="mb-12 text-center font-heading text-3xl font-bold text-foreground md:text-4xl">
              Why Choose <span className="text-accent">{service.title}</span>?
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
              <div id="benefits">
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
                <div id="technical-specifications" className="rounded-2xl bg-gradient-to-br from-[hsl(222,47%,11%)] via-[hsl(217,33%,17%)] to-[hsl(215,25%,22%)] p-8 border border-white/10">
                  <h3 className="mb-6 font-heading text-xl font-semibold text-white">Technical Specifications</h3>
                  <dl className="space-y-4">
                    {service.specifications.map((spec, index) => (
                      <div key={index} className="flex flex-col gap-2 border-b border-white/10 pb-3 md:flex-row md:items-start md:justify-between md:gap-6 md:pb-2">
                        <dt className="text-sm text-white/60 md:text-base md:min-w-[140px] md:flex-shrink-0">{spec.label}</dt>
                        <dd className="text-sm font-medium text-white md:text-base md:text-right md:leading-relaxed">{spec.value}</dd>
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
                    href={`/services/${canonicalSlug}/${loc}`}
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
        <div id="faq">
          <ServiceFAQ faqs={faqs} />
        </div>

        {/* CTA Section */}
        <ServiceCTA />

        {/* Related Services - Dark Background */}
        <section className="section-bg-5 relative pb-16 md:pb-24">
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="container relative z-10">
            <h2 className="mb-12 text-center font-heading text-3xl font-bold text-foreground md:text-4xl">
              You May Also Need
            </h2>
            <RelatedServices currentService={canonicalSlug} />
          </div>
        </section>
      </div>
    </>
  );
}
