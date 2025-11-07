import { PRIMARY } from '@/constants/contacts';

export const baseUrl = 'https://invisiblegrillsandsafetynets.in';

export const generateOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness'],
  '@id': `${baseUrl}#organization`,
  'name': 'KGR Enterprises',
  'alternateName': 'KGR Invisible Grills & Safety Nets',
  'description': 'Professional installation services for invisible grills, safety nets, bird protection solutions, and sports nets across South India.',
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
    'containsPlace': [
      {
        '@type': 'City',
        'name': 'Hyderabad',
        'containedInPlace': {
          '@type': 'State',
          'name': 'Telangana'
        }
      },
      {
        '@type': 'City',
        'name': 'Bangalore',
        'containedInPlace': {
          '@type': 'State',
          'name': 'Karnataka'
        }
      },
      {
        '@type': 'City',
        'name': 'Chennai',
        'containedInPlace': {
          '@type': 'State',
          'name': 'Tamil Nadu'
        }
      },
      {
        '@type': 'City',
        'name': 'Vijayawada',
        'containedInPlace': {
          '@type': 'State',
          'name': 'Andhra Pradesh'
        }
      }
    ]
  },
  'sameAs': [
    'https://x.com/Kgr_Grills_Nets?t=bVFltLBFrViXV15cgk_15Q&s=08'
  ],
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