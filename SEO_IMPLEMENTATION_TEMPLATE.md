# COMPREHENSIVE SEO IMPLEMENTATION GUIDE - PRODUCTION-READY TEMPLATE

## **OVERVIEW**
This is a complete, enterprise-grade SEO implementation template for Next.js projects following all best practices. Use this as a reference prompt for implementing similar SEO strategies in new projects.

---

## **1. CORE SEO ARCHITECTURE**

### A. Project Structure Setup
```
project-root/
├── lib/
│   ├── canonical-url.ts
│   ├── seo-metadata.ts
│   ├── organization-schema.ts
│   ├── service-schema.ts
│   ├── faq-schema.ts
│   ├── url-utils.ts
│   ├── etag-utils.ts
│   └── searchData.ts
├── scripts/
│   ├── optimize-images.ts
│   ├── generate-static-sitemaps.js
│   ├── generate-hreflang-sitemap.js
│   └── post-build.js
├── constants/
│   ├── locations.ts
│   ├── contacts.ts
│   ├── seo.ts
│   └── services.ts
├── app/
│   ├── layout.tsx (Global SEO metadata)
│   ├── page.tsx (Homepage)
│   ├── sitemap.ts (Static pages sitemap)
│   ├── sitemap-services.ts (Service + location sitemap)
│   ├── sitemap-images.ts (Image metadata sitemap)
│   ├── robots.ts (Dynamic robots.txt)
│   ├── services/
│   │   ├── page.tsx
│   │   ├── [slug]/
│   │   │   ├── page.tsx
│   │   │   └── [location]/
│   │   │       └── page.tsx
│   ├── locations/
│   │   └── [location]/
│   │       └── page.tsx
│   └── [other-pages]/
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── MainLayout.tsx
│   └── [component-groups]/
├── next.config.ts
├── next-sitemap.config.js
├── tsconfig.json
├── tailwind.config.js
└── package.json
```

---

## **2. CONFIGURATION FILES**

### A. next.config.ts
```typescript
// Key configurations for SEO:
// - Image optimization with WebP format
// - Trailing slashes enabled
// - CSS optimization
// - Output static export for maximum compatibility
// - Remove powered-by header
// - Disable ESLint during builds (optional)

const nextConfig: NextConfig = {
  images: {
    loader: 'custom',
    loaderFile: './image-loader.ts',
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    unoptimized: true, // For static export
    minimumCacheTTL: 60,
  },
  trailingSlash: true,
  output: 'export',
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,
  },
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
      ],
    },
  ],
};
```

### B. next-sitemap.config.js
```javascript
// Automated sitemap generation with:
// - Priority hierarchy for different page types
// - Change frequency settings
// - Multiple sitemaps (main, services, images, hreflang)
// - Auto-generated robots.txt

module.exports = {
  siteUrl: 'https://yourdomain.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/', disallow: ['/api/', '/admin/'] },
    ],
    additionalSitemaps: [
      'https://yourdomain.com/sitemap-services.xml',
      'https://yourdomain.com/sitemap-images.xml',
      'https://yourdomain.com/sitemap-hreflang.xml',
    ],
  },
  priority: 0.7,
  changefreq: 'weekly',
  exclude: ['/api/*', '/admin/*'],
};
```

### C. package.json Scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "npm run prebuild && next build && npm run postbuild",
    "prebuild": "ts-node scripts/optimize-images.ts",
    "postbuild": "node scripts/generate-static-sitemaps.js && node scripts/generate-hreflang-sitemap.js && node scripts/post-build.js",
    "optimize:images": "ts-node scripts/optimize-images.ts",
    "generate:sitemaps": "node scripts/generate-static-sitemaps.js",
    "generate:hreflang": "node scripts/generate-hreflang-sitemap.js"
  },
  "dependencies": {
    "next": "^15.0.0",
    "next-sitemap": "^latest",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  }
}
```

---

## **3. CORE SEO UTILITIES**

### A. lib/canonical-url.ts
```typescript
// Purpose: Generate consistent canonical URLs
// Features:
// - Enforce trailing slashes
// - Remove query parameters and hash fragments
// - Maintain consistent base URL

export const getCanonicalUrl = (pathname: string): string => {
  const baseUrl = 'https://yourdomain.com';
  
  // Remove hash and query params
  let url = pathname.split('?')[0].split('#')[0];
  
  // Ensure trailing slash
  if (!url.endsWith('/')) {
    url = `${url}/`;
  }
  
  return `${baseUrl}${url}`;
};

export const normalizeUrl = (url: string): string => {
  return url.replace(/\/$/, '') + '/';
};
```

### B. lib/seo-metadata.ts (CORE METADATA GENERATION)
```typescript
// Purpose: Generate dynamic, location-aware metadata
// Features:
// - Keyword variation generation (100+ combinations)
// - Service-specific titles and descriptions
// - Open Graph and Twitter card data
// - Google Analytics integration
// - Schema.org metadata

export const generateLocationKeywords = (
  service: string,
  location: string
): string[] => {
  const keywords = [
    `${service} in ${location}`,
    `${service} near me ${location}`,
    `best ${service} ${location}`,
    `professional ${service} ${location}`,
    `affordable ${service} ${location}`,
    `${service} installation ${location}`,
    `${service} service ${location}`,
    `top ${service} ${location}`,
    `${service} supplier ${location}`,
    // ... generate 100+ variations
  ];
  return keywords;
};

export const generateServiceMetadata = (
  service: string,
  location: string,
  baseDescription: string
) => {
  const title = `${service} in ${location} | KGR Enterprises`;
  const description = `${baseDescription} in ${location}. Premium quality, 15-year warranty. Contact us today.`;
  const keywords = generateLocationKeywords(service, location);

  return {
    title,
    description,
    keywords: keywords.slice(0, 15).join(', '),
    openGraph: {
      title,
      description,
      url: getCanonicalUrl(`/services/${service}/${location}`),
      type: 'website',
      images: [{
        url: 'https://yourdomain.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: title,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://yourdomain.com/og-image.jpg'],
    },
  };
};

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || '';
```

### C. lib/organization-schema.ts
```typescript
// Purpose: Define organization-wide structured data
// Features:
// - Company identity and contact information
// - Multi-language support
// - Operating hours
// - Multiple business locations
// - Social media integration

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Your Company Name',
  url: 'https://yourdomain.com',
  logo: {
    '@type': 'ImageObject',
    url: 'https://yourdomain.com/logo.png',
    width: 180,
    height: 180,
  },
  description: 'Your company description',
  foundingDate: '2008',
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      telephone: '+91-XXXXX',
      areaServed: 'IN',
      availableLanguage: ['en', 'hi', 'te', 'ta', 'kn'],
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '09:00',
        closes: '21:00',
      },
    },
  ],
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: 'Street Address',
      addressLocality: 'City',
      addressRegion: 'State',
      postalCode: 'XXXXX',
      addressCountry: 'IN',
    },
  ],
  areaServed: {
    '@type': 'GeoShape',
    addressCountry: 'IN',
    areaServed: ['Telangana', 'Karnataka', 'Andhra Pradesh', 'Tamil Nadu'],
  },
  sameAs: ['https://twitter.com/yourhandle', 'https://facebook.com/yourpage'],
  numberOfEmployees: 'X',
  priceRange: '₹₹₹',
};
```

### D. lib/service-schema.ts
```typescript
// Purpose: Generate service/product schema for search results
// Features:
// - Dual schema (Product + Service)
// - Ratings and reviews
// - Pricing information
// - Geo-coordinates for service areas

export const generateServiceSchema = (
  serviceName: string,
  description: string,
  locations: Array<{ name: string; lat: number; lng: number }>
) => {
  return {
    '@context': 'https://schema.org',
    '@type': ['Product', 'Service'],
    name: serviceName,
    description,
    brand: {
      '@type': 'Brand',
      name: 'Your Company Name',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Your Company Name',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1126',
      bestRating: '5',
      worstRating: '1',
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'INR',
      lowPrice: '110',
      highPrice: '150',
      offerCount: locations.length,
      availability: 'https://schema.org/InStock',
    },
    areaServed: locations.map((loc) => ({
      '@type': 'City',
      name: loc.name,
      geo: {
        '@type': 'GeoCoordinates',
        latitude: loc.lat,
        longitude: loc.lng,
      },
    })),
    review: [
      {
        '@type': 'Review',
        reviewRating: { '@type': 'Rating', ratingValue: '5' },
        author: { '@type': 'Person', name: 'Customer Name' },
        reviewBody: 'Excellent service and quality products.',
      },
      // ... more reviews
    ],
  };
};
```

### E. lib/faq-schema.ts
```typescript
// Purpose: Generate FAQ schema for featured snippet eligibility
// Features:
// - Service-specific FAQ pairs
// - Featured snippet optimization

export const generateFAQSchema = (serviceName: string, faqs: Array<{question: string; answer: string}>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
};
```

### F. lib/url-utils.ts
```typescript
// Purpose: URL normalization utilities
// Features:
// - Consistent URL formatting
// - Location name normalization
// - Query parameter handling

export const normalizeLocationName = (location: string): string => {
  return location
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
};

export const removeQueryParams = (url: string): string => {
  return url.split('?')[0];
};
```

### G. lib/etag-utils.ts
```typescript
// Purpose: Generate ETags for cache validation
// Features:
// - Content-based cache keys
// - Fast cache validation

import crypto from 'crypto';

export const generateETag = (content: string): string => {
  return crypto.createHash('sha256').update(content).digest('hex');
};
```

### H. lib/searchData.ts
```typescript
// Purpose: Internal site search index
// Features:
// - Searchable service index
// - Keyword-based search
// - Location awareness

export const searchData = [
  {
    id: 1,
    title: 'Service Name',
    category: 'Category',
    description: 'Service description',
    keywords: ['keyword1', 'keyword2', 'keyword3'],
    url: '/services/service-name/',
    locations: ['location1', 'location2'],
  },
  // ... more services
];
```

---

## **4. DYNAMIC SITEMAP GENERATION**

### A. app/sitemap.ts (Static Pages)
```typescript
// Purpose: Generate sitemap for static pages
// Features:
// - Priority hierarchy
// - Change frequency
// - Last modified timestamps

import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://yourdomain.com/',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: 'https://yourdomain.com/services/',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://yourdomain.com/about/',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://yourdomain.com/contact/',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://yourdomain.com/gallery/',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];
}
```

### B. app/sitemap-services.ts (Service + Location)
```typescript
// Purpose: Generate sitemap for service+location combinations
// Features:
// - Dynamic priority calculation
// - All service+location combinations

import { MetadataRoute } from 'next';
import { SERVICES } from '@/constants/services';
import { LOCATIONS } from '@/constants/locations';

export default function servicesSitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  SERVICES.forEach((service) => {
    LOCATIONS.forEach((location) => {
      entries.push({
        url: `https://yourdomain.com/services/${service.slug}/${location.slug}/`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.85 * location.priority,
      });
    });
  });

  return entries;
}
```

### C. app/sitemap-images.ts (Image Metadata)
```typescript
// Purpose: Generate image sitemap with metadata
// Features:
// - Image URLs with captions
// - Geolocation metadata
// - License information

import { MetadataRoute } from 'next';

export default function imagesSitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://yourdomain.com/images/service-1.jpg',
      images: [
        {
          url: 'https://yourdomain.com/images/service-1.jpg',
          title: 'Service 1 Installation',
          caption: 'Professional installation of service 1',
          geo_location: 'Hyderabad, India',
          license: 'https://yourdomain.com/license/',
        },
      ],
    },
    // ... more images
  ];
}
```

### D. app/robots.ts (Dynamic Robots File)
```typescript
// Purpose: Dynamic robots.txt generation
// Features:
// - Crawler-specific rules
// - Rate limiting for aggressive bots
// - Sitemap references

import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
        crawlDelay: 1,
      },
      {
        userAgent: 'AhrefsBot',
        crawlDelay: 10,
      },
      {
        userAgent: 'SemrushBot',
        crawlDelay: 10,
      },
      {
        userAgent: 'Googlebot',
        allow: ['/', '/services/', '/locations/'],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: ['/gallery/', '/images/'],
      },
    ],
    sitemap: 'https://yourdomain.com/sitemap.xml',
  };
}
```

---

## **5. CONSTANTS & DATA FILES**

### A. constants/locations.ts
```typescript
// Purpose: Define all service locations with metadata
// Features:
// - Geo coordinates
// - Service areas
// - Priority weights

export const LOCATIONS = [
  {
    name: 'Location Name',
    slug: 'location-name',
    priority: 0.95,
    coordinates: { lat: XX.XXXX, lng: XX.XXXX },
    address: 'Street Address, City, State PIN',
    areas: ['Area 1', 'Area 2', 'Area 3'],
    state: 'State Name',
    country: 'India',
  },
  // ... more locations
];

export const getLocationBySlug = (slug: string) => {
  return LOCATIONS.find((loc) => loc.slug === slug);
};
```

### B. constants/contacts.ts
```typescript
// Purpose: Centralized contact information
// Features:
// - Phone numbers with WhatsApp support
// - Telephone schema ready

export const CONTACTS = {
  primary: '+91-XXXXX',
  secondary: '+91-XXXXX',
  whatsapp: 'https://wa.me/91XXXXXXXXXX',
  email: 'info@yourdomain.com',
  hours: '9 AM - 9 PM (All days)',
};
```

### C. constants/services.ts
```typescript
// Purpose: Define all services with metadata
// Features:
// - Service descriptions
// - Keywords per service
// - Featured images

export const SERVICES = [
  {
    id: 1,
    name: 'Service Name',
    slug: 'service-slug',
    category: 'Category',
    description: 'Service description',
    keywords: ['keyword1', 'keyword2'],
    image: 'https://yourdomain.com/service.jpg',
    priority: 0.9,
  },
  // ... more services
];
```

---

## **6. ROOT LAYOUT IMPLEMENTATION**

### A. app/layout.tsx (Global SEO Metadata)
```typescript
// Purpose: Set global SEO metadata for all pages
// Features:
// - Base metadata for all pages
// - Google Analytics integration
// - OpenGraph and Twitter configuration
// - Canonical URL setup
// - Verification tokens

import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  metadataBase: new URL('https://yourdomain.com'),
  title: {
    template: '%s | Your Company',
    default: 'Your Company – Premium Services Manufacturer in India',
  },
  description: 'Your detailed company description with keywords',
  keywords: [
    'keyword1',
    'keyword2',
    'location-specific keywords',
    // ... 20+ keywords
  ],
  authors: [{ name: 'Your Company', url: 'https://yourdomain.com' }],
  creator: 'Your Company',
  publisher: 'Your Company',
  formatDetection: {
    email: true,
    telephone: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://yourdomain.com',
    siteName: 'Your Company',
    title: 'Your Company – Premium Services',
    description: 'Your detailed company description',
    images: [
      {
        url: 'https://yourdomain.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Your Company',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Company',
    description: 'Your company description',
    images: ['https://yourdomain.com/og-image.jpg'],
    creator: '@yourhandle',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE',
  },
  alternates: {
    canonical: 'https://yourdomain.com/',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
            `,
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
```

---

## **7. DYNAMIC PAGE IMPLEMENTATIONS**

### A. app/services/[slug]/page.tsx (Service Pages)
```typescript
// Purpose: Generate dynamic service pages
// Features:
// - Dynamic metadata generation
// - Canonical URL handling
// - ETag caching
// - 404 error handling

import { Metadata, ResolvingMetadata } from 'next';
import { SERVICES } from '@/constants/services';
import { generateServiceMetadata } from '@/lib/seo-metadata';
import { getCanonicalUrl } from '@/lib/canonical-url';
import { generateETag } from '@/lib/etag-utils';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  const metadata = generateServiceMetadata(service.name, 'All Locations', service.description);

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    openGraph: metadata.openGraph,
    twitter: metadata.twitter,
    alternates: {
      canonical: getCanonicalUrl(`/services/${slug}/`),
    },
  };
}

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return <div>Service not found</div>;
  }

  const eTag = generateETag(JSON.stringify(service));

  return (
    <div>
      <h1>{service.name}</h1>
      <p>{service.description}</p>
      {/* Page content */}
    </div>
  );
}
```

### B. app/services/[slug]/[location]/page.tsx (Service + Location)
```typescript
// Purpose: Generate service+location dynamic pages
// Features:
// - Double dynamic routing
// - Location-specific keyword generation
// - Static param pre-generation

import { Metadata, ResolvingMetadata } from 'next';
import { SERVICES } from '@/constants/services';
import { LOCATIONS } from '@/constants/locations';
import { generateLocationKeywords } from '@/lib/seo-metadata';
import { getCanonicalUrl } from '@/lib/canonical-url';

interface Props {
  params: Promise<{ slug: string; location: string }>;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug, location } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  const loc = LOCATIONS.find((l) => l.slug === location);

  if (!service || !loc) {
    return { title: 'Not Found' };
  }

  const keywords = generateLocationKeywords(service.name, loc.name);
  const title = `${service.name} in ${loc.name} | Your Company`;
  const description = `Professional ${service.name} services in ${loc.name}. Serving ${loc.areas.join(', ')}. 15-year warranty.`;

  return {
    title,
    description,
    keywords: keywords.slice(0, 15).join(', '),
    openGraph: {
      title,
      description,
      url: getCanonicalUrl(`/services/${slug}/${location}/`),
    },
    alternates: {
      canonical: getCanonicalUrl(`/services/${slug}/${location}/`),
    },
  };
}

export async function generateStaticParams() {
  const params = [];
  for (const service of SERVICES) {
    for (const location of LOCATIONS) {
      params.push({
        slug: service.slug,
        location: location.slug,
      });
    }
  }
  return params;
}

export default async function ServiceLocationPage({ params }: Props) {
  const { slug, location } = await params;
  // Page implementation
}
```

---

## **8. IMAGE OPTIMIZATION SCRIPTS**

### A. scripts/optimize-images.ts
```typescript
// Purpose: Optimize images to WebP/AVIF formats
// Features:
// - Responsive image sizes
// - Format conversion
// - Automatic backup

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const SIZES = [320, 640, 768, 1024, 1280, 1920, 2560];
const IMAGE_DIR = path.join(process.cwd(), 'public/images');
const BACKUP_DIR = path.join(IMAGE_DIR, '.original-backup');

async function optimizeImages() {
  if (!fs.existsSync(IMAGE_DIR)) return;

  const files = fs.readdirSync(IMAGE_DIR);

  for (const file of files) {
    const filePath = path.join(IMAGE_DIR, file);
    if (!fs.statSync(filePath).isFile()) continue;

    const ext = path.extname(file).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;

    // Backup original
    if (!fs.existsSync(BACKUP_DIR)) {
      fs.mkdirSync(BACKUP_DIR, { recursive: true });
    }
    fs.copyFileSync(filePath, path.join(BACKUP_DIR, file));

    // Generate responsive sizes
    for (const size of SIZES) {
      await sharp(filePath)
        .resize(size, size, { fit: 'cover' })
        .webp({ quality: 80 })
        .toFile(
          path.join(
            IMAGE_DIR,
            'optimized',
            `${path.basename(file, ext)}-${size}w.webp`
          )
        );
    }
  }
}

optimizeImages().catch(console.error);
```

### B. image-loader.ts
```typescript
// Purpose: Custom image loader for static export
// Features:
// - Unoptimized mode for static export
// - URL normalization

export default function imageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  return `${src}?w=${width}&q=${quality || 75}`;
}
```

---

## **9. SCRIPT AUTOMATION**

### A. scripts/generate-static-sitemaps.js
```javascript
// Purpose: Generate XML sitemaps after build
// Features:
// - Sitemap index creation
// - Automatic file generation

const fs = require('fs');
const path = require('path');

function generateSitemapIndex() {
  const sitemaps = [
    'sitemap.xml',
    'sitemap-services.xml',
    'sitemap-images.xml',
    'sitemap-hreflang.xml',
  ];

  const index = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps
  .map(
    (sitemap) => `  <sitemap>
    <loc>https://yourdomain.com/${sitemap}</loc>
  </sitemap>`
  )
  .join('\n')}
</sitemapindex>`;

  fs.writeFileSync(path.join(process.cwd(), 'public/sitemap_index.xml'), index);
}

generateSitemapIndex();
```

### B. scripts/generate-hreflang-sitemap.js
```javascript
// Purpose: Generate hreflang sitemap for multi-language support
// Features:
// - Language variants (en, hi, te, ta, kn)
// - x-default fallback

const fs = require('fs');
const path = require('path');

function generateHreflangSitemap() {
  const languages = ['en', 'hi', 'te', 'ta', 'kn'];
  const baseUrl = 'https://yourdomain.com';

  const pages = [
    '/',
    '/services/',
    '/about/',
    '/contact/',
    '/gallery/',
  ];

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  pages.forEach((page) => {
    sitemap += `\n  <url>\n    <loc>${baseUrl}${page}</loc>`;

    languages.forEach((lang) => {
      sitemap += `\n    <xhtml:link rel="alternate" hreflang="${lang}" href="${baseUrl}/${lang}${page}" />`;
    });

    sitemap += `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${page}" />\n  </url>`;
  });

  sitemap += '\n</urlset>';

  fs.writeFileSync(path.join(process.cwd(), 'public/sitemap-hreflang.xml'), sitemap);
}

generateHreflangSitemap();
```

---

## **10. IMPLEMENTATION CHECKLIST**

### Phase 1: Setup
- [ ] Create project structure with all folders
- [ ] Install dependencies (next, react, typescript)
- [ ] Configure next.config.ts with image optimization
- [ ] Set up tsconfig.json and tailwind.config.js

### Phase 2: Core SEO Files
- [ ] Create lib/canonical-url.ts
- [ ] Create lib/seo-metadata.ts with keyword generation
- [ ] Create lib/organization-schema.ts
- [ ] Create lib/service-schema.ts
- [ ] Create lib/faq-schema.ts
- [ ] Create lib/url-utils.ts and lib/etag-utils.ts
- [ ] Create lib/searchData.ts

### Phase 3: Constants & Data
- [ ] Create constants/locations.ts
- [ ] Create constants/contacts.ts
- [ ] Create constants/services.ts
- [ ] Define all services with metadata
- [ ] Define all locations with coordinates

### Phase 4: Sitemap Generation
- [ ] Create app/sitemap.ts
- [ ] Create app/sitemap-services.ts
- [ ] Create app/sitemap-images.ts
- [ ] Create app/robots.ts

### Phase 5: Scripts & Automation
- [ ] Create scripts/optimize-images.ts
- [ ] Create scripts/generate-static-sitemaps.js
- [ ] Create scripts/generate-hreflang-sitemap.js
- [ ] Create scripts/post-build.js
- [ ] Create image-loader.ts
- [ ] Update package.json with build scripts

### Phase 6: Layout & Pages
- [ ] Configure app/layout.tsx with global metadata
- [ ] Create app/page.tsx (homepage) with schema
- [ ] Create service listing page
- [ ] Create app/services/[slug]/page.tsx
- [ ] Create app/services/[slug]/[location]/page.tsx
- [ ] Create app/locations/[location]/page.tsx
- [ ] Create supporting pages (about, contact, gallery)

### Phase 7: Components
- [ ] Create components/layout/Header.tsx with navigation
- [ ] Create components/layout/Footer.tsx with links
- [ ] Create MainLayout wrapper
- [ ] Add structured data in component heads

### Phase 8: Testing & Validation
- [ ] Test sitemap generation
- [ ] Validate robots.txt
- [ ] Check canonical URLs in browser
- [ ] Test dynamic metadata generation
- [ ] Verify schema.org in Google Rich Results
- [ ] Test responsive images
- [ ] Verify Open Graph tags

### Phase 9: Deployment
- [ ] Set environment variables (GA_ID, etc.)
- [ ] Run prebuild and postbuild scripts
- [ ] Submit sitemaps to Google Search Console
- [ ] Submit to Bing Webmaster Tools
- [ ] Monitor crawl errors
- [ ] Track rankings and impressions

---

## **11. BEST PRACTICES SUMMARY**

### On-Page SEO
- ✅ Unique titles (50-60 chars) for every page
- ✅ Meta descriptions (150-160 chars) with keywords
- ✅ H1 tags with primary keyword
- ✅ Semantic HTML structure
- ✅ Internal linking strategy
- ✅ Keyword density 1-3%

### Technical SEO
- ✅ Trailing slash consistency
- ✅ Canonical URLs on all pages
- ✅ Mobile responsiveness
- ✅ Fast page load (image optimization)
- ✅ Robots.txt with crawler rules
- ✅ Sitemap submission
- ✅ Structured data markup

### Schema Implementation
- ✅ Organization schema on homepage
- ✅ LocalBusiness schema for locations
- ✅ Product/Service schema on service pages
- ✅ FAQ schema for featured snippets
- ✅ Breadcrumb schema for navigation
- ✅ WebSite schema with search action
- ✅ Review/Rating schema

### Multi-Location/Language
- ✅ Location-specific keywords (100+ variations)
- ✅ Hreflang tags for language variants
- ✅ Geo-targeted content
- ✅ Local address and contact info
- ✅ Service area coverage

### Image Optimization
- ✅ WebP format conversion
- ✅ Responsive image sizes (320-2560px)
- ✅ Image compression (80% quality)
- ✅ Descriptive alt text
- ✅ Image sitemaps
- ✅ Lazy loading

### Analytics & Monitoring
- ✅ Google Analytics 4 integration
- ✅ Google Search Console setup
- ✅ Conversion tracking
- ✅ User behavior analysis
- ✅ Ranking monitoring
- ✅ Error monitoring

---

## **12. ENVIRONMENT VARIABLES**

```bash
# .env.local
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_DOMAIN=https://yourdomain.com
NEXT_PUBLIC_GOOGLE_VERIFICATION=YOUR_VERIFICATION_CODE
GOOGLE_SEARCH_CONSOLE_TOKEN=YOUR_TOKEN
```

---

## **13. DEPLOYMENT COMMANDS**

```bash
# Development
npm run dev

# Build with SEO optimization
npm run build

# Just optimize images
npm run optimize:images

# Generate sitemaps
npm run generate:sitemaps
npm run generate:hreflang

# Production
npm start
```

---

## **14. MONITORING & MAINTENANCE**

### Weekly
- [ ] Check Google Search Console for errors
- [ ] Monitor top pages for ranking changes
- [ ] Check Core Web Vitals

### Monthly
- [ ] Review analytics for traffic sources
- [ ] Check for crawl errors
- [ ] Update reviews and ratings in schema
- [ ] Verify sitemap freshness

### Quarterly
- [ ] Audit keyword rankings
- [ ] Review competitor strategy
- [ ] Update content for seasonality
- [ ] Refresh image optimization

---

## **QUICK START PROMPT FOR NEW PROJECTS**

Use this as a prompt when setting up SEO for a new Next.js project:

---

> "I need to implement enterprise-grade SEO for a Next.js project. Please implement:
>
> 1. **Core SEO Utilities**: Canonical URLs, dynamic metadata generation with 100+ location-specific keywords, JSON-LD schemas (Organization, LocalBusiness, Product, Service, FAQ, Breadcrumb, WebSite)
>
> 2. **Configuration**: next.config.ts with WebP image optimization and trailing slashes, next-sitemap-config.js with priority hierarchy
>
> 3. **Sitemaps**: 4 sitemaps (static pages, services+locations, images with metadata, hreflang for 5 languages)
>
> 4. **Dynamic Pages**: Service pages [slug], Location pages [location], and Service+Location pages [slug]/[location] with proper static generation
>
> 5. **Global Metadata**: Root layout with Organization schema, GA4 integration, OpenGraph/Twitter cards, Google verification
>
> 6. **Image Optimization**: Script to convert images to WebP with responsive sizes (320-2560px)
>
> 7. **Automation Scripts**: Post-build scripts for sitemap generation, hreflang generation, image optimization
>
> 8. **Multi-Location/Language**: Location constants with coordinates, language-specific hreflang tags
>
> 9. **Constants & Data**: Services list, locations list, contact info, FAQ data
>
> 10. **Best Practices**: Trailing slash enforcement, dynamic canonical URLs, proper heading hierarchy, internal linking, ETag caching, robots.txt with crawler rules
>
> Structure everything following production best practices with proper TypeScript typing."

---

This template provides a complete, copy-paste ready implementation guide for enterprise-grade SEO in Next.js projects.
