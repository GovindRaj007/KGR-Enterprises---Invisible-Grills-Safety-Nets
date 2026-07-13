import { Metadata } from 'next';
export const dynamic = 'force-static';
import OptimizedImage from '@/components/shared/OptimizedImage';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';

import {
  servicesData,
  resolveServiceSlug,
  isCanonicalServiceSlug,
  serviceSpecificLocationFAQs,
} from '@/data/servicesData';
import { getCanonicalUrl } from '@/lib/canonical-url';
import { PRIMARY } from '@/constants/contacts';
import {
  generateBreadcrumbSchema,
  generateLocationContent,
  generateServiceFAQSchema,
} from '@/lib/seo-metadata';
import { Phone, ArrowRight, MapPin, Star, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import HeroWithHeaderWrapper from '@/components/layout/HeroWithHeaderWrapper';
import { locationData, validLocations } from '@/constants/locations';
import { dealerBenefits, dealerFaqs, dealerHeroDescription, dealerPageDescription } from '@/constants/dealer-content';
import ServiceFAQ from '@/components/services/ServiceFAQ';


export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; location: string }>
}): Promise<Metadata> {
  const { slug, location } = await params;
  const canonicalSlug = resolveServiceSlug(slug);
  const service = servicesData[canonicalSlug];
  const normalizedLocation = location.toLowerCase() as keyof typeof locationData;

  if (!service || !validLocations.includes(normalizedLocation)) {
    return {};
  }

  const locationFormatted = normalizedLocation.charAt(0).toUpperCase() + normalizedLocation.slice(1);
  const locationContent = generateLocationContent(service.title, locationFormatted);
  const isDealerLocationPage = canonicalSlug === 'invisible-grills-dealer';
  
  // Generate location-specific keywords and description
  const locationInfo = locationData[normalizedLocation];
  const areas = locationInfo.areas.join(', ');

  const enhancedDescription = isDealerLocationPage
    ? dealerPageDescription(locationFormatted)
    : `Professional ${service.title.toLowerCase()} services in ${locationFormatted}. ${locationContent.description} Serving ${areas}. Free site visit, expert installation, and long-term warranty support from KGR Enterprises.`;

  return {
    title: isDealerLocationPage
      ? `Invisible Grill Dealer in ${locationFormatted} | Authorized Dealer | KGR Enterprises`
      : `${service.title} in ${locationFormatted} | Best Installation Services | KGR Enterprises`,
    description: enhancedDescription,
    alternates: {
      canonical: getCanonicalUrl(`/services/${canonicalSlug}/${normalizedLocation}`),
    },
    openGraph: {
      title: isDealerLocationPage
        ? `Invisible Grill Dealer in ${locationFormatted} | KGR Enterprises`
        : `${service.title} in ${locationFormatted} | KGR Enterprises`,
      description: isDealerLocationPage
        ? dealerPageDescription(locationFormatted)
        : `Professional ${service.title.toLowerCase()} services in ${locationFormatted}. Expert installation and maintenance by KGR Enterprises.`,
      url: `https://invisiblegrillsandsafetynets.in/services/${canonicalSlug}/${normalizedLocation}/`,
      siteName: 'KGR Invisible Grills & Safety Nets',
      images: [
        {
          url: service.image,
          width: 1200,
          height: 630,
          alt: `${service.title} - Professional Installation Services in ${locationFormatted}`,
        },
      ],
      type: 'article',
      locale: 'en-IN',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.title} in ${locationFormatted}`,
      description: `Professional ${service.title.toLowerCase()} services in ${locationFormatted}.`,
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
    },
  };
}

export function generateStaticParams(): { slug: string; location: string }[] {
  return Object.keys(servicesData)
    .filter(isCanonicalServiceSlug)
    .flatMap(slug =>
    validLocations.map(location => ({
      slug,
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
  const canonicalSlug = resolveServiceSlug(slug);
  if (!isCanonicalServiceSlug(slug)) {
    redirect(`/services/${canonicalSlug}/${location.toLowerCase()}`);
  }

  const service = servicesData[canonicalSlug];
  const normalizedLocation = location.toLowerCase() as keyof typeof locationData;

  if (!service || !validLocations.includes(normalizedLocation)) {
    notFound();
  }

  const locationFormatted = normalizedLocation.charAt(0).toUpperCase() + normalizedLocation.slice(1);
  const locationInfo = locationData[normalizedLocation as keyof typeof locationData];
  const locationContent = generateLocationContent(service.title, locationFormatted);
  const isDealerLocationPage = canonicalSlug === 'invisible-grills-dealer';
  const heroHeading = isDealerLocationPage
    ? `Invisible Grill Dealer in ${locationFormatted}`
    : `${service.title} in ${locationFormatted}`;
  const heroDescription = isDealerLocationPage
    ? dealerHeroDescription(locationFormatted)
    : `${service.title} installation in ${locationFormatted} with expert fitment, durable materials, and reliable aftercare.`;
  const whyChooseHeading = isDealerLocationPage
    ? `Why Choose Us as Your Invisible Grill Dealer in ${locationFormatted}?`
    : `Why Choose Us for ${service.title} in ${locationFormatted}?`;
  const whyChooseDescription = isDealerLocationPage
    ? dealerPageDescription(locationFormatted)
    : locationContent.description;
  const whyChooseFeatures = isDealerLocationPage ? dealerBenefits : locationContent.features;

  const locationFAQs: Array<{ question: string; answer: string }> = [
    {
      question: `Do you provide ${service.title.toLowerCase()} in all areas of ${locationFormatted}?`,
      answer: `Yes, we provide ${service.title.toLowerCase()} across ${locationFormatted}, including ${locationInfo.areas.slice(0, 4).join(', ')} and surrounding areas.`,
    },
    {
      question: `How long does ${service.title.toLowerCase()} installation take in ${locationFormatted}?`,
      answer: `Most installations are completed within 4-6 hours depending on site conditions and scope. Call ${PRIMARY.display} for a site assessment in ${locationFormatted}.`,
    },
    {
      question: `What is the price for ${service.title.toLowerCase()} in ${locationFormatted}?`,
      answer: `Pricing depends on area, configuration, and material specifications. We provide a free inspection and transparent quote for ${locationFormatted} projects.`,
    },
    {
      question: `Are your ${service.title.toLowerCase()} materials suitable for ${locationFormatted} climate?`,
      answer: `Yes. Our installations are planned for local weather exposure and long-term durability, including UV resistance and corrosion resistance where required.`,
    },
  ];

  if (isDealerLocationPage) {
    locationFAQs.splice(0, locationFAQs.length, ...dealerFaqs.map((faq) => ({
      question: faq.question,
      answer: faq.answer,
    })));
  }

  const serviceFaqKey = canonicalSlug;
  const serviceFaqByLocation = serviceSpecificLocationFAQs[serviceFaqKey];
  if (serviceFaqByLocation && !isDealerLocationPage) {
    const locationKeyCandidates = [
      normalizedLocation,
      locationFormatted.toLowerCase().replace(/\s+/g, '-'),
    ];

    if (normalizedLocation === 'vijayawada' || normalizedLocation === 'visakhapatnam') {
      locationKeyCandidates.push('andhra-pradesh');
    }

    const matchedKey = locationKeyCandidates.find((key) => serviceFaqByLocation[key]);
    if (matchedKey && Array.isArray(serviceFaqByLocation[matchedKey])) {
      locationFAQs.push(...serviceFaqByLocation[matchedKey]);
    }
  }

  const faqSchema = generateServiceFAQSchema(
    locationFAQs,
    isDealerLocationPage ? `Invisible Grill Dealer in ${locationFormatted}` : `${service.title} in ${locationFormatted}`
  );

  // Generate breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services/' },
    { name: service.title, url: `/services/${canonicalSlug}/` },
    { name: isDealerLocationPage ? `Invisible Grill Dealer in ${locationFormatted}` : `${service.title} in ${locationFormatted}`, url: `/services/${canonicalSlug}/${normalizedLocation}/` }
  ], `/services/${canonicalSlug}/${normalizedLocation}/`);

  // Import baseUrl
  const baseUrl = 'https://invisiblegrillsandsafetynets.in';
  const currentDate = new Date().toISOString();
  const oneYearFromNow = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString();

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Service", "HomeAndConstructionBusiness"],
        "@id": `${baseUrl}/services/${canonicalSlug}/${normalizedLocation}#service`,
        "name": isDealerLocationPage ? `Invisible Grill Dealer in ${locationFormatted}` : `${service.title} in ${locationFormatted}`,
        "description": isDealerLocationPage ? dealerPageDescription(locationFormatted) : service.description,
        "image": {
          "@type": "ImageObject",
          "url": service.image,
          "width": 1200,
          "height": 675
        },
        "telephone": PRIMARY.phone,
        "priceRange": "₹₹₹",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": locationFormatted,
          "addressRegion": locationInfo.state,
          "addressCountry": "IN"
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `${baseUrl}/services/${canonicalSlug}/${normalizedLocation}`
        },
        "serviceType": ["Installation Service", "Home Safety", service.title],
        "category": "Home Safety & Security Equipment",
        "areaServed": {
          "@type": "City",
          "name": locationFormatted,
          "containsPlace": locationInfo.areas.map(area => ({
            "@type": "Place",
            "name": area
          }))
        },
        "provider": {
          "@type": "LocalBusiness",
          "@id": "https://invisiblegrillsandsafetynets.in#organization",
          "name": "KGR Enterprises",
          "telephone": PRIMARY.phone,
          "image": {
            "@type": "ImageObject",
            "url": service.image,
            "width": 1200,
            "height": 675
          },
          "address": {
            "@type": "PostalAddress",
            "addressLocality": locationFormatted,
            "addressRegion": locationInfo.state,
            "addressCountry": "IN",
          },
          "priceRange": "₹₹₹",
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
                "description": `Professional ${service.title.toLowerCase()} consultation in ${locationFormatted}`
              },
              "areaServed": locationInfo.areas,
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
                "description": `Professional installation with quality materials and includes Warranty`
              },
              "areaServed": locationInfo.areas,
              "priceSpecification": {
                "@type": "PriceSpecification",
                "price": "110",
                "priceCurrency": "INR",
                "unitText": "per square foot",
                "validFrom": currentDate,
                "validThrough": oneYearFromNow
              },
              "warranty": {
                "@type": "WarrantyPromise",
                "durationOfWarranty": "P10Y",
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
              "areaServed": locationInfo.areas,
              "priceSpecification": {
                "@type": "PriceSpecification",
                "price": "150",
                "priceCurrency": "INR",
                "unitText": "per square foot",
                "validFrom": currentDate,
                "validThrough": oneYearFromNow
              },
              "warranty": {
                "@type": "WarrantyPromise",
                "durationOfWarranty": "P10Y",
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
        "review": [
          {
            "@type": "Review",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5",
              "bestRating": "5"
            },
            "author": {
              "@type": "Person",
              "name": `${locationFormatted} Customer`
            },
            "datePublished": currentDate,
            "reviewBody": `Excellent ${service.title.toLowerCase()} installation service in ${locationFormatted}. Professional team and great quality.`
          },
          {
            "@type": "Review",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5",
              "bestRating": "5"
            },
            "author": {
              "@type": "Person",
              "name": `Verified Customer`
            },
            "datePublished": currentDate,
            "reviewBody": `Best ${service.title.toLowerCase()} service provider in ${locationFormatted}. Quick installation and excellent after-service support.`
          }
        ]
      },
      breadcrumbSchema
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <HeroWithHeaderWrapper>
          <section className="relative py-16 md:py-28 overflow-hidden" style={{ borderRadius: '1rem' }}>
            <div className="absolute inset-0">
              <OptimizedImage
                src={service.image} 
                alt={isDealerLocationPage ? `Invisible grill dealer in ${locationFormatted}` : `${service.title} installation in ${locationFormatted} for balcony, window and child safety`}
                className="h-full w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[hsl(222,47%,8%,0.95)] via-[hsl(222,47%,10%,0.88)] to-[hsl(222,47%,10%,0.75)]" />
            </div>
            <div className="absolute inset-0 grid-pattern-dark opacity-30" />
            
            <div className="container mt-[-2rem] relative z-10">
              {/* Breadcrumbs */}
              <Breadcrumbs
                items={[
                  { label: "Services", href: "/services" },
                  { label: service.title, href: `/services/${canonicalSlug}` },
                  { label: locationFormatted },
                ]}
                darkMode={true}
              />

              <div className="mx-auto max-w-4xl">
                {/* Location Indicator */}
                <div className="mb-4 flex items-center gap-2 text-white/80">
                  <MapPin className="h-5 w-5" />
                  <span>Serving {locationFormatted} & surrounding areas</span>
                </div>

                <h1 className="mb-6 font-heading text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                  {heroHeading}
                </h1>
                <p className="mb-8 text-lg text-white/80 md:text-xl">
                  {heroDescription}
                </p>

                {/* CTAs */}
                <div className="flex flex-col gap-4 sm:flex-row mb-8">
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

                {/* Trust Badges */}
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    4.9 Rating in {locationFormatted}
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
                  {whyChooseHeading}
                </h2>
                <p className="mb-8 text-foreground/90">
                  {whyChooseDescription}
                </p>
                <ul className="space-y-3">
                  {whyChooseFeatures.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Areas Covered */}
              <div className="w-full rounded-2xl bg-gradient-to-br from-[hsl(222,47%,11%)] via-[hsl(217,33%,17%)] to-[hsl(215,25%,22%)] p-6 shadow-lg border border-white/10 md:w-fit md:max-w-full md:self-start md:p-8">
                <h3 className="mb-6 font-heading text-xl font-semibold text-white">
                  Areas We Serve in {locationFormatted}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {locationInfo.areas.map((area, index) => (
                    <div key={index} className="flex items-center gap-2 text-white/80">
                      <MapPin className="h-4 w-4 text-accent flex-shrink-0" />
                      <span className="text-sm">{area}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-sm text-white/60">
                  Don&apos;t see your area? Contact us – we likely serve your location too!
                </p>
              </div>
            </div>
          </div>
        </section>

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

        {/* FAQ Section */}
        <ServiceFAQ faqs={locationFAQs} />

        {/* CTA Section */}
        <section className="section-bg-6 relative py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl rounded-3xl border border-blue-600/30 bg-gradient-to-br from-blue-600/20 via-blue-600/10 to-transparent backdrop-blur-sm p-8 md:p-12 text-center">
              <h2 className="mb-4 font-heading text-3xl font-bold text-white md:text-4xl">
                {isDealerLocationPage ? `Become an Invisible Grill Dealer in ${locationFormatted}` : `Ready to Get Started in ${locationFormatted}?`}
              </h2>
              <p className="mb-8 text-lg text-white/80">
                {isDealerLocationPage
                  ? `Partner with KGR Enterprises in ${locationFormatted} for wholesale pricing, dealer support, and exclusive territory opportunities.`
                  : 'Schedule a free consultation with our experts. We will assess your needs and provide a transparent quote with no hidden charges.'}
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" className="cta-gradient" asChild>
                  <Link href="/contact" className="flex items-center gap-2">
                    Book Consultation <ArrowRight className="h-5 w-5" />
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