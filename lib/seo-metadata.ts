import type { Metadata } from 'next';
import { PRIMARY } from '@/constants/contacts';

// Primary service locations
export const PRIMARY_LOCATIONS = [
  {
    name: 'Hyderabad',
    state: 'Telangana',
    areas: ['Uppal', 'Kukatpally', 'Madhapur', 'Gachibowli', 'Kondapur', 'Miyapur'],
    streetAddress: '15-21-150/17, JK Heights, Balaji Nagar, Kukatpally',
    postalCode: '500072',
    latitude: 17.48134,
    longitude: 78.40828,
  },
  {
    name: 'Bangalore',
    state: 'Karnataka',
    areas: ['Whitefield', 'Electronic City', 'Marathahalli', 'HSR Layout', 'Koramangala'],
    streetAddress: '367, 2nd A Main Road, Gokula Extension, Mathikera, Bangalore Division',
    postalCode: '560054',
    latitude: 13.04237,
    longitude: 77.55302,
  },
  {
    name: 'Chennai',
    state: 'Tamil Nadu',
    areas: ['Anna Nagar', 'T Nagar', 'Velachery', 'Adyar', 'Porur'],
    streetAddress: "25/9a, Sathya Moorthy Street, Kamaraj Nagar, Choolaimedu",
    postalCode: '600094',
    latitude: 13.06523,
    longitude: 80.22148,
  },
  {
    name: 'Vijayawada',
    state: 'Andhra Pradesh',
    areas: ['Benz Circle', 'Governorpet', 'Patamata', 'Auto Nagar'],
    streetAddress: '3-12, Ayyappa Nagar, Benz Circle',
    postalCode: '520007',
    latitude: 16.48304,
    longitude: 80.66898,
  },
];

// Generate location-specific keywords
export function generateLocationKeywords(serviceName: string): string[] {
  const keywords: string[] = [];
  
  PRIMARY_LOCATIONS.forEach(location => {
    keywords.push(
      `${serviceName} in ${location.name}`,
      `${serviceName} ${location.name}`,
      `best ${serviceName} ${location.name}`,
      `${serviceName} services ${location.name}`,
      `${serviceName} installation ${location.name}`,
      `professional ${serviceName} ${location.name}`,
      `${serviceName} near me ${location.name}`,
    );
    
    // Add area-specific keywords for primary cities
    if (location.areas) {
      location.areas.forEach(area => {
        keywords.push(`${serviceName} in ${area} ${location.name}`);
      });
    }
  });
  
  return keywords;
}

// Generate service-specific metadata with location targeting
export function generateServiceMetadata(params: {
  serviceName: string;
  serviceSlug: string;
  shortDescription: string;
  longDescription: string;
  image: string;
  primaryLocation?: string;
}): Metadata {
  const { serviceName, serviceSlug, shortDescription, image, primaryLocation } = params;
  
  const locationSuffix = primaryLocation ? ` in ${primaryLocation}` : ' in Hyderabad, Bangalore, Chennai';
  const title = `${serviceName}${locationSuffix} | Professional Installation Services`;

const description = `${shortDescription} Expert installation${locationSuffix}. Quality materials, 5-year warranty, and professional services near you. Call ${PRIMARY.display} for free inspection.`;
  
  return {
    title,
    description,
    keywords: generateLocationKeywords(serviceName),
    alternates: {
  canonical: `https://invisiblegrillsandsafetynets.in/services/${serviceSlug}`,
    },
    openGraph: {
      title,
      description: shortDescription,
  url: `https://invisiblegrillsandsafetynets.in/services/${serviceSlug}`,
      siteName: 'KGR Enterprises',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: serviceName,
        },
      ],
      locale: 'en_IN',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: shortDescription,
      images: [image],
    },
  };
}

// Generate structured data for service
export function generateServiceSchema(params: {
  serviceName: string;
  description: string;
  image: string;
  slug: string;
  priceRange?: string;
}) {
  const { serviceName, description, image, slug, priceRange = '₹₹' } = params;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': serviceName,
    'serviceType': serviceName,
    'description': description,
  'image': `https://invisiblegrillsandsafetynets.in${image}`,
    'provider': {
      '@type': 'LocalBusiness',
      'name': 'KGR Enterprises',
  'telephone': PRIMARY.phone,
      'priceRange': priceRange,
      'hasOfferCatalog': {
        '@type': 'OfferCatalog',
        'name': 'Invisible Grills and Safety Nets Services',
        'itemListElement': [
          { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Invisible Grills Installation' } },
          { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Safety Nets Installation' } }
        ]
      },
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Hyderabad',
        'addressRegion': 'Telangana',
        'addressCountry': 'IN',
      },
      'areaServed': PRIMARY_LOCATIONS.map(loc => ({
        '@type': 'City',
        'name': loc.name,
        'containedInPlace': {
          '@type': 'State',
          'name': loc.state,
        },
      })),
    },
    'offers': {
      '@type': 'Offer',
      'availability': 'https://schema.org/InStock',
      'priceRange': priceRange,
    },
  'url': `https://invisiblegrillsandsafetynets.in/services/${slug}`,
  };
}

// Generate breadcrumb schema
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
  'item': `https://invisiblegrillsandsafetynets.in${item.url}`,
    })),
  };
}

// Generate FAQ schema for service pages
export function generateServiceFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer,
      },
    })),
  };
}

// Generate unique content variations for each location
export function generateLocationContent(serviceName: string, location: string): {
  heading: string;
  description: string;
  features: string[];
} {
  const locationSpecific = {
    'Hyderabad': {
      climate: 'hot and humid weather',
      concern: 'dust and pollution',
      benefit: 'weather-resistant materials perfect for Hyderabad climate',
    },
    'Bangalore': {
      climate: 'pleasant weather',
      concern: 'high-rise apartments',
      benefit: 'specialized solutions for Bangalore\'s modern apartments',
    },
    'Chennai': {
      climate: 'coastal climate',
      concern: 'salt air corrosion',
      benefit: 'corrosion-resistant materials for coastal areas',
    },
    'Vijayawada': {
      climate: 'tropical weather',
      concern: 'monsoon challenges',
      benefit: 'monsoon-proof installations',
    },
  };
  
  const loc = locationSpecific[location as keyof typeof locationSpecific] || locationSpecific['Hyderabad'];
  
  return {
    heading: `Professional ${serviceName} Installation in ${location}`,
    description: `Get expert ${serviceName} services in ${location} with our specialized solutions designed for ${loc.climate}. We address ${loc.concern} with ${loc.benefit}.`,
    features: [
      `Serving all areas of ${location}`,
      `Free site inspection in ${location}`,
      `Same-day service available in ${location}`,
      `Specialized for ${location}'s climate conditions`,
    ],
  };
}