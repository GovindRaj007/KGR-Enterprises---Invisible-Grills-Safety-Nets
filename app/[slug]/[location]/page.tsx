import { Metadata } from 'next';
import OptimizedImage from '@/components/shared/OptimizedImage';
import { notFound } from 'next/navigation';
import Link from 'next/link';

import { servicesData, resolveServiceSlug, getServiceRoute, getServiceUrlSlug, serviceSpecificLocationFAQs } from '@/data/servicesData';
import { getCanonicalUrl } from '@/lib/canonical-url';
import { PRIMARY } from '@/constants/contacts';
import { generateBreadcrumbSchema, clampSnippet, withBrand, LOCATION_PROFILES } from '@/lib/seo-metadata';
import { Phone, ArrowRight, MapPin, Star, Building, CheckCircle2, IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import HeroWithHeaderWrapper from '@/components/layout/HeroWithHeaderWrapper';

import { locationData, validLocations } from '@/constants/locations';
import { getServiceAreas, hasAreaPages, slugifyArea } from '@/constants/service-areas';
import { RelatedServicesClient } from '@/components/services/ServiceDetailSectionsClient';
import {
  INVISIBLE_GRILL_PRICE,
  BUSINESS_FACTS,
  buildLocalFaqs,
  fitTitle,
  isInvisibleGrillService,
} from '@/lib/local-seo-content';
import {
  GrillPriceAndSpecs,
  GrillComparison,
  InstallProcess,
  NearMeAreas,
  LocalFAQ,
  faqPageSchema,
} from '@/components/location/LocalSeoSections';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; location: string }>
}): Promise<Metadata> {
  const { slug, location } = await params;
  const canonicalSlug = resolveServiceSlug(slug) ?? '';
  const service = servicesData[canonicalSlug];
  const normalizedLocation = location.toLowerCase() as keyof typeof locationData;

  if (!service || !validLocations.includes(normalizedLocation)) {
    return {};
  }

  const locationInfo = locationData[normalizedLocation];
  const locationFormatted = locationInfo.name;
  const isGrill = isInvisibleGrillService(service);
  const cityAreas = getServiceAreas(normalizedLocation).map(a => a.name);
  const lower = service.title.toLowerCase();

  // Exact-match local intent first ("invisible grills in bangalore"), then the
  // "near me", price and neighbourhood variants people actually type.
  const locationKeywords = [
    `${lower} in ${locationFormatted}`,
    `${lower} ${locationFormatted}`,
    `${lower} near me`,
    `${lower} near me in ${locationFormatted}`,
    `${lower} price in ${locationFormatted}`,
    `${lower} cost in ${locationFormatted}`,
    `best ${lower} in ${locationFormatted}`,
    `${lower} installation in ${locationFormatted}`,
    ...(isGrill ? [`SS316 invisible grills ${locationFormatted}`, `balcony invisible grills ${locationFormatted}`] : []),
    ...cityAreas.slice(0, 12).map(area => `${lower} in ${area}`),
  ];

  const { from } = INVISIBLE_GRILL_PRICE;
  // The main invisible-grills city page carries the price in the title, as the
  // top-ranking local competitors do; it lifts click-through on "cost" intent.
  const title = canonicalSlug === 'invisible-grills'
    ? fitTitle([
        `Invisible Grills in ${locationFormatted} | From ₹${from}/sq ft | KGR`,
        `Invisible Grills in ${locationFormatted} | From ₹${from}/sq ft`,
        withBrand(`Invisible Grills in ${locationFormatted}`),
      ])
    : withBrand(`${service.title} in ${locationFormatted}`);

  const description = isGrill
    ? clampSnippet(
        `${service.title} in ${locationFormatted} from ₹${from}/sq ft — SS316, child & pet safe, 15-yr warranty. Free site visit near you: ${locationInfo.primaryAreas.slice(0, 2).join(', ')} & more.`
      )
    : clampSnippet(
        `${service.title} in ${locationFormatted} near you. Free site visit and 15-year warranty. Serving ${locationInfo.primaryAreas.join(', ')} and nearby.`
      );
  // Open Graph has more room than a SERP snippet, so it keeps the area list.
  const socialDescription = clampSnippet(
    `Professional ${lower} in ${locationFormatted}. Serving ${cityAreas.join(', ')}.`,
    280
  );

  return {
    title,
    description,
    keywords: locationKeywords.join(', '),
    alternates: {
      canonical: getCanonicalUrl(getServiceRoute(canonicalSlug, normalizedLocation)),
    },
    openGraph: {
      title,
      description: socialDescription,
      url: getCanonicalUrl(getServiceRoute(canonicalSlug, normalizedLocation)),
      siteName: 'KGR Invisible Grills & Safety Nets',
      images: [
        {
          url: service.image,
          width: 1200,
          height: 630,
          alt: `${service.title} in ${locationFormatted} - KGR Enterprises`,
        },
      ],
      type: 'article',
      locale: 'en-IN',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: socialDescription,
      site: '@Kgr_Grills_Nets',
      creator: '@Kgr_Grills_Nets',
      images: [service.image],
    },
    verification: {
      google: 'P8HUVCb--rZ-IF-X_ZwXQX1FOPvjQI5M0MWRtAwVMfc',
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  };
}

export const dynamicParams = false;

export function generateStaticParams(): { slug: string; location: string }[] {
  return Object.keys(servicesData).flatMap(id =>
    validLocations.map(location => ({
      slug: getServiceUrlSlug(id),
      location: location.toLowerCase()
    }))
  )
}

type Props = {
  params: Promise<{
    slug: string
    location: string
  }>
}

export default async function ServiceLocationPage({ params }: Props) {
  const { slug, location } = await params;
  const canonicalSlug = resolveServiceSlug(slug) ?? '';
  const service = servicesData[canonicalSlug];
  const normalizedLocation = location.toLowerCase() as keyof typeof locationData;

  if (!service || !validLocations.includes(normalizedLocation)) {
    notFound();
  }

  const locationInfo = locationData[normalizedLocation as keyof typeof locationData];
  const locationFormatted = locationInfo.name;
  const isGrill = isInvisibleGrillService(service);
  const lower = service.title.toLowerCase();
  const { from } = INVISIBLE_GRILL_PRICE;

  // City-specific material: climate, the problems local properties actually
  // have, and what we do about them. Falls back to the primary city's profile.
  const cityProfile =
    LOCATION_PROFILES[locationFormatted as keyof typeof LOCATION_PROFILES] ??
    LOCATION_PROFILES.Bangalore;
  const categoryHighlight =
    cityProfile.serviceHighlights[
      service.category as keyof typeof cityProfile.serviceHighlights
    ] ?? cityProfile.specialFeature;

  // Neighbourhoods: linked to their own page where the service has area pages.
  const cityAreas = getServiceAreas(normalizedLocation);
  const withAreaPages = hasAreaPages(canonicalSlug);
  const areaLinks = cityAreas.map(area => ({
    name: area.name,
    href: withAreaPages ? getServiceRoute(canonicalSlug, normalizedLocation, slugifyArea(area.name)) : undefined,
  }));
  const otherCities = validLocations
    .filter(loc => loc !== normalizedLocation)
    .map(loc => ({ name: locationData[loc].name, href: getServiceRoute(canonicalSlug, loc) }));

  const faqs = [
    ...buildLocalFaqs({
      service,
      place: locationFormatted,
      city: locationFormatted,
      citySlug: normalizedLocation,
      areasSample: cityAreas.map(a => a.name),
    }),
    ...(isGrill ? [] : serviceSpecificLocationFAQs[canonicalSlug]?.[normalizedLocation] ?? []),
  ];

  const pagePath = getServiceRoute(canonicalSlug, normalizedLocation);

  // Generate breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services/' },
    { name: service.title, url: getServiceRoute(canonicalSlug) },
    { name: `${service.title} in ${locationFormatted}`, url: pagePath }
  ], pagePath);

  const baseUrl = 'https://invisiblegrillsandsafetynets.in';
  const pageUrl = `${baseUrl}${pagePath}`;
  const currentDate = new Date().toISOString();
  const oneYearFromNow = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString();

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Service", "HomeAndConstructionBusiness"],
        "@id": `${pageUrl}#service`,
        "name": `${service.title} in ${locationFormatted}`,
        "description": service.description,
        "image": {
          "@type": "ImageObject",
          "url": `${baseUrl}${service.image}`,
          "width": 1200,
          "height": 675
        },
        "telephone": PRIMARY.phone,
        "priceRange": isGrill ? `₹${INVISIBLE_GRILL_PRICE.from}–₹${INVISIBLE_GRILL_PRICE.to} per sq ft` : "₹₹",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": locationInfo.streetAddress,
          "addressLocality": locationFormatted,
          "addressRegion": locationInfo.state,
          "postalCode": locationInfo.postalCode,
          "addressCountry": "IN"
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": pageUrl
        },
        "serviceType": ["Installation Service", "Home Safety", service.title],
        "category": "Home Safety & Security Equipment",
        "areaServed": {
          "@type": "City",
          "name": locationFormatted,
          "containsPlace": cityAreas.map(area => ({
            "@type": "Place",
            "name": area.name
          }))
        },
        "provider": {
          "@type": "LocalBusiness",
          "@id": "https://invisiblegrillsandsafetynets.in#organization",
          "name": "KGR Enterprises",
          "telephone": PRIMARY.phone,
          "image": {
            "@type": "ImageObject",
            "url": `${baseUrl}${service.image}`,
            "width": 1200,
            "height": 675
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": locationInfo.streetAddress,
            "addressLocality": locationFormatted,
            "addressRegion": locationInfo.state,
            "postalCode": locationInfo.postalCode,
            "addressCountry": "IN",
          },
          "priceRange": "₹₹",
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": locationInfo.latitude,
            "longitude": locationInfo.longitude
          },
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "09:00",
            "closes": "19:00"
          }
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": `${service.title} Services in ${locationFormatted}`,
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Free Site Inspection",
                "description": `Professional ${lower} consultation in ${locationFormatted}`
              },
              "areaServed": locationFormatted,
              "priceSpecification": {
                "@type": "PriceSpecification",
                "price": "0",
                "priceCurrency": "INR",
                "description": "Free site inspection and consultation",
                "validFrom": currentDate,
                "validThrough": oneYearFromNow
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": `Standard ${service.title} Installation`,
                "description": `Professional installation with quality materials and 15-year warranty`
              },
              "areaServed": locationFormatted,
              "priceSpecification": {
                "@type": "UnitPriceSpecification",
                "price": String(INVISIBLE_GRILL_PRICE.from),
                "priceCurrency": "INR",
                "unitText": "per square foot",
                "validFrom": currentDate,
                "validThrough": oneYearFromNow
              },
              "warranty": {
                "@type": "WarrantyPromise",
                "durationOfWarranty": "P15Y",
                "warrantyScope": "Labor and Materials"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": `Premium ${service.title} Installation`,
                "description": `Premium grade materials with extended warranty and priority support`
              },
              "areaServed": locationFormatted,
              "priceSpecification": {
                "@type": "UnitPriceSpecification",
                "price": String(INVISIBLE_GRILL_PRICE.to),
                "priceCurrency": "INR",
                "unitText": "per square foot",
                "validFrom": currentDate,
                "validThrough": oneYearFromNow
              },
              "warranty": {
                "@type": "WarrantyPromise",
                "durationOfWarranty": "P20Y",
                "warrantyScope": "Labor and Materials"
              }
            }
          ]
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "1126",
          "bestRating": "5",
          "worstRating": "1"
        },
      },
      faqPageSchema(faqs, pageUrl),
      breadcrumbSchema
    ]
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
                alt={`${service.title} installed on an apartment balcony in ${locationFormatted}`}
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
                  { label: service.title, href: getServiceRoute(canonicalSlug) },
                  { label: locationFormatted },
                ]}
                darkMode={true}
              />

              <div className="mx-auto max-w-4xl">
                {/* Location Indicator */}
                <div className="mb-4 flex items-center gap-2 text-white/80">
                  <MapPin className="h-5 w-5" />
                  <span>Serving all areas of {locationFormatted}, {locationInfo.state}</span>
                </div>

                <h1 className="mb-6 font-heading text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                  {service.title} in {locationFormatted}
                </h1>
                <p className="mb-8 text-lg text-white/80 md:text-xl">
                  {isGrill
                    ? `Looking for invisible grills in ${locationFormatted}? KGR Enterprises installs SS316 marine-grade invisible grills for balconies, windows and high-rise apartments across ${locationFormatted} — from ₹${from}/sq ft with a free site inspection.`
                    : `Looking for ${lower} in ${locationFormatted}? ${service.heroDescription ?? service.description}`}
                </p>

                {/* CTAs */}
                <div className="flex flex-col gap-4 sm:flex-row mb-8">
                  <Button size="lg" className="cta-gradient" asChild>
                    <Link href="/contact" className="flex items-center gap-2">
                      Get Free Site Inspection <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20" asChild>
                    <a href={`tel:${PRIMARY.phone}`} className="flex items-center gap-2">
                      <Phone className="h-5 w-5" /> Call Now
                    </a>
                  </Button>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap gap-4">
                  {isGrill && (
                    <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white">
                      <IndianRupee className="h-4 w-4 text-accent" />
                      From ₹{from}/sq ft, installation included
                    </div>
                  )}
                  <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    {BUSINESS_FACTS.rating} Rating in {locationFormatted}
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white">
                    <Building className="h-4 w-4" />
                    {BUSINESS_FACTS.installations} Installations
                  </div>
                </div>
              </div>
            </div>
          </section>
        </HeroWithHeaderWrapper>

        {/* Why Choose Us Section */}
        <section className="section-bg-1 relative py-16 md:py-24">
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="container relative z-10">
            <div className="grid gap-12 md:grid-cols-2">
              <div>
                <h2 className="mb-6 font-heading text-3xl font-bold text-foreground md:text-4xl">
                  Trusted {service.title} Experts Across {locationFormatted}
                </h2>
                <p className="mb-4 text-foreground/90">
                  KGR Enterprises is a leading provider of {lower} in {locationFormatted}, with{' '}
                  {BUSINESS_FACTS.experienceYears} years of experience and {BUSINESS_FACTS.installations}{' '}
                  homes protected. {locationFormatted} has {cityProfile.climate}, and local properties deal
                  with {cityProfile.concern.slice(0, 3).join(', ')}. We specify our {lower} for those
                  conditions rather than fitting a generic product: {cityProfile.benefit.slice(0, 2).join(' and ')}.
                </p>
                <p className="mb-8 text-foreground/90">
                  {categoryHighlight}. {cityProfile.expertise}, covering{' '}
                  {locationInfo.primaryAreas.join(', ')} and every other neighbourhood of{' '}
                  {locationFormatted} — so whenever you search for {lower} near me in{' '}
                  {locationFormatted}, a local team is close by.
                </p>
                <ul className="space-y-3">
                  {service.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Local office and quick facts (NAP) */}
              <div className="rounded-2xl bg-gradient-to-br from-[hsl(222,47%,11%)] via-[hsl(217,33%,17%)] to-[hsl(215,25%,22%)] p-8 shadow-lg border border-white/10">
                <h3 className="mb-6 font-heading text-xl font-semibold text-white">
                  Why Choose KGR in {locationFormatted}
                </h3>
                <ul className="space-y-3 text-white/85">
                  {[
                    'Free site inspection and written quote',
                    `Up to ${BUSINESS_FACTS.warrantyYears}-year warranty`,
                    `Most installations done in ${BUSINESS_FACTS.installHours} hours`,
                    'Certified, in-house installation team',
                    ...(isGrill ? ['SS316 marine-grade stainless steel cable'] : ['UV-stabilised, weather-proof materials']),
                    'No hidden charges',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 border-t border-white/10 pt-4 text-sm text-white/70">
                  <p className="font-semibold text-white">KGR Enterprises — {locationFormatted}</p>
                  <address className="not-italic">
                    {locationInfo.streetAddress}, {locationInfo.state} {locationInfo.postalCode}
                  </address>
                  <a href={`tel:${PRIMARY.phone}`} className="mt-1 inline-block text-accent">
                    {PRIMARY.display.trim()}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {isGrill && (
          <>
            <GrillPriceAndSpecs
              place={locationFormatted}
              citySlug={normalizedLocation}
              specifications={service.specifications}
            />
            <GrillComparison place={locationFormatted} />
          </>
        )}

        {/* City-specific specification notes */}
        <section className="section-bg-4 relative py-12 md:py-16">
          <div className="container relative z-10">
            <h2 className="mb-4 font-heading text-2xl font-bold text-foreground md:text-3xl">
              How we specify {lower} for {locationFormatted}
            </h2>
            <p className="mb-8 max-w-3xl text-foreground/90">
              {cityProfile.specialFeature}. Every installation in {locationFormatted} is
              measured on site before we quote, so the specification matches the building
              rather than a catalogue default.
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-3 font-heading text-lg font-semibold text-foreground">
                  Local conditions we account for
                </h3>
                <ul className="space-y-2">
                  {cityProfile.concern.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                      <span className="text-foreground/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-3 font-heading text-lg font-semibold text-foreground">
                  What we use in {locationFormatted}
                </h3>
                <ul className="space-y-2">
                  {cityProfile.benefit.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                      <span className="text-foreground/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InstallProcess serviceTitle={service.title} place={locationFormatted} />

        <NearMeAreas
          serviceTitle={service.title}
          city={locationFormatted}
          areaLinks={areaLinks}
          otherCities={otherCities}
        />

        {/* Map Section */}
        <section className="section-bg-2 relative py-8 md:py-12">
          <div className="absolute inset-0 grid-pattern-dark opacity-30" />
          <div className="container relative z-10">
            <h2 className="mb-8 text-center font-heading text-3xl font-bold text-white">
              Our Service Area in {locationFormatted}
            </h2>
            <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl shadow-lg">
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d${locationInfo.longitude}!3d${locationInfo.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${locationFormatted}!5e0!3m2!1sen!2sin!4v1706789012345`}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Service area map for ${locationFormatted}`}
              />
            </div>
          </div>
        </section>

        <LocalFAQ faqs={faqs} serviceTitle={service.title} place={locationFormatted} />

        {/* Related Services Section */}
        <section className="section-bg-3 relative py-16 md:py-24">
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="container relative z-10">
            <h2 className="mb-12 text-center font-heading text-3xl font-bold text-foreground md:text-4xl">
              Related Products & Services in {locationFormatted}
            </h2>
            <RelatedServicesClient currentService={canonicalSlug} />
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-bg-6 relative py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 font-heading text-3xl font-bold text-white md:text-4xl">
                Ready for {service.title} in {locationFormatted}?
              </h2>
              <p className="mb-8 text-lg text-white/80">
                Book a free site inspection with our {locationFormatted} team. We'll measure, recommend
                the right option and give you a transparent quote with no hidden charges.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" className="cta-gradient" asChild>
                  <Link href="/contact" className="flex items-center gap-2">
                    Book Free Site Visit <ArrowRight className="h-5 w-5" />
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
      </div>
    </>
  );
}
