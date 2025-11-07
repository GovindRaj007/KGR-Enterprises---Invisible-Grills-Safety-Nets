import { MetadataRoute } from 'next';
import { PRIMARY_LOCATIONS } from '@/lib/seo-metadata';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://invisiblegrillsandsafetynets.in';
  const currentDate = new Date();

  // Static pages with prioritized order
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0, // Highest priority for homepage
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/gallery`,
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
    url: `${baseUrl}/services/${service}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Other service pages (lower priority)
  const otherServicePages = otherServices.map(service => ({
    url: `${baseUrl}/services/${service}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Location pages (high priority, just below homepage)
  const locationPages = PRIMARY_LOCATIONS.map(location => ({
    url: `${baseUrl}/locations/${location.name.toLowerCase().replace(/[^a-z]/g, '')}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.95, // Higher than services, lower than homepage
  }));

  // Combine all URLs in priority order:
  // 1. Static pages (with homepage first)
  // 2. Location pages
  // 3. Main category services
  // 4. Other services
  return [
    ...staticPages,
    ...locationPages,
    ...mainServicePages,
    ...otherServicePages,
  ];
}