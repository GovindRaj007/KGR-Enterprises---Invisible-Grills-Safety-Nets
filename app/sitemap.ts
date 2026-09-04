import { MetadataRoute } from 'next';
import { servicesData, isCanonicalServiceSlug } from '@/data/servicesData';
import { validLocations, PRIMARY_LOCATION_SLUG } from '@/constants/locations';

export const dynamic = 'force-static';

// Kept in sync with scripts/generate-static-sitemaps.js, which regenerates this
// file's output during `postbuild` for the static export. Both derive their URL
// list from servicesData + validLocations so they cannot disagree.

// Services that lead the category pages and carry the strongest commercial
// intent. Everything else still ships, one priority step lower.
const mainCategoryServices = [
  'invisible-grills',
  'invisible-grills-balcony',
  'invisible-grills-dealer',
  'balcony-safety',
  'children-protection',
  'pigeon-nets',
  'bird-spikes',
  'all-sports-practice',
  'cricket-practice',
  'terrace-cricket',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://invisiblegrillsandsafetynets.in';
  const currentDate = new Date();

  // Alias slugs resolve to another service and emit that service's canonical,
  // so they must never appear as their own sitemap URL.
  const serviceSlugs = Object.keys(servicesData).filter(isCanonicalServiceSlug);
  const isMain = (slug: string) => mainCategoryServices.includes(slug);

  const staticPages = [
    { path: '/', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/services/', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/gallery/', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/contact/', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/about/', priority: 0.7, changeFrequency: 'monthly' as const },
    // Legal pages: indexable but low value, and previously missing entirely.
    { path: '/privacy-policy/', priority: 0.2, changeFrequency: 'yearly' as const },
    { path: '/terms-of-service/', priority: 0.2, changeFrequency: 'yearly' as const },
  ].map(page => ({
    url: `${baseUrl}${page.path}`,
    lastModified: currentDate,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  // The primary focus city outranks the other service cities.
  const locationPages = validLocations.map(location => ({
    url: `${baseUrl}/locations/${location}/`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: location === PRIMARY_LOCATION_SLUG ? 0.95 : 0.9,
  }));

  const servicePages = serviceSlugs.map(slug => ({
    url: `${baseUrl}/services/${slug}/`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: isMain(slug) ? 0.9 : 0.8,
  }));

  const serviceLocationPages = serviceSlugs.flatMap(slug =>
    validLocations.map(location => ({
      url: `${baseUrl}/services/${slug}/${location}/`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: isMain(slug) ? 0.85 : 0.75,
    }))
  );

  return [
    ...staticPages,
    ...locationPages,
    ...servicePages,
    ...serviceLocationPages,
  ];
}
