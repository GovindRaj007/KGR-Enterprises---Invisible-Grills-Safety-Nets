import { baseUrl, generateOrganizationSchema } from './organization-schema';
import { PRIMARY } from '@/constants/contacts';
import { validLocations, locationData } from '@/constants/locations';
import { getServiceRoute } from '@/data/servicesData';

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
    'url': `${baseUrl}${getServiceRoute(slug)}`,
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
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'bestRating': '5',
      'worstRating': '1',
      'ratingCount': '1126',
      'reviewCount': '1126'
    }
  };

  const currentDate = new Date().toISOString();
  const oneYearFromNow = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString();

  // Service schema representing the installation service
  const serviceSchema = {
    '@type': ['Service', 'HomeAndConstructionBusiness'],
    'name': `${serviceName} Installation Service`,
    'description': `Professional installation of ${serviceName}`,
    'image': `${baseUrl}${image}`,
    'telephone': PRIMARY.phone,
    'priceRange': '₹₹₹',
    'address': organizationSchema.address,
    'serviceType': ['Installation Service', 'Home Safety', serviceName],
    'provider': organizationSchema,
    'category': 'Home Safety & Security Equipment',
    // Derived from constants/locations.ts so the city list, coordinates and
    // ordering match everywhere they are emitted (primary focus city first).
    'areaServed': validLocations.map(slug => ({
      '@type': 'City',
      'name': locationData[slug].name,
      'containedInPlace': {
        '@type': 'State',
        'name': locationData[slug].state
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': locationData[slug].latitude.toString(),
        'longitude': locationData[slug].longitude.toString()
      }
    })),
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
            'description': `Professional installation with quality materials and backed by warranty`
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
            'durationOfWarranty': 'P10Y',
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
            'durationOfWarranty': 'P10Y',
            'warrantyScope': 'Labor and Materials'
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