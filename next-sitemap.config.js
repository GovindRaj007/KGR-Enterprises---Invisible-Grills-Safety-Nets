/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://invisiblegrillsandsafetynets.in',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  generateIndexSitemap: true,
  exclude: [
    '/api/*',
    '/404*',
    '/500*',
    '/_*',
    '/private/*',
    '/admin/*',
    // Exclude non-canonical URLs
    '/*?*',
    '*/amp',
    '*/*/',  // Trailing slashes
  ],
  outDir: './out',
  additionalPaths: async (config) => {
    const result = [];
    
    // Add locations (high priority, just below homepage)
    const locations = ['hyderabad', 'bangalore', 'chennai', 'vijayawada'];
    for (const location of locations) {
      result.push({
        loc: `/locations/${location}`,
        changefreq: 'weekly',
        priority: 0.95,
        lastmod: new Date().toISOString(),
      });
    }

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

    // Add main category services
    for (const service of mainCategoryServices) {
      result.push({
        loc: `/services/${service}`,
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      });
    }

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

    // Add other services
    for (const service of otherServices) {
      result.push({
        loc: `/services/${service}`,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      });
    }

    return result;
  },
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://invisiblegrillsandsafetynets.in/sitemap.xml',
      'https://invisiblegrillsandsafetynets.in/sitemap-images.xml',
    ],
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/*',
          '/_next/static/',
          '/admin/',
          '/private/',
          '/*?*utm_source=',
          '/*?*utm_medium=',
          '/*?*utm_campaign=',
        ],
      },
    ],
  },
  transform: async (config, path) => {
    // Default priority and frequency
    let priority = 0.5;
    let changefreq = 'monthly';

    // Handle static pages first
    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path.startsWith('/locations/')) {
      priority = 0.95;
      changefreq = 'weekly';
    } else if (path === '/contact') {
      priority = 0.8;
      changefreq = 'monthly';
    } else if (path === '/about' || path === '/gallery') {
      priority = 0.7;
      changefreq = path === '/gallery' ? 'weekly' : 'monthly';
    } else if (path.startsWith('/services/')) {
      changefreq = 'weekly';
      
      // Main category services
      const mainServices = [
        'invisible-grills',
        'invisible-grills-balcony',
        'invisible-grills-dealer',
        'balcony-safety',
        'children-protection',
        'pigeon-nets',
        'bird-spikes',
        'all-sports-practice',
      ];
      
      // Check if it's a main category service
      const servicePath = path.replace('/services/', '');
      priority = mainServices.includes(servicePath) ? 0.9 : 0.8;
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
}