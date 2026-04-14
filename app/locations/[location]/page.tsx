import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MapPin } from 'lucide-react';
import LocationHero from '@/components/location/LocationHero';
import HeroWithHeaderWrapper from '@/components/layout/HeroWithHeaderWrapper';
import LocationAboutClient from '@/components/about/LocationAboutClient';
import { PRIMARY_LOCATIONS } from '@/lib/seo-metadata';
import { PRIMARY } from '@/constants/contacts';
import { generateLocationContent, generateBreadcrumbSchema } from '@/lib/seo-metadata';
import { locationData, validLocations } from '@/constants/locations';

export async function generateStaticParams() {
  return PRIMARY_LOCATIONS.map(loc => ({
    location: loc.name.toLowerCase()
  }));
}

type PageParams = {
  params: Promise<{ location: string }>;
};

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { location: locName } = await params;
  const normalizedLocation = locName.toLowerCase();
  const matched = PRIMARY_LOCATIONS.find(l => l.name.toLowerCase() === normalizedLocation);
  
  if (!matched) {
    return {
      title: 'Location Not Found',
      robots: { index: false, follow: true }
    };
  }

  const title = `Invisible Grills & Safety Nets in ${matched.name}`;
  const canonicalPath = `/locations/${matched.name.toLowerCase()}/`;
  const locationMeta = {
    areaServed: matched.areas.join(', '),
    state: matched.state,
    fullAddress: matched.streetAddress
  };

  return {
    title,
    verification: {
      google: "P8HUVCb--rZ-IF-X_ZwXQX1FOPvjQI5M0MWRtAwVMfc",
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
    description: `Professional invisible grills and safety nets installation in ${matched.name}. Serving ${locationMeta.areaServed}. Free site inspection, 15-year warranty, and expert installation guaranteed. Contact us for quality safety solutions.`,
    alternates: {
      canonical: `https://invisiblegrillsandsafetynets.in${canonicalPath}`
    },
    openGraph: {
      title: `KGR Enterprises - Invisible Grills & Safety Nets in ${matched.name}`,
      description: `Leading provider of invisible grills and safety nets in ${matched.name}. Professional installation, marine-grade materials, and lifetime support.`,
      url: `https://invisiblegrillsandsafetynets.in/locations/${locName.toLowerCase()}/`,
      siteName: 'KGR Enterprises',
      type: 'website',
      images: [
        {
          url: '/images/invisible-grill-1.jpg',
          width: 1200,
          height: 630,
          alt: `Professional Invisible Grills & Safety Nets Installation in ${matched.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `KGR Enterprises - Invisible Grills & Safety Nets in ${matched.name}`,
      description: `Professional invisible grills and safety nets installation in ${matched.name}. Free site inspection and 15-year warranty.`,
      images: ['/images/invisible-grill-1.jpg'],
      site: '@Kgr_Grills_Nets',
      creator: '@Kgr_Grills_Nets',
    },
    keywords: [
         "invisible grills in Hyderabad",
    "Kgr invisible grills",
    "invisible grills near me",
    "invisible grills in Bangalore",
    "safety nets in Hyderabad",
    "safety net installation near me",
    "Kgr safety nets",
    "invisible grill installation",
    "best invisible grills in hyderabad",
    "best invisible grills in bangalore",
    "balcony safety nets in bangalore",
    "pigeon nets in hyderabad",
    "best invisible grills in chennai",
    "safety nets in bangalore",
    "balcony safety nets in hyderabad",
    "invisible grills in chennai",
    "safety nets in Chennai",
    "balcony safety nets in Chennai",
    "pigeon nets in chennai",
    "invisible grills in vijayawada",
    "safety nets in vijayawada",
    "balcony safety nets in vijayawada",
    "children safety nets in Hyderabad",
    "children safety nets in Visakhapatnam",
    "best invisible grills in visakhapatnam",
    "bird nets",
    "invisible grills",
    "pigeon nets",
    "duct area nets",
  ],
  };
}


export default async function LocationPage({ params }: { params: Promise<{ location: string }> }) {
  const { location: locName } = await params;
  
  // Validate location parameter
  if (!locName || typeof locName !== 'string') {
    notFound();
  }
  
  // Validate against locationData (app location pages)
  const normalizedLocation = locName.toLowerCase() as keyof typeof locationData;
  if (!validLocations.includes(normalizedLocation as any)) {
    notFound();
  }
  
  const matched = locationData[normalizedLocation];
  const locationDisplay = matched.name;

  const phone = PRIMARY.phone;
  const locContent = generateLocationContent('Invisible Grills & Safety Nets', locationDisplay);
  
  // Generate breadcrumb schema (matching service location pages pattern)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: locationDisplay, url: `/locations/${normalizedLocation}/` }
  ], `/locations/${normalizedLocation}/`);

  // Enhanced LocalBusiness schema with all required fields
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': `https://invisiblegrillsandsafetynets.in/locations/${normalizedLocation}/#localbusiness`,
        'name': `KGR Enterprises - ${locationDisplay}`,
        'alternateName': ['KGR', 'Invisible Grills', 'Safety Nets'],
        'telephone': phone,
        'url': `https://invisiblegrillsandsafetynets.in/locations/${normalizedLocation}/`,
        'priceRange': '₹₹',
        'image': [
          'https://invisiblegrillsandsafetynets.in/logo.png',
          'https://invisiblegrillsandsafetynets.in/images/hero-image.jpg'
        ],
        'description': locContent.description,
        'areaServed': matched.areas.map(area => ({
          '@type': 'City',
          'name': area
        })),
        'serviceArea': {
          '@type': 'City',
          'name': locationDisplay,
          'containedInPlace': {
            '@type': 'State',
            'name': matched.state
          }
        },
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': '4.9',
          'reviewCount': '1000',
          'bestRating': '5',
          'worstRating': '1'
        },
        'review': [
          {
            '@type': 'Review',
            'reviewRating': {
              '@type': 'Rating',
              'ratingValue': '5',
              'bestRating': '5'
            },
            'author': {
              '@type': 'Person',
              'name': `${locationDisplay} Customer`
            },
            'reviewBody': `Excellent invisible grills and safety nets installation service in ${locationDisplay}.`
          }
        ],
        'makesOffer': [
          {
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': 'Invisible Grills Installation',
              'description': 'Professional invisible grills installation with premium materials and expert fitting',
              'areaServed': matched.areas
            }
          },
          {
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': 'Safety Nets Installation',
              'description': 'UV-resistant safety nets for balcony, terraces, and open areas',
              'areaServed': matched.areas
            }
          },
          {
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': 'Bird Protection Solutions',
              'description': 'Humane bird control nets and spikes for residential and commercial spaces',
              'areaServed': matched.areas
            }
          }
        ],
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': matched.streetAddress,
          'addressLocality': locationDisplay,
          'addressRegion': matched.state,
          'addressCountry': 'IN'
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': matched.latitude,
          'longitude': matched.longitude
        },
        'sameAs': ['https://x.com/Kgr_Grills_Nets'],
        'openingHoursSpecification': [
          {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            'opens': '08:00',
            'closes': '20:00'
          },
          {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': 'Sunday',
            'opens': '09:00',
            'closes': '18:00'
          }
        ],
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': `https://invisiblegrillsandsafetynets.in/locations/${normalizedLocation}/`
        }
      },
      breadcrumbSchema
    ]
  };

  return (
    <>
      <main>
        {/* LocalBusiness JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
        
        {/* Hero Section with Overlay Breadcrumbs */}
        <HeroWithHeaderWrapper>
          <div style={{ borderRadius: '1rem' }} className="overflow-hidden">
            <LocationHero 
            location={locationDisplay} 
            breadcrumbItems={[
              { label: 'Home', href: '/' },
              { label: 'Services', href: '/services/' },
              { label: locationDisplay, href: `/locations/${normalizedLocation}/` }
            ]}
          />
          </div>
        </HeroWithHeaderWrapper>

        {/* Intro Section with Areas Covered */}
        <section className="py-8 md:py-12 lg:py-16">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Left: Text Description */}
              <div className="lg:col-span-2">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{locContent.heading}</h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{locContent.description}</p>
              </div>
              
              {/* Right: Areas Covered (Sticky on Large Screens) */}
              <div className="lg:col-span-1">
                <div className="rounded-2xl bg-gradient-to-br from-[hsl(222,47%,11%)] via-[hsl(217,33%,17%)] to-[hsl(215,25%,22%)] p-6 md:p-8 shadow-lg border border-white/10 lg:sticky lg:top-20">
                  <h3 className="mb-6 font-heading text-lg md:text-xl font-semibold text-white">
                    Areas We Serve in {locationDisplay}
                  </h3>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {matched.areas.map((area, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2"
                      >
                        <MapPin className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm md:text-base text-white/80">{area}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs md:text-sm text-white/60 border-t border-white/10 pt-4">
                    Don't see your area? Contact us – we likely serve your location too!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
    
          <LocationAboutClient location={locationDisplay} />
       

        {/* Map Section */}
        <section className="section-bg-2 relative py-12 md:py-16 lg:py-20">
          <div className="absolute inset-0 grid-pattern-dark opacity-30" />
          <div className="container relative z-10">
            <h2 className="mb-8 md:mb-12 text-center font-heading text-3xl md:text-4xl font-bold text-white">
              Our Service Area in {locationDisplay}
            </h2>
            <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl shadow-lg">
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d${matched.longitude}!3d${matched.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${locationDisplay}!5e0!3m2!1sen!2sin!4v1706789012345`}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Service area map for ${locationDisplay}`}
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}