import { baseUrl, generateOrganizationSchema } from './organization-schema';
import { PRIMARY } from '@/constants/contacts';
import { validLocations, locationData } from '@/constants/locations';
import { getServiceRoute } from '@/data/servicesData';
import { AGGREGATE_RATING } from '@/constants/business';

export function generateServiceSchema(params: {
  serviceName: string;
  description: string;
  image: string;
  slug: string;
  category?: string;
  specifications?: Array<{ label: string; value: string }>;
  // Per-sq-ft price range. Pass it only for services whose price is shown on
  // the page: structured-data prices must match visible content.
  price?: { from: number };
}) {
  const { serviceName, description, image, slug, category = 'safety-equipment', specifications = [], price } = params;
  const organizationSchema = generateOrganizationSchema();

  // Product schema representing the physical product
  const productSchema = {
    // Google requires offers (or reviews) on a Product, so services without a
    // published price are described as a Service only.
    '@type': price ? ['Product', 'Service'] : 'Service',
    'name': serviceName,
    'description': description,
    'brand': {
      '@type': 'Brand',
      '@id': `${baseUrl}/#organization`,
      'name': 'KGR Enterprises'
    },
    'manufacturer': {
      '@type': 'Organization',
      '@id': `${baseUrl}/#organization`,
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
    'offers': price && {
      '@type': 'Offer',
      'priceCurrency': 'INR',
      'price': String(price.from),
      'priceValidUntil': new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
      'itemCondition': 'https://schema.org/NewCondition',
      'availability': 'https://schema.org/InStock',
      'seller': organizationSchema,
      'areaServed': ['IN'],
      'priceSpecification': {
        '@type': 'PriceSpecification',
        'price': String(price.from),
        'priceCurrency': 'INR',
        'unitText': 'per square foot',
        'validFrom': new Date().toISOString(),
        'validThrough': new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString()
      }
    },
    'aggregateRating': AGGREGATE_RATING
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
        ...(price ? [{
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': `${serviceName} Installation`,
            'description': `Professional installation with quality materials and backed by warranty`
          },
          'priceSpecification': {
            '@type': 'PriceSpecification',
            'price': String(price.from),
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
        }] : [])
      ]
    },
    'aggregateRating': AGGREGATE_RATING
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