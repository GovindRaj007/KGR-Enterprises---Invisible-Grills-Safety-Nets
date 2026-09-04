import type { Metadata } from 'next';
import { PRIMARY } from '@/constants/contacts';
import { locationData, validLocations, PRIMARY_LOCATION, LOCATION_NAMES } from '@/constants/locations';

// Primary service locations, derived from the single source of truth in
// constants/locations.ts so addresses/coordinates stay identical everywhere
// they are emitted (metadata, JSON-LD, sitemaps).
export const PRIMARY_LOCATIONS = validLocations.map(slug => {
  const loc = locationData[slug];
  return {
    name: loc.name as string,
    state: loc.state as string,
    areas: [...loc.primaryAreas] as string[],
    allAreas: [...loc.areas] as string[],
    streetAddress: loc.streetAddress as string,
    postalCode: loc.postalCode as string,
    latitude: loc.latitude as number,
    longitude: loc.longitude as number,
  };
});


// "Bangalore, Hyderabad, Chennai, Vijayawada and Visakhapatnam"
export const LOCATIONS_SENTENCE = `${LOCATION_NAMES.slice(0, -1).join(', ')} and ${LOCATION_NAMES[LOCATION_NAMES.length - 1]}`;

// Generate a focused keyword set for a service.
//
// This deliberately stays small. The `keywords` meta tag is ignored by Google
// and an oversized one only bloats the HTML payload (it previously emitted
// ~127KB per service page, which more than tripled document size and hurt LCP).
// We keep a tight, human-plausible set covering the primary city first, then
// the remaining service cities, plus the generic intent variations.
export function generateLocationKeywords(serviceName: string): string[] {
  const keywords: string[] = [];

  // Generic, non-geo intent variations.
  keywords.push(
    serviceName,
    `${serviceName} installation`,
    `${serviceName} services`,
    `${serviceName} price`,
    `${serviceName} cost`,
    `${serviceName} near me`,
    `best ${serviceName}`,
    `professional ${serviceName} installation`,
    `${serviceName} dealers`,
    `${serviceName} installation cost`,
  );

  // City-level variations, primary city first (PRIMARY_LOCATIONS is ordered).
  PRIMARY_LOCATIONS.forEach(location => {
    const city = location.name;
    keywords.push(
      `${serviceName} in ${city}`,
      `${serviceName} installation in ${city}`,
      `best ${serviceName} in ${city}`,
      `${serviceName} cost in ${city}`,
      `${serviceName} dealers in ${city}`,
      `${serviceName} near me in ${city}`,
      `${serviceName} in ${location.state}`,
    );
  });

  // Neighbourhood-level long tail for the primary city only — this is where
  // local intent actually converts, and it keeps the list a sane length.
  PRIMARY_LOCATION.primaryAreas.forEach(area => {
    keywords.push(`${serviceName} in ${area}`, `${serviceName} installation ${area} ${PRIMARY_LOCATION.name}`);
  });

  return [...new Set(keywords)];
}

// Google truncates meta descriptions around 155-160 characters. Trim on a word
// boundary so snippets never end mid-word.
export function clampSnippet(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,.;:-]+$/, '');
}

// Append the brand to a title, degrading gracefully so long service names do
// not push the title past Google's ~60 character display window: full brand,
// then the short form, then no brand at all.
export function withBrand(base: string, max = 60): string {
  const full = `${base} | KGR Enterprises`;
  if (full.length <= max) return full;
  const short = `${base} | KGR`;
  return short.length <= max ? short : base;
}

// Generate service-specific metadata with location targeting
// Google Analytics 4 configuration
export const GA_MEASUREMENT_ID = 'G-339PTXCP6X';

export function generateServiceMetadata(params: {
  serviceName: string;
  serviceSlug: string;
  shortDescription: string;
  longDescription: string;
  image: string;
  primaryLocation?: string;
}): Metadata {
  // longDescription is intentionally not used in the meta description: long copy
  // belongs in the page body, and Google truncates snippets around 155 chars.
  const { serviceName, serviceSlug, shortDescription, image, primaryLocation } = params;
  
  // Generate location-specific content
  const locationInfo = primaryLocation
    ? PRIMARY_LOCATIONS.find(loc => loc.name === primaryLocation)
    : null;

  // A page targeting one city says so; the generic service page leads with the
  // primary focus city but names the wider footprint, so the two never compete
  // for the same query.
  const locationSuffix = primaryLocation
    ? ` in ${primaryLocation}`
    : ` in ${PRIMARY_LOCATION.name} & South India`;

  const areas = locationInfo
    ? `Serving ${locationInfo.areas.join(', ')} and surrounding areas`
    : `Serving ${LOCATIONS_SENTENCE}`;

  // Keep titles inside Google's ~60 character display window.
  const title = withBrand(`${serviceName}${locationSuffix}`);

  // Keep descriptions near the ~155 character snippet limit. The long service
  // copy belongs in the page body, not in the meta description.
  const alreadyNamesCity = new RegExp(`\\b(${(primaryLocation ?? PRIMARY_LOCATION.name)})\\b`, 'i').test(shortDescription);
  const descriptionTail = alreadyNamesCity
    ? `. Free site visit, 15-year warranty. Call ${PRIMARY.display.trim()}.`
    : `${locationSuffix}. Free site visit, 15-year warranty. Call ${PRIMARY.display.trim()}.`;
  const description = `${clampSnippet(shortDescription.replace(/\.$/, ''), 155 - descriptionTail.length)}${descriptionTail}`;
  const socialDescription = clampSnippet(`${shortDescription}${locationSuffix}. ${areas}.`, 280);
  
  // Generate enhanced keywords combining location and industry terms
  const locationKeywords = generateLocationKeywords(serviceName);
  const serviceTypeKeywords = [
    'residential installation',
    'commercial installation',
    'apartment fitting',
    'villa installation',
    'office installation'
  ];
  const qualityKeywords = [
    'professional installation',
    'certified installers',
    'expert fitting',
    'quality materials',
    'warranty service'
  ];
  const serviceKeywords = [
    'authorized dealer',
    'free inspection',
    'same day service',
    '24x7 support',
    'emergency service'
  ];

  const keywords = [...new Set([...locationKeywords, ...serviceTypeKeywords, ...qualityKeywords, ...serviceKeywords])].join(', ');
  
  return {
    title,
    description,
    keywords,
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
    alternates: {
      canonical: `https://invisiblegrillsandsafetynets.in/services/${serviceSlug}/`,
    },
    openGraph: {
      title,
      description: socialDescription,
      url: `https://invisiblegrillsandsafetynets.in/services/${serviceSlug}/`,
      siteName: 'KGR Invisible Grills & Safety Nets',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${serviceName} - Professional Installation Services in ${LOCATIONS_SENTENCE}`,
        },
      ],
      type: 'article',
      // Open Graph article metadata removed due to type constraints
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: socialDescription,
      images: [image],
      site: '@Kgr_Grills_Nets',
      creator: '@Kgr_Grills_Nets', 
    },
    verification: {
      google: 'P8HUVCb--rZ-IF-X_ZwXQX1FOPvjQI5M0MWRtAwVMfc',
      other: {
        'msvalidate.01': 'A59B620A02512B76293509176B16FF32'
      }
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
  specifications?: Array<{ label: string; value: string }>;
}) {
  const { serviceName, description, image, slug, priceRange = '₹₹', specifications = [] } = params;

  // Create a Product schema for physical products
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': serviceName,
    'description': description,
    'image': `https://invisiblegrillsandsafetynets.in${image}`,
    'brand': {
      '@type': 'Brand',
      'name': 'KGR Enterprises'
    },
    'manufacturer': {
      '@type': 'Organization',
      'name': 'KGR Enterprises'
    },
    'sku': `kgr-${slug}`,
    'mpn': `KGR-${slug.toUpperCase()}`,
    'category': 'Home Improvement > Safety & Security',
    'additionalProperty': specifications.map(spec => ({
      '@type': 'PropertyValue',
      'name': spec.label,
      'value': spec.value
    })),
    'offers': {
      '@type': 'AggregateOffer',
      'priceCurrency': 'INR',
      'priceRange': '₹110 - ₹150 per sq ft',
      'lowPrice': 110,
      'highPrice': 150,
      'offerCount': 50,
      'price': 140,
      'unitText': 'per square foot',
      'priceValidUntil': new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
      'availability': 'https://schema.org/InStock',
      'itemCondition': 'https://schema.org/NewCondition',
      'warranty': '15-year manufacturer warranty',
      'seller': {
        '@type': 'Organization',
        'name': 'KGR Enterprises',
        'url': 'https://invisiblegrillsandsafetynets.in'
      },
      'deliveryLeadTime': {
        '@type': 'QuantitativeValue',
        'minValue': 1,
        'maxValue': 3,
        'unitCode': 'DAY'
      },
      'areaServed': {
        '@type': 'GeoCircle',
        'geoMidpoint': {
          '@type': 'GeoCoordinates',
          'latitude': PRIMARY_LOCATION.latitude,
          'longitude': PRIMARY_LOCATION.longitude
        },
        'geoRadius': {
          '@type': 'QuantitativeValue',
          'value': 100,
          'unitCode': 'KMT'
        }
      }
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': 4.9,
      'bestRating': 5,
      'ratingCount': 1126,
      'reviewCount': 1126,
      'author': {
        '@type': 'Organization',
        'name': 'KGR Enterprises',
        'sameAs': 'https://invisiblegrillsandsafetynets.in'
      }
    }
  };
  
  return {
    '@context': 'https://schema.org',
    '@graph': [
      productSchema,
      {
        '@type': 'WebPage',
        '@id': `https://invisiblegrillsandsafetynets.in/services/${slug}/#webpage`,
        'url': `https://invisiblegrillsandsafetynets.in/services/${slug}/`,
        'name': `${serviceName} in ${PRIMARY_LOCATIONS.map(loc => loc.name).join(', ')}`,
        'isPartOf': {
          '@id': 'https://invisiblegrillsandsafetynets.in/#website'
        },
        'primaryImageOfPage': {
          '@id': `https://invisiblegrillsandsafetynets.in/services/${slug}/#primaryimage`
        },
        'dateModified': new Date().toISOString(),
        'description': description,
        'inLanguage': 'en-IN'
      },
      {
        '@type': 'ImageObject',
        '@id': `https://invisiblegrillsandsafetynets.in/services/${slug}/#primaryimage`,
        'url': `https://invisiblegrillsandsafetynets.in${image}`,
        'contentUrl': `https://invisiblegrillsandsafetynets.in${image}`,
        'caption': `${serviceName} Installation Services`
      },
      {
        '@type': 'WebSite',
        '@id': 'https://invisiblegrillsandsafetynets.in/#website',
        'url': 'https://invisiblegrillsandsafetynets.in',
        'name': 'KGR Invisible Grills & Safety Nets',
        'description': 'Professional Invisible Grills and Safety Nets Installation Services across South India',
        'publisher': {
          '@id': 'https://invisiblegrillsandsafetynets.in/#organization'
        },
        'inLanguage': 'en-IN'
      },
      {
        '@type': 'Service',
        'name': serviceName,
        'serviceType': serviceName,
        'description': description,
        'image': `https://invisiblegrillsandsafetynets.in${image}`,
        'category': 'Home Improvement Services',
        'keywords': generateLocationKeywords(serviceName).join(', '),
        'provider': {
          '@type': 'LocalBusiness',
          'name': 'KGR Invisible Grills & Safety Nets',
          'telephone': PRIMARY.phone,
          'priceRange': priceRange,
          'image': 'https://invisiblegrillsandsafetynets.in/logo.png',
          'logo': '/images/logo.png',
          'description': 'Leading provider of invisible grills and safety nets installation services across South India',
          'foundingDate': '2010',
          'sameAs': ['https://x.com/Kgr_Grills_Nets'],
          'hasOfferCatalog': {
            '@type': 'OfferCatalog',
            'name': 'Invisible Grills and Safety Nets Services',
            'itemListElement': [
              { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Invisible Grills Installation' } },
              { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Safety Nets Installation' } },
              { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Bird Protection Solutions' } },
              { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Sports Nets Installation' } }
            ]
          },
          'address': PRIMARY_LOCATIONS.map(loc => ({
            '@type': 'PostalAddress',
            'streetAddress': loc.streetAddress,
            'addressLocality': loc.name,
            'addressRegion': loc.state,
            'postalCode': loc.postalCode,
            'addressCountry': 'IN'
          })),
          'areaServed': {
            '@type': 'State',
            'name': 'South India',
            'containsPlace': PRIMARY_LOCATIONS.map(loc => ({
              '@type': 'City',
              'name': loc.name,
              'containedInPlace': {
                '@type': 'State',
                'name': loc.state
              },
              'geo': {
                '@type': 'GeoCoordinates',
                'latitude': loc.latitude.toString(),
                'longitude': loc.longitude.toString()
              }
            }))
          },
          'openingHoursSpecification': {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            'opens': '08:00',
            'closes': '20:00'
          },
          'geo': {
            '@type': 'GeoCoordinates',
            'latitude': PRIMARY_LOCATION.latitude.toString(),
            'longitude': PRIMARY_LOCATION.longitude.toString(),
            'addressRegion': PRIMARY_LOCATION.state,
            'addressLocality': PRIMARY_LOCATION.name
          }
        },
        'offers': {
          '@type': 'AggregateOffer',
          'availability': 'InStock',
          'priceRange': priceRange,
          'priceCurrency': 'INR',
          'offerCount': '1000+',
          'offers': [
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': `${serviceName} Installation`,
                'description': description
              },
              'priceSpecification': {
                '@type': 'PriceSpecification',
                'priceCurrency': 'INR',
                'description': 'Free site inspection and consultation'
              }
            }
          ]
        },
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': '4.9',
          'ratingCount': '1126',
          'bestRating': '5',
          'worstRating': '1',
          'reviewCount': '1126',
          'itemReviewed': {
            '@type': 'Service',
            'name': serviceName,
            'description': description,
            'provider': {
              '@type': 'Organization',
              'name': 'KGR Enterprises',
              'url': 'https://invisiblegrillsandsafetynets.in/'
            }
          }
        },
        'url': `https://invisiblegrillsandsafetynets.in/services/${slug}/`,
        'potentialAction': [
          {
            '@type': 'ContactAction',
            'target': {
              '@type': 'EntryPoint',
              'urlTemplate': 'https://invisiblegrillsandsafetynets.in/contact/',
              'actionPlatform': [
                'http://schema.org/DesktopWebPlatform',
                'http://schema.org/MobileWebPlatform'
              ]
            },
            'name': 'Contact Us',
            'description': 'Get in touch with us for a free consultation'
          },
          {
            '@type': 'ViewAction',
            'target': {
              '@type': 'EntryPoint',
              'urlTemplate': `https://invisiblegrillsandsafetynets.in/services/${slug}/`,
              'inLanguage': 'en-IN'
            },
            'name': 'View Service Details'
          }
        ],
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': `https://invisiblegrillsandsafetynets.in/services/${slug}/#webpage`
        }
      }
    ]
  };
}

// Generate breadcrumb schema with proper structure and @id
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>, pageUrl?: string) {
  // Ensure items have trailing slashes for consistency with next.config.ts (trailingSlash: true)
  const normalizedItems = items.map(item => ({
    ...item,
    url: item.url.endsWith('/') ? item.url : `${item.url}/`
  }));

  // Generate a proper @id for the breadcrumb based on the page URL
  const breadcrumbId = pageUrl 
    ? `https://invisiblegrillsandsafetynets.in${pageUrl}#breadcrumb`
    : 'https://invisiblegrillsandsafetynets.in/#breadcrumb';

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': breadcrumbId,
    'itemListElement': normalizedItems.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': `https://invisiblegrillsandsafetynets.in${item.url}`
    }))
  };
}

// Generate FAQ schema for service pages with enhanced structured data
export function generateServiceFAQSchema(faqs: Array<{ question: string; answer: string }>, serviceName?: string) {
  const faqEntities = faqs.map(faq => ({
    '@type': 'Question',
    'name': faq.question,
    'acceptedAnswer': {
      '@type': 'Answer',
      'text': faq.answer,
    },
    'datePublished': new Date().toISOString().split('T')[0],
    'dateModified': new Date().toISOString().split('T')[0],
    'author': {
      '@type': 'Organization',
      'name': 'KGR Invisible Grills & Safety Nets',
      'url': 'https://invisiblegrillsandsafetynets.in'
    },
    'about': {
      '@type': 'Service',
      'name': serviceName || 'Installation Services',
      'provider': {
        '@type': 'LocalBusiness',
        'name': 'KGR Invisible Grills & Safety Nets'
      }
    }
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqEntities,
    'isPartOf': {
      '@type': 'WebPage',
      'url': `https://invisiblegrillsandsafetynets.in/services${serviceName ? `/${serviceName}` : ''}/`
    },
    'about': {
      '@type': 'Service',
      'name': serviceName || 'Professional Installation Services',
      'provider': {
        '@type': 'Organization',
        'name': 'KGR Invisible Grills & Safety Nets',
        'url': 'https://invisiblegrillsandsafetynets.in'
      }
    },
    'inLanguage': 'en-IN'
  };
}

// Per-city profile used to give each city genuinely different copy rather than
// the same paragraph with the city name swapped in. Exported so the service +
// location pages can use it too, not just /locations/[location]/.
export const LOCATION_PROFILES = {
  'Hyderabad': {
    climate: 'hot and humid weather conditions',
    concern: ['dust accumulation', 'high pollution levels', 'seasonal rains', 'high-rise apartments'],
    benefit: [
      'weather-resistant materials',
      'anti-corrosive coatings',
      'all-season durability',
      'specialized high-rise solutions',
      'pollution-resistant finishes'
    ],
    areas: ['Kukatpally', 'Madhapur', 'Gachibowli', 'Banjara Hills', 'Jubilee Hills', 'Hitech City'],
    expertise: '15+ years of installation experience in Hyderabad',
    specialFeature: 'Specialized solutions for Hyderabad\'s unique climate and modern architecture',
    serviceHighlights: {
      'invisible-grills': 'Perfect for Hyderabad\'s luxury apartments and villas',
      'safety-nets': 'Designed for Hyderabad\'s high-rise buildings',
      'bird-protection': 'Ideal for Hyderabad\'s urban bird challenges',
      'sports': 'Custom solutions for Hyderabad\'s sports facilities'
    }
  },
  'Bangalore': {
    climate: 'pleasant year-round weather with occasional heavy rains',
    concern: ['high-rise apartments', 'modern architecture', 'wind exposure', 'tech parks'],
    benefit: [
      'high-altitude installation expertise',
      'wind-resistant designs',
      'modern aesthetic solutions',
      'tech-park specific solutions',
      'premium finishing options'
    ],
    areas: ['Whitefield', 'Electronic City', 'Marathahalli', 'HSR Layout', 'Koramangala', 'Indiranagar', 'JP Nagar'],
    expertise: 'Experts in high-rise installations across Bangalore',
    specialFeature: 'Custom solutions for tech-parks and modern apartment complexes',
    serviceHighlights: {
      'invisible-grills': 'Ideal for Bangalore\'s modern apartments and tech parks',
      'safety-nets': 'Perfect for Bangalore\'s high-rise corporate buildings',
      'bird-protection': 'Specialized solutions for Bangalore\'s IT parks',
      'sports': 'Professional installations for Bangalore\'s sports facilities'
    }
  },
  'Chennai': {
    climate: 'coastal climate with high humidity',
    concern: [
      'salt air corrosion',
      'monsoon impact',
      'coastal winds',
      'beachfront properties',
      'high humidity'
    ],
    benefit: [
      'marine-grade materials',
      'corrosion-resistant solutions',
      'monsoon-proof installations',
      'salt-resistant coatings',
      'humidity-resistant materials'
    ],
    areas: ['Anna Nagar', 'T Nagar', 'Velachery', 'Adyar', 'Porur', 'OMR', 'ECR', 'Mylapore'],
    expertise: 'Specialized in coastal area installations with marine-grade materials',
    specialFeature: 'Anti-corrosion technology optimized for Chennai\'s coastal environment',
    serviceHighlights: {
      'invisible-grills': 'Marine-grade invisible grills for Chennai\'s coastal homes',
      'safety-nets': 'Salt-resistant safety nets for Chennai\'s apartments',
      'bird-protection': 'Durable bird protection for Chennai\'s coastal buildings',
      'sports': 'Weather-resistant sports nets for Chennai\'s facilities'
    }
  },
  'Visakhapatnam': {
    climate: 'coastal tropical climate with high humidity',
    concern: [
      'coastal corrosion',
      'sea breeze',
      'high humidity',
      'beachfront properties',
      'industrial areas'
    ],
    benefit: [
      'marine-grade materials',
      'corrosion-resistant installations',
      'humidity-resistant solutions',
      'industrial-grade protection',
      'beachfront-optimized designs'
    ],
    areas: ['MVP Colony', 'Dwaraka Nagar', 'Gajuwaka', 'Madhurawada', 'Seethammadhara', 'Beach Road'],
    expertise: 'Specialized in coastal and industrial area installations',
    specialFeature: 'Marine-grade solutions optimized for Visakhapatnam\'s coastal environment',
    serviceHighlights: {
      'invisible-grills': 'Corrosion-resistant invisible grills for coastal homes',
      'safety-nets': 'Industrial-grade safety nets for Vizag buildings',
      'bird-protection': 'Durable bird protection for coastal properties',
      'sports': 'Weather-resistant sports solutions for Visakhapatnam'
    }
  },
  'Vijayawada': {
    climate: 'tropical weather with intense summers',
    concern: [
      'extreme heat',
      'monsoon challenges',
      'dust storms',
      'residential complexes',
      'commercial buildings'
    ],
    benefit: [
      'heat-resistant materials',
      'all-weather protection',
      'dust-proof solutions',
      'UV-resistant materials',
      'temperature-optimized installations'
    ],
    areas: ['Benz Circle', 'Governorpet', 'Patamata', 'Auto Nagar', 'Gurunanak Colony', 'Madhura Nagar'],
    expertise: 'Leading service provider in Andhra Pradesh with extensive local experience',
    specialFeature: 'Heat and monsoon resistant installations with local expertise',
    serviceHighlights: {
      'invisible-grills': 'Heat-resistant invisible grills for Andhra Pradesh homes',
      'safety-nets': 'All-weather safety nets for Vijayawada buildings',
      'bird-protection': 'Durable bird protection for local climate',
      'sports': 'Custom sports solutions for Andhra Pradesh facilities'
    }
  },
};

// Generate rich, unique content variations for each location
export function generateLocationContent(serviceName: string, location: string): {
  heading: string;
  description: string;
  features: string[];
} {
  const locationSpecific = LOCATION_PROFILES;
  
  const loc = locationSpecific[location as keyof typeof locationSpecific] || locationSpecific['Bangalore'];
  
  const benefits = loc.benefit.join(' with ');
  const concerns = loc.concern.join(', ');
  const areas = loc.areas.join(', ');
  
  return {
    heading: `Professional ${serviceName} Installation in ${location}`,
    description: `Leading provider of professional ${serviceName} services in ${location}, specializing in ${benefits}. We address common challenges like ${concerns} through ${loc.specialFeature}. ${loc.expertise}, serving ${areas} and all surrounding areas.`,
    features: [
      `Serving all prime locations in ${location}`,
      `Free same-day site inspection in ${location}`,
      `${loc.specialFeature}`,
      `Expert team with local experience`,
      `15-year warranty with service support`,
      `24/7 customer support in ${location}`,
      `Customized solutions for ${location} climate`,
      `Best-in-class materials and installation`,
    ],
  };
}