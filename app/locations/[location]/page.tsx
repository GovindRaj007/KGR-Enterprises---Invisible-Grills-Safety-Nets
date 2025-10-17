import React from 'react';
import { Metadata } from 'next';
import LocationHero from '@/components/location/LocationHero';
import AboutSection from '@/components/about/AboutSection';
import { PRIMARY_LOCATIONS } from '@/lib/seo-metadata';
import { PRIMARY } from '@/constants/contacts';
import { generateLocationContent } from '@/lib/seo-metadata';

type Params = { params: { location: string } | Promise<{ location: string }> };

export async function generateStaticParams() {
  return PRIMARY_LOCATIONS.map(loc => ({ location: loc.name.toLowerCase() }));
}

export async function generateMetadata({ params }: { params: { location: string } | Promise<{ location: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const locName = resolvedParams.location;
  const title = `Invisible Grills & Safety Nets in ${capitalize(locName)}`;
  return {
    title,
    description: `Trusted invisible grills and safety nets installation throughout ${capitalize(locName)}. Complimentary site inspection and reliable, quality workmanship guaranteed.`,
  };
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default async function LocationPage({ params }: Params) {
  const resolvedParams = await params;
  const locName = resolvedParams.location;
  const matched = PRIMARY_LOCATIONS.find(l => l.name.toLowerCase() === locName.toLowerCase());
  const locationDisplay = matched ? matched.name : capitalize(locName);

  const phone = PRIMARY.phone;

  const locContent = generateLocationContent('Invisible Grills & Safety Nets', locationDisplay);

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://invisiblegrillsandsafetynets.in/locations/${locName}#localbusiness`,
    'name': `KGR - Invisible Grills & Safety Nets - ${locationDisplay} Branch`,
    'telephone': phone,
    'url': `https://invisiblegrillsandsafetynets.in/locations/${locName}`,
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
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
        'opens': '08:00',
        'closes': '20:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': 'Sunday',
        'opens': '09:00',
        'closes': '18:00'
      }
    ]
  };

  return (
    <>
      <main>
        {/* LocalBusiness JSON-LD (render inside main to avoid mounting a separate <head>) */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
        <LocationHero location={locationDisplay} />
        {/* Unique location intro to reduce duplicate content */}
        <section className="max-w-4xl mx-auto px-6 pb-6">
          {/* <h2 className="text-2xl font-semibold mb-2">{locContent.heading}</h2> */}
          <p className="text-muted-foreground">{locContent.description}</p>
        </section>
        <AboutSection />
      </main>
    </>
  );
}
