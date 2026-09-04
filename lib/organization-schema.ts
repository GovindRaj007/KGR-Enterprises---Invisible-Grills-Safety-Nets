import { PRIMARY } from '@/constants/contacts';
import { validLocations, locationData, PRIMARY_LOCATION } from '@/constants/locations';

export const baseUrl = 'https://invisiblegrillsandsafetynets.in';

export const generateOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness'],
  '@id': `${baseUrl}#organization`,
  'name': 'KGR Enterprises',
  'alternateName': 'KGR Invisible Grills & Safety Nets',
  'description': 'Professional installation services for invisible grills, safety nets, pigeon nets, and sports nets across South India.',
  'url': baseUrl,
  'logo': {
    '@type': 'ImageObject',
    'url': `${baseUrl}/logo.png`,
    'width': '180',
    'height': '180',
    'caption': 'KGR Enterprises - Invisible Grills & Safety Nets Logo'
  },
  'image': [
    {
      '@type': 'ImageObject',
      'url': `${baseUrl}/logo.png`,
      'width': '180',
      'height': '180'
    }
  ],
  'contactPoint': [
    {
      '@type': 'ContactPoint',
      'telephone': PRIMARY.phone,
      'contactType': 'Customer Support',
      'areaServed': 'IN',
      'availableLanguage': ['en', 'hi', 'te', 'ta', 'kn'],
      'contactOption': ['TollFree', 'HearingImpairedSupported'],
      'hoursAvailable': {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': [
          'Monday', 'Tuesday', 'Wednesday', 'Thursday',
          'Friday', 'Saturday', 'Sunday'
        ],
        'opens': '09:00',
        'closes': '21:00'
      }
    }
  ],
  'address': validLocations.map(slug => ({
    '@type': 'PostalAddress',
    'streetAddress': locationData[slug].streetAddress,
    'addressLocality': locationData[slug].name,
    'addressRegion': locationData[slug].state,
    'postalCode': locationData[slug].postalCode,
    'addressCountry': 'IN'
  })),
  'geo': {
    '@type': 'GeoCoordinates',
    'latitude': PRIMARY_LOCATION.latitude.toString(),
    'longitude': PRIMARY_LOCATION.longitude.toString()
  },
  'areaServed': {
    '@type': 'State',
    'name': 'South India',
    'containsPlace': validLocations.map(slug => ({
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
    }))
  },
  'sameAs': ['https://x.com/Kgr_Grills_Nets'],
  'foundingDate': '2008',
  'foundingLocation': {
    '@type': 'Place',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Hyderabad',
      'addressRegion': 'Telangana',
      'addressCountry': 'IN'
    }
  },
  'knowsLanguage': ['en', 'hi', 'te', 'ta', 'kn'],
  'slogan': 'Ensuring Safety with Style',
  'numberOfEmployees': {
    '@type': 'QuantitativeValue',
    'value': 50
  },
  'award': [
    'Best Safety Solutions Provider 2025 - South India',
    'Excellence in Customer Service 2024'
  ]
});