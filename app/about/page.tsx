import type { Metadata } from "next";
import OptimizedImage from "@/components/shared/OptimizedImage";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import HeroWithHeaderWrapper from "@/components/layout/HeroWithHeaderWrapper";
import AboutSection from "@/components/about/AboutSection";
import TestimonialsSection from "@/components/testimonials/TestimonialsSection";
import { Card, CardContent } from "@/components/ui/card";
import { PRIMARY } from "@/constants/contacts";
import { BUSINESS_FACTS, AGGREGATE_RATING } from "@/constants/business";

export const metadata: Metadata = {
  title: `About KGR Enterprises – Invisible Grills Experts Since ${BUSINESS_FACTS.foundedYear}`,
  description: `KGR Enterprises has installed invisible grills and safety nets since ${BUSINESS_FACTS.foundedYear}: ${BUSINESS_FACTS.installations} installations across Bangalore, Hyderabad, Chennai and Andhra Pradesh.`,
  alternates: {
    canonical: 'https://invisiblegrillsandsafetynets.in/about/',
  },
  keywords: [
    // Brand & Company Identity
    "KGR Enterprises",
    `safety experts since ${BUSINESS_FACTS.foundedYear}`,
    "15 years experience",
    "family-owned business",
    // Company Credibility & Trust
    "certified installation team",
    `${BUSINESS_FACTS.installations} installations`,
    "industry leaders",
    "trusted safety provider",
    "best in class service",
    "professional expertise",
    // Founder & Team Keywords
    "experienced installers",
    "skilled technicians",
    "expert team",
    "certified professionals",
    "trained staff",
    // Company Values & Approach
    "quality-first approach",
    "customer satisfaction",
    "attention to detail",
    "dedication to excellence",
    "commitment to safety",
    // Service Commitment Keywords
    "installation expertise",
    "post-installation support",
    "warranty coverage",
    "maintenance support",
    "customer care focus",
    // Industry Keywords
    "safety solutions pioneer",
    "market leaders",
    "innovation in safety",
    // Location Heritage
    "South India's trusted provider",
    "regional safety experts",
    "community trusted brand",
    // Long-tail About Keywords
    "why choose KGR Enterprises",
    "our safety commitment",
    "company experience highlights",
    "customer testimonials",
    "success stories",
    "reliable safety partner",
  ],
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-video-preview': -1,
    'max-snippet': -1,
  },
  openGraph: {
    title: "About KGR Enterprises - Invisible Grills & Safety Nets Experts",
    description: `Trusted safety solutions provider since ${BUSINESS_FACTS.foundedYear} with ${BUSINESS_FACTS.installations} installations`,
    url: "https://invisiblegrillsandsafetynets.in/about",
    images: [
      {
        url: "/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "About KGR Enterprises"
      }
    ]
  }
};

export default function AboutPage() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    // Same entity as the site-wide Organization in app/layout.tsx
    '@id': 'https://invisiblegrillsandsafetynets.in/#organization',
    'name': 'KGR Enterprises',
    'alternateName': 'KGR Invisible Grills & Safety Nets',
    'url': 'https://invisiblegrillsandsafetynets.in',
    'logo': 'https://invisiblegrillsandsafetynets.in/logo.png',
    'description': `Professional installation services for invisible grills, safety nets, bird protection solutions, and sports nets across South India. In business since ${BUSINESS_FACTS.foundedYear} with ${BUSINESS_FACTS.installations} installations.`,
    'foundingDate': String(BUSINESS_FACTS.foundedYear),
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '15-21-150/17, JK Heights, Balaji Nagar, Kukatpally',
      'addressLocality': 'Hyderabad',
      'addressRegion': 'Telangana',
      'postalCode': '500072',
      'addressCountry': 'IN'
    },
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': PRIMARY.phone,
      'contactType': 'Customer Support'
    },
    'aggregateRating': AGGREGATE_RATING
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <HeroWithHeaderWrapper>
        {/* Full-bleed background hero for About page (using next/image for optimization) */}
        <section className="relative overflow-hidden" style={{ borderRadius: '1rem' }}>
          <OptimizedImage
            src="/images/hero-image.jpg" 
            alt="About KGR Enterprises" 
            className="object-cover w-full h-full absolute inset-0"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative container mx-auto px-4 py-20 md:py-28 lg:py-36 text-center">
            <div className="max-w-3xl mx-auto">
              <Breadcrumbs
                items={[
                  { label: "About" },
                ]}
                darkMode={true}
              />
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-white">
                About{" "}
                <span className="text-gradient-on-dark">KGR Enterprises</span>
              </h1>
              <p className="text-xl text-white/90">
                Your Trusted Partner in Safety Solutions Since {BUSINESS_FACTS.foundedYear}
              </p>
            </div>
          </div>
        </section>
      </HeroWithHeaderWrapper>

      <AboutSection />

      <div className="container mx-auto px-4 mt-6">
        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
          <Card>
            <CardContent className="p-4 md:p-6 space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-card-foreground">Our Story</h2>
              <p className="text-card-foreground/80">
                Founded in {BUSINESS_FACTS.foundedYear}, KGR Enterprises has grown from a small local
                business to become one of South India&apos;s most trusted safety
                solutions providers. With over 15 years of experience, we have
                successfully completed {BUSINESS_FACTS.installations} installations across Hyderabad,
                Bangalore, Chennai, and Andhra Pradesh.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 md:p-6 space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-card-foreground">Our Mission</h2>
              <p className="text-card-foreground/80">
                To provide world-class safety solutions that protect families
                and properties while maintaining aesthetic appeal. We believe
                safety should never compromise on style.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <TestimonialsSection />
    </>
  );
}
