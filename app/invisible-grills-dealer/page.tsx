import type { Metadata } from "next";
import Link from "next/link";
import { Store, Award, TrendingUp, Users, Truck, Package, ArrowRight, Phone, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import HeroWithHeaderWrapper from "@/components/layout/HeroWithHeaderWrapper";
import ServiceImageSlider from "@/components/services/ServiceImageSlider";
import ServiceFAQ from "@/components/services/ServiceFAQ";
import RelatedServices from "@/components/services/RelatedServices";
import { PRIMARY } from "@/constants/contacts";
import { getCanonicalUrl } from "@/lib/canonical-url";
import {
  generateServiceMetadata,
  generateServiceFAQSchema,
  PRIMARY_LOCATIONS,
} from "@/lib/seo-metadata";
import { generateServiceSchema } from "@/lib/service-schema";

export async function generateMetadata(): Promise<Metadata> {
  const baseMetadata = generateServiceMetadata({
    serviceName: "Invisible Grills Dealership & Wholesale Program",
    serviceSlug: "invisible-grills-dealer",
    shortDescription: "Become an authorized invisible grills dealer with exclusive territory rights and bulk order benefits.",
    longDescription: "Partner with KGR Enterprises for authorized invisible grills dealership. Access wholesale pricing, professional training, marketing support, and bulk order benefits. Perfect for hardware stores, contractors, and distributors across South India.",
    image: "/images/invisible-grill-1.jpg",
  });

  const canonicalUrl = getCanonicalUrl("/invisible-grills-dealer");

  return {
    ...baseMetadata,
    verification: {
      google: "P8HUVCb--rZ-IF-X_ZwXQX1FOPvjQI5M0MWRtAwVMfc",
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

interface DealershipType {
  title: string;
  description: string;
  minOrder: string;
}

interface DealershipFeature {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
}

interface LocationItem {
  name: string;
  slug: string;
}

const dealerBenefits = [
  "Official authorized dealership with genuine products",
  "Bulk order discounts for contractors and builders",
  "Complete technical support and installation training",
  "Marketing materials and lead generation support",
  "Exclusive territory rights available",
  "Quick dispatch and delivery across South India",
];

const dealerFeatures: DealershipFeature[] = [
  {
    icon: Store,
    title: "Authorized Dealership",
    description: "Become an official dealer with exclusive rights in your area.",
  },
  {
    icon: Package,
    title: "Wholesale Pricing",
    description: "Competitive wholesale rates for bulk orders.",
  },
  {
    icon: Award,
    title: "Quality Assurance",
    description: "All products come with manufacturer warranty.",
  },
  {
    icon: Users,
    title: "Training & Support",
    description: "Complete installation training for your team.",
  },
  {
    icon: Truck,
    title: "Pan-India Delivery",
    description: "Quick dispatch across AP, Telangana, and neighboring states.",
  },
  {
    icon: TrendingUp,
    title: "Business Growth",
    description: "Marketing support and lead sharing in your territory.",
  },
];

const dealershipTypes: DealershipType[] = [
  {
    title: "Retail Dealer",
    description: "Perfect for hardware stores and home improvement centers.",
    minOrder: "50 running feet/month",
  },
  {
    title: "Contractor Partner",
    description: "Ideal for contractors who want direct material access.",
    minOrder: "100 running feet/month",
  },
  {
    title: "Exclusive Distributor",
    description: "Territory-exclusive distribution rights with maximum benefits.",
    minOrder: "500 running feet/month",
  },
];

const dealerLocationsList: LocationItem[] = [
  { name: "Hyderabad", slug: "hyderabad" },
  { name: "Bangalore", slug: "bangalore" },
  { name: "Chennai", slug: "chennai" },
  { name: "Vijayawada", slug: "vijayawada" },
  { name: "Visakhapatnam", slug: "visakhapatnam" },
];

const dealerFAQs = [
  {
    question: "What are the eligibility criteria to become a dealer?",
    answer:
      "We welcome hardware store owners, contractors, and distributors. A basic infrastructure and willingness to promote our products are the main requirements.",
  },
  {
    question: "What wholesale discounts are available?",
    answer:
      "Discounts vary based on order volume and tier. Retail dealers get 15-20%, contractors 20-25%, and exclusive distributors 25-35% discounts.",
  },
  {
    question: "Will I get exclusive territory rights?",
    answer:
      "Yes, exclusive distributors get exclusive territory rights. Retail and contractor partners can discuss territory arrangements during negotiation.",
  },
  {
    question: "Is training provided for installation?",
    answer:
      "Yes, we provide comprehensive training for your team on installation, safety, and customer handling at our facility or yours.",
  },
  {
    question: "What support do I get for marketing?",
    answer:
      "We provide branded materials, digital assets, lead sharing in your territory, and online visibility support.",
  },
  {
    question: "What is the minimum order requirement?",
    answer:
      "It varies by dealer type: Retail (50 running feet/month), Contractors (100 running feet/month), Distributors (500 running feet/month).",
  },
];

const dealerImages = [
  "/images/invisible-grill-1.jpg",
  "/images/invisible-grill-2.jpg",
  "/images/balcony-invisible-grill-1.jpg",
];

export default function InvisibleGrillsDealerPage() {
  // Generate structured data schemas
  const specifications = [
    { label: "Program Type", value: "Wholesale Dealership" },
    { label: "Territory", value: "Exclusive Rights Available" },
    { label: "Support", value: "Full Training & Marketing" },
    { label: "Delivery", value: "Pan-India" },
    { label: "Pricing", value: "Wholesale Rates" }
  ];

  const serviceSchema = generateServiceSchema({
    serviceName: "Invisible Grills Dealership & Wholesale",
    description: "Authorized dealer partnership program for invisible grills with exclusive territory rights, wholesale pricing, and comprehensive training.",
    image: "/images/invisible-grill-1.jpg",
    slug: "invisible-grills-dealer",
    category: "invisible-grills",
    specifications: specifications,
  });

  const faqSchema = generateServiceFAQSchema(dealerFAQs);

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      serviceSchema,
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
        areaServed: PRIMARY_LOCATIONS.map(loc => ({
          "@type": "City",
          name: loc.name
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
              <img
                src="/images/invisible-grill-1.jpg"
                alt="Invisible Grills Dealership"
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
                  { label: "Dealership & Wholesale" },
                ]}
                darkMode={true}
              />

              <div className="mx-auto max-w-4xl text-center">
                {/* Badge */}
                <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white">
                  <Store className="h-4 w-4 text-accent" /> Dealership Opportunity
                </span>

                <h1 className="mb-6 font-heading text-4xl font-bold text-white md:text-5xl">
                  Invisible Grills Dealership & Wholesale
                </h1>
                <p className="mb-8 text-lg text-white/80 md:text-xl">
                  Partner with KGR Enterprises for authorized dealership. Access wholesale pricing, training, and exclusive territory rights.
                </p>
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Button size="lg" className="cta-gradient text-white" asChild>
                    <Link href="/contact" className="flex items-center gap-2">
                      Apply for Dealership <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 bg-white/10 text-white hover:bg-white/20"
                  asChild
                >
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
        <ServiceImageSlider images={dealerImages} altPrefix="Dealership" />

        {/* Benefits Section */}
        <section className="section-bg-2 relative py-16 md:py-20">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white">
                  Dealer Benefits
                </span>
                <h2 className="mb-6 font-heading text-3xl font-bold text-white md:text-4xl">
                  Why Partner With KGR Enterprises?
                </h2>
                <p className="mb-8 text-lg text-white/80">
                  Join our growing network of successful dealers across South India.
                </p>
                <ul className="space-y-4">
                  {dealerBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-white/90">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {dealerFeatures.slice(0, 4).map((feature, index) => (
                  <div
                    key={index}
                    className="rounded-xl bg-gradient-to-br from-[hsl(222,47%,11%)] via-[hsl(217,33%,17%)] to-[hsl(215,25%,22%)] p-6 border border-white/10"
                  >
                    <feature.icon className="mb-4 h-8 w-8 text-accent" />
                    <h3 className="mb-2 font-heading text-lg font-semibold text-white">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-white/70">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Dealership Types Section */}
        <section className="section-bg-3 relative py-16 md:py-20">
          <div className="container">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                Partnership Options
              </span>
              <h2 className="mb-4 font-heading text-3xl font-bold text-foreground md:text-4xl">
                Choose Your Partnership Level
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {dealershipTypes.map((type, index) => (
                <div
                  key={index}
                  className="rounded-2xl bg-gradient-to-br from-[hsl(222,47%,11%)] via-[hsl(217,33%,17%)] to-[hsl(215,25%,22%)] p-6 border border-white/10"
                >
                  <h3 className="mb-3 font-heading text-xl font-semibold text-white">
                    {type.title}
                  </h3>
                  <p className="mb-4 text-white/70">{type.description}</p>
                  <div className="rounded-lg bg-white/5 px-4 py-2">
                    <span className="text-sm text-white/60">Min. Order: </span>
                    <span className="text-sm font-medium text-accent">{type.minOrder}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dealer Network by Location */}
        <section className="section-bg-4 relative py-16 md:py-20">
          <div className="container">
            <h2 className="mb-8 text-center font-heading text-3xl font-bold text-white">
              Dealer Network by Location
            </h2>
            <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-4">
              {dealerLocationsList.map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/services/invisible-grills/${loc.slug}`}
                  className="flex items-center justify-between rounded-xl bg-gradient-to-br from-[hsl(222,47%,11%)] via-[hsl(217,33%,17%)] to-[hsl(215,25%,22%)] p-4 transition-all hover:shadow-lg hover:-translate-y-1 border border-white/10"
                >
                  <span className="font-medium text-white">{loc.name}</span>
                  <ArrowRight className="h-4 w-4 text-accent" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <ServiceFAQ faqs={dealerFAQs} />

        {/* Related Services Section */}
        <section className="section-bg-5 relative py-16 md:py-24">
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="container relative z-10">
            <h2 className="mb-12 text-center font-heading text-3xl font-bold text-foreground md:text-4xl">
              Related Products & Services
            </h2>
            <RelatedServices currentService="invisible-grills-dealer" />
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-bg-6 relative py-16 md:py-20">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 font-heading text-3xl font-bold text-white md:text-4xl">
                Ready to Become a Dealer?
              </h2>
              <p className="mb-8 text-lg text-white/80">
                Contact us today to discuss dealership opportunities.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" className="cta-gradient text-white" asChild>
                  <Link href="/contact" className="flex items-center gap-2">
                    Apply Now <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 bg-white/10 text-white hover:bg-white/20"
                  asChild
                >
                  <a href={`tel:${PRIMARY.phone}`} className="flex items-center gap-2">
                    <Phone className="h-5 w-5" /> Call Now
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
