import { MetadataRoute } from 'next';
import { servicesData, serviceCategories } from '@/data/servicesData';
import { validLocations, locationData } from '@/constants/locations';

export const dynamic = 'force-static';

export default function servicesSitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://invisiblegrillsandsafetynets.in';
  const currentDate = new Date();

  // Get all service slugs
  const allServices = Object.keys(servicesData);

  // Main category services (higher priority)
  const mainCategoryServices = [
    // Invisible Grills Category
    'invisible-grills',
    'invisible-grills-balcony',
    'invisible-grills-dealer',
    
    // Main services from Safety Nets
    'balcony-safety',
    'children-protection',
    
    // Main services from Bird Protection
    'pigeon-nets',
    'bird-spikes',
    
    // Main service from Sports
    'all-sports-practice'
  ];

  // Create sitemap entries for main category services with locations
  const mainServiceEntries = mainCategoryServices.flatMap(service => {
    // Base service URL (with trailing slash per next.config.ts)
    const baseEntry = {
      url: `${baseUrl}/services/${service}/`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9
    };

    // Location-specific URLs with priority based on location data (with trailing slash)
    const locationEntries = validLocations.map(location => ({
      url: `${baseUrl}/services/${service}/${location}/`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.85 * locationData[location].priority
    }));

    return [baseEntry, ...locationEntries];
  });

  // Create sitemap entries for other services with locations
  const otherServiceEntries = allServices
    .filter(service => !mainCategoryServices.includes(service))
    .flatMap(service => {
      // Base service URL (with trailing slash per next.config.ts)
      const baseEntry = {
        url: `${baseUrl}/services/${service}/`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.8
      };

      // Location-specific URLs with priority based on location data (with trailing slash)
      const locationEntries = validLocations.map(location => ({
        url: `${baseUrl}/services/${service}/${location}/`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.75 * locationData[location].priority
      }));

      return [baseEntry, ...locationEntries];
    });

  // Category pages (removed - fragment URLs cannot be in sitemap)
  // Sitemaps don't support fragment URLs (#category), so we exclude these

  return [
    // Main services page (with trailing slash)
    {
      url: `${baseUrl}/services/`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.95
    },
    // Main category services with their location variants
    ...mainServiceEntries,
    // Other services with their location variants
    ...otherServiceEntries
  ];
}