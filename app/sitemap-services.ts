import { MetadataRoute } from 'next';
import { servicesData, serviceCategories } from '@/data/servicesData';

export const dynamic = 'force-static';

export default function servicesSitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://invisiblegrillsandsafetynets.in';
  const currentDate = new Date();
  const locations = ['hyderabad', 'bangalore', 'chennai', 'vijayawada'];

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
    // Base service URL
    const baseEntry = {
      url: `${baseUrl}/services/${service}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9
    };

    // Location-specific URLs
    const locationEntries = locations.map(location => ({
      url: `${baseUrl}/services/${service}/${location}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.85
    }));

    return [baseEntry, ...locationEntries];
  });

  // Create sitemap entries for other services with locations
  const otherServiceEntries = allServices
    .filter(service => !mainCategoryServices.includes(service))
    .flatMap(service => {
      // Base service URL
      const baseEntry = {
        url: `${baseUrl}/services/${service}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.8
      };

      // Location-specific URLs
      const locationEntries = locations.map(location => ({
        url: `${baseUrl}/services/${service}/${location}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.75
      }));

      return [baseEntry, ...locationEntries];
    });

  // Category pages
  const categoryEntries = Object.keys(serviceCategories).map(category => ({
    url: `${baseUrl}/services#${category}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.85
  }));

  return [
    // Main services page
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.95
    },
    // Category pages
    ...categoryEntries,
    // Main category services with their location variants
    ...mainServiceEntries,
    // Other services with their location variants
    ...otherServiceEntries
  ];
}