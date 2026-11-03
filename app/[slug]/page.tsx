import type { Metadata } from "next";
export const dynamic = 'force-static';
import OptimizedImage from "@/components/shared/OptimizedImage";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  servicesData,
  serviceSpecificLocationFAQs,
  resolveServiceSlug,
  getServiceRoute,
  getServiceUrlSlug,
  SERVICES_WITH_CUSTOM_PAGE,
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
import { INVISIBLE_GRILL_PRICE, BUSINESS_FACTS } from "@/lib/local-seo-content";
import { KeyFacts, GrillComparison } from "@/components/location/LocalSeoSections";
import { LOCATION_NAMES } from "@/constants/locations";
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
// Only the slugs below exist; anything else (including old slugs) is a 404.
export const dynamicParams = false;

export async function generateStaticParams() {
  return Object.keys(servicesData)
    .filter((id) => !SERVICES_WITH_CUSTOM_PAGE.includes(id))
    .map((id) => ({ slug: getServiceUrlSlug(id) }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const canonicalSlug = resolveServiceSlug(slug) ?? '';
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

  // "invisible grill installation" and "invisible grill for balcony installation"
  // are the non-city queries these two pages get impressions for; the city in
  // the old title also made them compete with the Bangalore page.
  const titleOverride: Record<string, string> = {
    'invisible-grills': `Invisible Grills Installation | From ₹${INVISIBLE_GRILL_PRICE.from}/sq ft | KGR`,
    'invisible-grills-balcony': 'Invisible Grill for Balcony – Installation & Price | KGR',
  };
  const title = titleOverride[canonicalSlug] ?? baseMetadata.title;
  const descriptionOverride: Record<string, string> = {
    'invisible-grills': `Invisible grill installation for balconies and windows from ₹${INVISIBLE_GRILL_PRICE.from}/sq ft. SS316 marine-grade, ${BUSINESS_FACTS.warrantyYears}-year warranty, free site visit. Call ${PRIMARY.display.trim()}.`,
    'invisible-grills-balcony': `Invisible grill for balcony installation from ₹${INVISIBLE_GRILL_PRICE.from}/sq ft: clear view, child & pet safe, ${BUSINESS_FACTS.warrantyYears}-year warranty. Free site visit. Call ${PRIMARY.display.trim()}.`,
  };
  const description = descriptionOverride[canonicalSlug] ?? baseMetadata.description;

  const etag = `W/"${canonicalSlug}-${service.title.replace(/\s+/g, "-").toLowerCase()}"`;
  const canonicalUrl = getCanonicalUrl(getServiceRoute(canonicalSlug));

  return {
    ...baseMetadata,
    title,
    description,
    openGraph: { ...baseMetadata.openGraph, title: title ?? undefined },
    twitter: { ...baseMetadata.twitter, title: title ?? undefined },
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
  const canonicalSlug = resolveServiceSlug(slug) ?? '';
  const service: ServiceData | undefined = servicesData[canonicalSlug as keyof typeof servicesData];

  if (!service) notFound();

  const productName =
    service.title.replace(/\b(dealer|supplier|vendor)\b/gi, "").trim() || service.title;

  const isClothDrying = canonicalSlug === 'cloth-drying';
  const isInvisibleGrills = service.category === "invisible-grills" && !isClothDrying;

  // Build FAQ array. The invisible-grill questions follow what people actually
  // search ("price per square foot", "are invisible grills safe", "invisible
  // grill vs pigeon net", "pros and cons") and answer with specifics.
  const loadCapacity = service.specifications.find((s) => s.label === "Load Capacity")?.value;
  const cableThickness = service.specifications.find((s) => s.label === "Cable Thickness")?.value;
  const faqs: FAQ[] = isInvisibleGrills
    ? [
        {
          question: "What is the price of invisible grills per square foot?",
          answer:
            `Invisible grills cost ₹${INVISIBLE_GRILL_PRICE.from} per square foot including installation, for both balconies and windows. The final amount depends on the cable grade (SS304 or SS316), cable thickness, spacing, floor height and total area. KGR Enterprises gives a fixed written quote after a free site inspection in Bangalore, Hyderabad, Chennai, Vijayawada and Visakhapatnam.`,
        },
        {
          question: "What are invisible grills?",
          answer:
            "Invisible grills are high-tensile stainless steel cables fixed vertically or horizontally across a balcony or window and held in aluminium tracks. They stop children and pets from falling and keep intruders out, while leaving the view, light and airflow open — from a few feet away the cables almost disappear.",
        },
        {
          question: "What material are invisible grills made of?",
          answer:
            `Our invisible grills use SS316 marine-grade stainless steel cable${cableThickness ? ` (${cableThickness} thick)` : ""} with a nylon coating, fixed in powder-coated aluminium tracks with stainless steel anchors. SS316 resists rust far better than SS304 or iron, which matters in coastal cities such as Chennai and Visakhapatnam.`,
        },
        {
          question: "Are invisible grills safe and strong?",
          answer:
            `Yes. Each cable is tensioned stainless steel${loadCapacity ? ` rated at ${loadCapacity}` : ""}, and the cable spacing is set on site — closer for homes with toddlers or small pets. Installed correctly, invisible grills prevent falls from balconies and windows and act as an anti-theft barrier.`,
        },
        {
          question: "Invisible grill vs pigeon net — which is better?",
          answer:
            "They solve different problems. Invisible grills are a structural safety barrier: they prevent falls, deter intruders and last far longer, but cost more. Pigeon nets cost less and are the better choice when birds are the only concern. Many apartments fit invisible grills for safety and add a pigeon net behind them to keep birds out completely.",
        },
        {
          question: "What are the pros and cons of invisible grills?",
          answer:
            "Pros: an open, unobstructed view; no rust and no repainting; child and pet safety; a modern look; quick installation without welding. Cons: a higher upfront cost than iron grills or nets; cables must be professionally tensioned; and with wider spacing small birds can still get through, so a pigeon net may be needed as well.",
        },
        {
          question: "Which invisible grill is best — SS316 or SS304?",
          answer:
            "SS316 marine-grade stainless steel is the best choice for balconies and anywhere exposed to rain or coastal air, because it resists corrosion far better. SS304 is a strong, lower-cost option for sheltered or indoor openings such as staircases.",
        },
        {
          question: "How long does installation take, and what is the warranty?",
          answer:
            `A typical apartment balcony is installed in ${BUSINESS_FACTS.installHours} hours with no welding. KGR Enterprises gives a ${BUSINESS_FACTS.warrantyYears}-year warranty on materials and workmanship.`,
        },
        {
          question: "How long do invisible grills last?",
          answer:
            "With marine-grade stainless steel and professional installation, invisible grills are built to last 15+ years with minimal maintenance — an occasional wipe with a damp cloth is enough.",
        },
        {
          question: "Do invisible grills keep pigeons out?",
          answer:
            "Partly. Close cable spacing discourages pigeons, but small birds can pass between cables. For complete bird protection, combine invisible grills with a pigeon net.",
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
          answer: `Installation typically takes ${BUSINESS_FACTS.installHours} hours depending on size and site conditions. Site inspection and quotation are free.`,
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
    price: isInvisibleGrills ? INVISIBLE_GRILL_PRICE : undefined,
  });

  const faqSchema = generateServiceFAQSchema(faqs);

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      ...serviceSchema['@graph'],
      faqSchema,
      {
        "@type": "LocalBusiness",
        "@id": "https://invisiblegrillsandsafetynets.in/#organization",
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
                priority
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

        <KeyFacts
          title={`${service.title} at a Glance`}
          facts={[
            ...(isInvisibleGrills
              ? [{ label: 'Price', value: `₹${INVISIBLE_GRILL_PRICE.from} per sq ft, installed` }]
              : []),
            ...service.specifications.slice(0, 3),
            { label: 'Warranty', value: `${BUSINESS_FACTS.warrantyYears} years` },
            { label: 'Installation time', value: `${BUSINESS_FACTS.installHours} hours (typical home)` },
            { label: 'Site inspection & quote', value: 'Free' },
            { label: 'Cities served', value: LOCATION_NAMES.join(', ') },
            { label: 'Call / WhatsApp', value: PRIMARY.display.trim() },
          ]}
        />

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
                    href={getServiceRoute(canonicalSlug, loc)}
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

        {isInvisibleGrills && <GrillComparison place="Bangalore, Hyderabad and Chennai" />}

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
