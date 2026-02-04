import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://invisiblegrillsandsafetynets.in';
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/_next/static/',
          '/api/',
          '/admin/',
          '/private/',
          '/*?*utm_source=',
          '/*?*utm_medium=',
          '/*?*utm_campaign=',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: [
          '/services/',
          '/services/invisible-grills/',
          '/services/invisible-grills-balcony/',
          '/services/invisible-grills-dealer/',
          '/locations/hyderabad/',
          '/locations/bangalore/',
          '/locations/chennai/',
          '/locations/vijayawada/',
          '/locations/visakhapatnam/',
          '/services/balcony-safety/',
          '/services/children-protection/',
          '/services/pets-safety/',
          '/services/grill-balcony/',
          '/services/terrace-top/',
          '/services/industrial-safety/',
          '/services/duct-area/',
          '/services/open-area/',
          '/services/staircase-safety/',
          '/services/construction-safety/',
          '/services/shade-nets/',
          '/services/mosquito-nets/',
          '/services/swimming-pool/',
          '/services/monkey-safety/',
          '/services/car-parking/',
          '/services/cloth-drying/',
          '/services/hdpe-nylon/',
          '/services/pigeon-nets/',
          '/services/bird-spikes/',
          '/services/anti-bird-nets/',
          '/services/pigeon-balcony/',
          '/services/anti-seagull/',
          '/services/all-sports-practice/',
          '/services/cricket-practice/',
          '/services/terrace-cricket/',
          '/contact/',
          '/about/',
          '/gallery/',
        ],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: [
          '/images/',
          '/gallery/',
        ],
      },
      {
        userAgent: 'Mediapartners-Google',
        allow: '/',
      },
      // Slow down aggressive crawlers
      {
        userAgent: ['AhrefsBot', 'SemrushBot', 'MJ12bot', 'DotBot'],
        crawlDelay: 10,
      },
    ],
    // Using the main sitemap.xml which will include references to other sitemaps
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
