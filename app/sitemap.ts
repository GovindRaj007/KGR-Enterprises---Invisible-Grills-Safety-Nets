import { MetadataRoute } from 'next';
import { PRIMARY_LOCATIONS } from '@/lib/seo-metadata';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://invisiblegrillsandsafetynets.in';
  const currentDate = new Date();

  // Static pages with prioritized order
  const staticPages = [
    {
      url: `${baseUrl}/`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services/`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact/`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about/`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/gallery/`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ];

  // Main category services (higher priority)
  const mainCategoryServices = [
    'invisible-grills',
    'invisible-grills-balcony',
    'invisible-grills-dealer',
    'balcony-safety',
    'children-protection',
    'pigeon-nets',
    'bird-spikes',
    'all-sports-practice',
  ];

  // Other services (lower priority)
  const otherServices = [
    'pets-safety',
    'grill-balcony',
    'terrace-top',
    'industrial-safety',
    'duct-area',
    'open-area',
    'staircase-safety',
    'construction-safety',
    'shade-nets',
    'mosquito-nets',
    'swimming-pool',
    'monkey-safety',
    'car-parking',
    'cloth-drying',
    'hdpe-nylon',
    'anti-bird-nets',
    'pigeon-balcony',
    'anti-seagull',
    'cricket-practice',
    'terrace-cricket',
  ];

  // Main category service pages (higher priority)
  const mainServicePages = mainCategoryServices.map(service => ({
    url: `${baseUrl}/services/${service}/`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Other service pages (lower priority)
  const otherServicePages = otherServices.map(service => ({
    url: `${baseUrl}/services/${service}/`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Location pages (high priority, just below homepage)
  const locationPages = PRIMARY_LOCATIONS.map(location => ({
    url: `${baseUrl}/locations/${location.name.toLowerCase()}/`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.95,
  }));

  // Service-Location pages (service + location combinations)
  // Main category services with all locations
  const mainServiceLocationPages = mainCategoryServices.flatMap(service =>
    PRIMARY_LOCATIONS.map(location => ({
      url: `${baseUrl}/services/${service}/${location.name.toLowerCase()}/`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    }))
  );

  // Other services with all locations
  const otherServiceLocationPages = otherServices.flatMap(service =>
    PRIMARY_LOCATIONS.map(location => ({
      url: `${baseUrl}/services/${service}/${location.name.toLowerCase()}/`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    }))
  );

  // Combine all URLs in priority order:
  // 1. Static pages (with homepage first)
  // 2. Location pages
  // 3. Main category services
  // 4. Main category service-location pages
  // 5. Other services
  // 6. Other service-location pages
  return [
    ...staticPages,
    ...locationPages,
    ...mainServicePages,
    ...mainServiceLocationPages,
    ...otherServicePages,
    ...otherServiceLocationPages,
  ];
}