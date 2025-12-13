import { servicesData } from '@/data/servicesData';
import { PRIMARY_LOCATIONS } from '@/lib/seo-metadata';

export const dynamic = 'force-static';

// Supported languages
const languages = {
  'en-IN': 'English'
};

type ImageEntry = {
  url: string;
  title?: string;
  caption?: string;
  geoLocation?: string;
  license?: string;
};

type ExtendedSitemapField = {
  url: string;
  lastModified?: string | Date;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  alternateRefs?: Array<{
    href: string;
    hreflang: string;
  }>;
  images?: Array<ImageEntry>;
};

// Helper to clean empty image fields
function cleanImageEntry(img: ImageEntry): ImageEntry {
  const cleaned: ImageEntry = { url: img.url };
  if (img.title && img.title.trim()) cleaned.title = img.title.trim();
  if (img.caption && img.caption.trim()) cleaned.caption = img.caption.trim();
  if (img.geoLocation && img.geoLocation.trim()) cleaned.geoLocation = img.geoLocation.trim();
  if (img.license && img.license.trim()) cleaned.license = img.license.trim();
  return cleaned;
}

export default function imagesSitemap(): Array<ExtendedSitemapField> {
  const baseUrl = 'https://invisiblegrillsandsafetynets.in';
  const currentDate = new Date();
  const entries: Array<ExtendedSitemapField> = [];

  // Process each service
  Object.entries(servicesData).forEach(([slug, service]) => {
    // Base service page with images
    const servicePage: ExtendedSitemapField = {
      url: `${baseUrl}/services/${slug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternateRefs: Object.keys(languages).map(lang => ({
        href: `${baseUrl}/${lang}/services/${slug}`,
        hreflang: lang
      })),
      images: [
        cleanImageEntry({
          url: `${baseUrl}${service.image}`,
          title: service.title,
          caption: service.description,
          license: 'https://invisiblegrillsandsafetynets.in/license'
        }),
        // Add multiple images if available
        ...(service.images || []).map(img => cleanImageEntry({
          url: `${baseUrl}${img}`,
          title: `${service.title} - Installation Example`,
          caption: `Professional ${service.title} installation by KGR Enterprises`,
          license: 'https://invisiblegrillsandsafetynets.in/license'
        }))
      ]
    };
    entries.push(servicePage);

    // Location-specific pages with images and hreflang
    PRIMARY_LOCATIONS.forEach(location => {
      const locationPage: ExtendedSitemapField = {
        url: `${baseUrl}/services/${slug}/${location.name.toLowerCase()}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.85,
        alternateRefs: Object.keys(languages).map(lang => ({
          href: `${baseUrl}/${lang}/services/${slug}/${location.name.toLowerCase()}`,
          hreflang: lang
        })),
        images: [
          cleanImageEntry({
            url: `${baseUrl}${service.image}`,
            title: `${service.title} in ${location.name}`,
            caption: `Professional ${service.title} installation services in ${location.name}`,
            geoLocation: `${location.name}, ${location.state}, India`,
            license: 'https://invisiblegrillsandsafetynets.in/license'
          })
        ]
      };
      entries.push(locationPage);
    });
  });

  return entries;
}