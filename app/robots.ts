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
          // Allow all service pages (both dynamic and static)
          '/services/',
          '/locations/',
          '/about/',
          '/contact/',
          '/gallery/',
        ],
        // Remove disallow restrictions to allow all dynamic routes
        // This allows service/[slug] and service/[slug]/[location] to be crawled
      },
      {
        userAgent: 'Googlebot-Image',
        allow: [
          '/images/',
          '/gallery/',
          '/services/',
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
