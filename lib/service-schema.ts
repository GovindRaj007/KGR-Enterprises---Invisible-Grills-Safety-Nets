import { baseUrl, generateOrganizationSchema } from './organization-schema';

export function generateServiceSchema(params: {
  serviceName: string;
  description: string;
  image: string;
  slug: string;
  category?: string;
  specifications?: Array<{ label: string; value: string }>;
}) {
  const { serviceName, description, image, slug, category = 'safety-equipment', specifications = [] } = params;
  const organizationSchema = generateOrganizationSchema();

  // Product schema representing the physical product
  const productSchema = {
    '@type': ['Product', 'Service'],
    'name': serviceName,
    'description': description,
    'brand': {
      '@type': 'Brand',
      '@id': `${baseUrl}#organization`,
      'name': 'KGR Enterprises'
    },
    'manufacturer': {
      '@type': 'Organization',
      '@id': `${baseUrl}#organization`,
      'name': 'KGR Enterprises'
    },
    'image': `${baseUrl}${image}`,
    'sku': `KGR-${slug.toUpperCase()}`,
    'model': specifications.find(s => s.label.toLowerCase().includes('model'))?.value || 'Premium',
    'category': category === 'bird-protection' ? 'Pest Control > Bird Control' : 'Home Safety & Security > Safety Equipment',
    'productID': `KGR-PROD-${slug.toUpperCase()}`,
    'material': specifications.find(s => s.label.toLowerCase().includes('material'))?.value,
    'url': `${baseUrl}/services/${slug}`,
    'additionalProperty': specifications.map(spec => ({
      '@type': 'PropertyValue',
      'name': spec.label,
      'value': spec.value
    })),
    'offers': {
      '@type': 'AggregateOffer',
      'priceCurrency': 'INR',
      'lowPrice': '110',
      'highPrice': '150',
      'offerCount': '3',
      'priceValidUntil': new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
      'itemCondition': 'https://schema.org/NewCondition',
      'availability': 'https://schema.org/InStock',
      'seller': organizationSchema,
      'areaServed': ['IN'],
      'priceSpecification': {
        '@type': 'PriceSpecification',
        'price': '110',
        'priceCurrency': 'INR',
        'unitText': 'per square foot',
        'validFrom': new Date().toISOString(),
        'validThrough': new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString()
      }
    },
    'review': [
      {
        '@type': 'Review',
        'reviewRating': {
          '@type': 'Rating',
          'ratingValue': '5',
          'bestRating': '5',
          'worstRating': '1'
        },
        'name': `${serviceName} Review`,
        'author': {
          '@type': 'Person',
          'name': 'Rajesh Kumar'
        },
        'datePublished': '2025-10-15T00:00:00+05:30',
        'reviewBody': 'Excellent product quality and professional installation service. The team was very skilled and completed the work perfectly.',
        'publisher': organizationSchema
      },
      {
        '@type': 'Review',
        'reviewRating': {
          '@type': 'Rating',
          'ratingValue': '5',
          'bestRating': '5',
          'worstRating': '1'
        },
        'name': `${serviceName} Quality Review`,
        'author': {
          '@type': 'Person',
          'name': 'Priya Sharma'
        },
        'datePublished': '2025-09-20T00:00:00+05:30',
        'reviewBody': 'High-quality materials and expert installation. Very satisfied with both the product and service.',
        'publisher': organizationSchema
      }
    ],
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'bestRating': '5',
      'worstRating': '1',
      'ratingCount': '1000',
      'reviewCount': '1000'
    }
  };

  const currentDate = new Date().toISOString();
  const oneYearFromNow = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString();

  // Service schema representing the installation service
  const serviceSchema = {
    '@type': ['Service', 'HomeAndConstructionBusiness'],
    'name': `${serviceName} Installation Service`,
    'serviceType': ['Installation Service', 'Home Safety', serviceName],
    'description': `Professional installation of ${serviceName}`,
    'provider': organizationSchema,
    'category': 'Home Safety & Security Equipment',
    'areaServed': [
      {
        '@type': 'City',
        'name': 'Hyderabad',
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': '17.385044',
          'longitude': '78.486671'
        }
      },
      {
        '@type': 'City',
        'name': 'Bangalore',
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': '12.971599',
          'longitude': '77.594563'
        }
      },
      {
        '@type': 'City',
        'name': 'Chennai',
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': '13.082680',
          'longitude': '80.270721'
        }
      },
      {
        '@type': 'City',
        'name': 'Vijayawada',
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': '16.506174',
          'longitude': '80.648015'
        }
      }
    ],
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Installation Services',
      'itemListElement': [
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Free Site Inspection',
            'description': `Professional ${serviceName} consultation and measurement`
          },
          'priceSpecification': {
            '@type': 'PriceSpecification',
            'price': '0',
            'priceCurrency': 'INR',
            'description': 'Free site inspection and consultation',
            'validFrom': currentDate,
            'validThrough': oneYearFromNow
          }
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': `Standard ${serviceName} Installation`,
            'description': `Professional installation with quality materials and 15-year warranty`
          },
          'priceSpecification': {
            '@type': 'PriceSpecification',
            'price': '110',
            'priceCurrency': 'INR',
            'unitText': 'per square foot',
            'validFrom': currentDate,
            'validThrough': oneYearFromNow
          },
          'warranty': {
            '@type': 'WarrantyPromise',
            'durationOfWarranty': 'P15Y',
            'warrantyScope': 'Labor and Materials'
          }
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': `Premium ${serviceName} Installation`,
            'description': `Premium grade materials with extended warranty and priority support`
          },
          'priceSpecification': {
            '@type': 'PriceSpecification',
            'price': '150',
            'priceCurrency': 'INR',
            'unitText': 'per square foot',
            'validFrom': currentDate,
            'validThrough': oneYearFromNow
          },
          'warranty': {
            '@type': 'WarrantyPromise',
            'durationOfWarranty': 'P20Y',
            'warrantyScope': 'Labor and Materials'
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
      'reviewCount': '1000'
    }
  };

  // Return combined schema
  return {
    '@context': 'https://schema.org',
    '@graph': [
      productSchema,
      serviceSchema,
      organizationSchema
    ]
  };
}