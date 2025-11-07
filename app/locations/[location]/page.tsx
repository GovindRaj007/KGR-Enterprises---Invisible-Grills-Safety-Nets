import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LocationHero from '@/components/location/LocationHero';
import LocationAboutClient from '@/components/about/LocationAboutClient';
import { PRIMARY_LOCATIONS } from '@/lib/seo-metadata';
import { PRIMARY } from '@/constants/contacts';
import { generateLocationContent } from '@/lib/seo-metadata';

export async function generateStaticParams() {
  return PRIMARY_LOCATIONS.map(loc => ({
    location: loc.name.toLowerCase().replace(/[^a-z]/g, '')
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
  const canonicalPath = `/locations/${normalizedLocation}`;
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
      title: `KGR Enterprises - Invisible Grills & Safety Nets in ${capitalize(locName)}`,
      description: `Leading provider of invisible grills and safety nets in ${capitalize(locName)}. Professional installation, marine-grade materials, and lifetime support.`,
      url: `https://invisiblegrillsandsafetynets.in/locations/${locName.toLowerCase()}`,
      siteName: 'KGR Enterprises',
      type: 'website'
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

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default async function LocationPage({ params }: { params: Promise<{ location: string }> }) {
  const { location: locName } = await params;
  
  // Validate location parameter
  if (!locName || typeof locName !== 'string') {
    notFound();
  }
  const matched = PRIMARY_LOCATIONS.find(l => l.name.toLowerCase() === locName.toLowerCase());
  const locationDisplay = matched ? matched.name : capitalize(locName);

  const phone = PRIMARY.phone;

  const locContent = generateLocationContent('Invisible Grills & Safety Nets', locationDisplay);

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://invisiblegrillsandsafetynets.in/locations/${locName}#localbusiness`,
    'name': `KGR Invisible Grills & Safety Nets in ${locationDisplay}`,
    'telephone': phone,
    'url': `https://invisiblegrillsandsafetynets.in/locations/${locName}`,
    'priceRange': '₹₹',
    'image': 'https://invisiblegrillsandsafetynets.in/logo.png',
    'description': locContent.description,
    'areaServed': {
      '@type': 'City',
      'name': locationDisplay,
      'containedInPlace': matched?.state ? {
        '@type': 'State',
        'name': matched.state
      } : undefined
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'reviewCount': '1000',
      'bestRating': '5',
      'worstRating': '1'
    },
    'makesOffer': [
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Invisible Grills Installation',
          'areaServed': matched?.areas
        }
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Safety Nets Installation',
          'areaServed': matched?.areas
        }
      }
    ],
    'address': matched ? {
      '@type': 'PostalAddress',
      'streetAddress': matched['streetAddress'] || '',
      'addressLocality': matched.name,
      'addressRegion': matched.state,
      'addressCountry': 'IN'
    } : undefined,
    'geo': matched && matched['latitude'] && matched['longitude'] ? {
      '@type': 'GeoCoordinates',
      'latitude': matched['latitude'],
      'longitude': matched['longitude']
    } : undefined,
    'workingHoursSpecification': [
      {
        '@type': 'workingHoursSpecification',
        'dayOfWeek': ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
        'opens': '08:00',
        'closes': '20:00'
      },
      {
        '@type': 'workingHoursSpecification',
        'dayOfWeek': 'Sunday',
        'opens': '09:00',
        'closes': '18:00'
      }
    ]
  };

  // Generate breadcrumb schema for location page
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://invisiblegrillsandsafetynets.in/'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': locationDisplay,
        'item': `https://invisiblegrillsandsafetynets.in/locations/${locName}`
      }
    ]
  };

  return (
    <>
      <main>
        {/* LocalBusiness and Breadcrumb JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([ld, breadcrumbSchema]) }} />
        <LocationHero location={locationDisplay} />
        <section className="max-w-4xl mx-auto px-6 pb-6">
          <h2 className="text-2xl font-semibold mb-2">{locContent.heading}</h2>
          <p className="text-muted-foreground">{locContent.description}</p>
        </section>
        <div className='pb-6'>
          <LocationAboutClient location={locationDisplay} />
        </div>
      </main>
    </>
  );
}