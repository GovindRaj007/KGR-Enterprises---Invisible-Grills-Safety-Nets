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
    streetAddress: '25/9a, Sathya Moorthy Street, Kamaraj Nagar, Choolaimedu',
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

// Generate location-specific keywords with enhanced semantic variations
export function generateLocationKeywords(serviceName: string): string[] {
  const keywords: string[] = [];
  // Enhanced service variations with more specific terms
  // Generic service variations for non-location queries
  const genericVariations = [
    serviceName,
    `${serviceName} installation`,
    `${serviceName} services`,
    `${serviceName} fitting`,
    `${serviceName} price`,
    `${serviceName} cost`,
    `best ${serviceName}`,
    `professional ${serviceName}`,
    `${serviceName} company`,
    `${serviceName} near me`,
    `top ${serviceName} company`,
    `best ${serviceName} installation`,
    `${serviceName} reviews`,
    `affordable ${serviceName}`,
    `premium ${serviceName}`,
    `${serviceName} warranty`,
    `${serviceName} installation cost`,
    `${serviceName} service provider`,
    `${serviceName} maintenance`,
    `${serviceName} repair`
  ];

  // Business-specific variations
  const businessVariations = [
    `${serviceName} dealers`,
    `${serviceName} suppliers`,
    `${serviceName} contractors`,
    `${serviceName} experts`,
    `authorized ${serviceName} dealer`,
    `certified ${serviceName} installation`,
    `${serviceName} company reviews`,
    `trusted ${serviceName} service`,
    `experienced ${serviceName} installers`,
    `${serviceName} consultation`
  ];

  // Quality and service related variations
  const qualityVariations = [
    `high quality ${serviceName}`,
    `premium ${serviceName} installation`,
    `trusted ${serviceName} services`,
    `reliable ${serviceName} dealers`,
    `24x7 ${serviceName} services`,
    `emergency ${serviceName} installation`,
    `same day ${serviceName} installation`,
    `${serviceName} with warranty`,
    `${serviceName} maintenance services`,
    `${serviceName} repair services`
  ];

  const serviceVariations = [...genericVariations, ...businessVariations, ...qualityVariations];
  
  PRIMARY_LOCATIONS.forEach(location => {
    const locationName = location.name;
    const locationState = location.state;

    // Generate combinations for each service variation
    serviceVariations.forEach(variation => {
      keywords.push(
        `${variation} in ${locationName}`,
        `${variation} ${locationName}`,
        `best ${variation} ${locationName}`,
        `top ${variation} ${locationName}`,
        `${variation} near me ${locationName}`,
        `${variation} cost in ${locationName}`,
        `${variation} price in ${locationName}`,
        `affordable ${variation} ${locationName}`,
        `local ${variation} ${locationName}`,
        `${variation} companies in ${locationName}`
      );

      // Add state-specific variations
      if (locationState) {
        keywords.push(
          `${variation} in ${locationState}`,
          `best ${variation} in ${locationState}`,
          `${variation} services ${locationState}`
        );
      }
    });
    
    // Add area-specific keywords with enhanced variations
    if (location.areas) {
      location.areas.forEach(area => {
        keywords.push(
          `${serviceName} in ${area} ${locationName}`,
          `${serviceName} installation ${area} ${locationName}`,
          `${serviceName} services near ${area}`,
          `best ${serviceName} in ${area}`,
          `${serviceName} dealers in ${area}`,
          `${serviceName} contractors ${area}`,
          `${serviceName} cost in ${area}`
        );
      });
    }

    // Add proximity-based searches
    keywords.push(
      `${serviceName} near me`,
      `${serviceName} installation near me`,
      `${serviceName} services nearby`,
      `local ${serviceName} installers`,
      `nearest ${serviceName} dealer`,
      `${serviceName} shop near me`
    );

    // Add commercial/residential specific keywords
    keywords.push(
      `residential ${serviceName} in ${locationName}`,
      `commercial ${serviceName} in ${locationName}`,
      `apartment ${serviceName} ${locationName}`,
      `villa ${serviceName} ${locationName}`,
      `office ${serviceName} ${locationName}`,
      `industrial ${serviceName} ${locationName}`
    );
  });
  
  // No need to add these again as they're already included in qualityVariations
  
  return [...new Set(keywords)]; // Remove duplicates
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
  const { serviceName, serviceSlug, shortDescription, longDescription, image, primaryLocation } = params;
  
  // Generate location-specific content
  const locationInfo = primaryLocation
    ? PRIMARY_LOCATIONS.find(loc => loc.name === primaryLocation)
    : null;

  const locationSuffix = primaryLocation
    ? ` in ${primaryLocation}`
    : ' in Hyderabad, Bangalore, Chennai, and Andhra Pradesh';

  const areas = locationInfo 
    ? `Serving ${locationInfo.areas.join(', ')} and surrounding areas`
    : 'Serving all major areas across South India';

  const title = primaryLocation
    ? `${serviceName}${locationSuffix} | Professional Installation Services`
    : `${serviceName} Installation Services${locationSuffix} | KGR Enterprises`;

  // Enhanced description with location-specific details and value propositions
  const description = `${shortDescription}${locationSuffix}. ${areas}. ${longDescription} Professional installation with 15-year warranty, quality materials, and free site inspection. Call ${PRIMARY.display} for expert service.`;
  
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
    alternates: {
      canonical: `https://invisiblegrillsandsafetynets.in/services/${serviceSlug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://invisiblegrillsandsafetynets.in/services/${serviceSlug}`,
      siteName: 'KGR Invisible Grills & Safety Nets',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${serviceName} - Professional Installation Services in Hyderabad, Bangalore, Chennai`,
        },
      ],
      type: 'article',
      // Open Graph article metadata removed due to type constraints
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
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
    'additionalProperty': specifications.map(spec => ({
      '@type': 'PropertyValue',
      'name': spec.label,
      'value': spec.value
    })),
    'offers': {
      '@type': 'AggregateOffer',
      'priceCurrency': 'INR',
      'priceRange': priceRange,
      'priceValidUntil': new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
      'availability': 'https://schema.org/InStock',
      'seller': {
        '@type': 'Organization',
        'name': 'KGR Enterprises'
      }
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'reviewCount': '1000'
    }
  };
  
  return {
    '@context': 'https://schema.org',
    '@graph': [
      productSchema,
      {
        '@type': 'WebPage',
        '@id': `https://invisiblegrillsandsafetynets.in/services/${slug}#webpage`,
        'url': `https://invisiblegrillsandsafetynets.in/services/${slug}`,
        'name': `${serviceName} in ${PRIMARY_LOCATIONS.map(loc => loc.name).join(', ')}`,
        'isPartOf': {
          '@id': 'https://invisiblegrillsandsafetynets.in/#website'
        },
        'primaryImageOfPage': {
          '@id': `https://invisiblegrillsandsafetynets.in/services/${slug}#primaryimage`
        },
        'dateModified': new Date().toISOString(),
        'description': description,
        'inLanguage': 'en-IN'
      },
      {
        '@type': 'ImageObject',
        '@id': `https://invisiblegrillsandsafetynets.in/services/${slug}#primaryimage`,
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
          'sameAs': 'https://x.com/Kgr_Grills_Nets?t=bVFltLBFrViXV15cgk_15Q&s=08',
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
          'address': [
            {
              '@type': 'PostalAddress',
              'streetAddress': '15-21-150/17, JK Heights, Balaji Nagar, Kukatpally',
              'addressLocality': 'Hyderabad',
              'addressRegion': 'Telangana',
              'postalCode': '500072',
              'addressCountry': 'IN'
            },
            {
              '@type': 'PostalAddress',
              'streetAddress': '367, 2nd A Main Road, Gokula Extension, Mathikera',
              'addressLocality': 'Bangalore',
              'addressRegion': 'Karnataka',
              'postalCode': '560054',
              'addressCountry': 'IN'
            }
          ],
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
            'latitude': '17.48134',
            'longitude': '78.40828',
            'addressRegion': 'Telangana',
            'addressLocality': 'Hyderabad'
          },
          'hasMap': 'https://www.google.com/maps?cid=your-google-business-id'
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
          'ratingCount': '1000',
          'bestRating': '5',
          'worstRating': '1',
          'reviewCount': '1000',
        },
        'url': `https://invisiblegrillsandsafetynets.in/services/${slug}`,
        'potentialAction': [
          {
            '@type': 'ContactAction',
            'target': {
              '@type': 'EntryPoint',
              'urlTemplate': 'https://invisiblegrillsandsafetynets.in/contact',
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
              'urlTemplate': `https://invisiblegrillsandsafetynets.in/services/${slug}`,
              'inLanguage': 'en-IN'
            },
            'name': 'View Service Details'
          }
        ],
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': `https://invisiblegrillsandsafetynets.in/services/${slug}#webpage`
        }
      }
    ]
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
      'url': `https://invisiblegrillsandsafetynets.in/services${serviceName ? `/${serviceName}` : ''}`
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

// Generate rich, unique content variations for each location
export function generateLocationContent(serviceName: string, location: string): {
  heading: string;
  description: string;
  features: string[];
} {
  const locationSpecific = {
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
  
  const loc = locationSpecific[location as keyof typeof locationSpecific] || locationSpecific['Hyderabad'];
  
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