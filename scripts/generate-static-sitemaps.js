const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Google ignores <lastmod> when it is obviously untrue. Stamping "now" on every
// URL on every build is exactly that, so derive the date from the last commit
// that touched the file the page is built from. Falls back to build time when
// git history is unavailable (e.g. a shallow CI clone).
const BUILD_TIME = new Date().toISOString();
const lastmodCache = new Map();
function lastmodFor(file) {
  if (lastmodCache.has(file)) return lastmodCache.get(file);
  let value = BUILD_TIME;
  try {
    const out = execSync(`git log -1 --format=%cI -- "${file}"`, {
      stdio: ['ignore', 'pipe', 'ignore'],
    }).toString().trim();
    if (out) value = out;
  } catch {
    // no git, shallow clone, or file untracked - keep the build time
  }
  lastmodCache.set(file, value);
  return value;
}

// Every service and service+location URL is generated from servicesData.ts;
// location URLs from constants/locations.ts.
const SERVICES_LASTMOD = () => lastmodFor('data/servicesData.ts');
const LOCATIONS_LASTMOD = () => lastmodFor('constants/locations.ts');
const servicesDataPath = path.join(process.cwd(), 'data', 'servicesData.ts');
const locationsPath = path.join(process.cwd(), 'constants', 'locations.ts');

// Read and parse the TypeScript file
const servicesDataContent = fs.readFileSync(servicesDataPath, 'utf8');

// Extract the servicesData object using regex
const servicesDataMatch = servicesDataContent.match(/export const servicesData = ({[\s\S]*?});/);
if (!servicesDataMatch) {
  throw new Error('Could not find servicesData in the file');
}

// Evaluate the servicesData object
const servicesData = eval('(' + servicesDataMatch[1] + ')');

// Slugs that only exist as redirect/alias targets. They resolve to another
// service and emit that service's canonical, so they must never be listed as
// their own sitemap URL.
const aliasMatch = servicesDataContent.match(/export const SERVICE_SLUG_ALIASES: Record<string, string> = ({[\s\S]*?});/);
const SERVICE_SLUG_ALIASES = aliasMatch ? eval('(' + aliasMatch[1] + ')') : {};
const isCanonicalSlug = slug => !(slug in SERVICE_SLUG_ALIASES);

const BASE_URL = 'https://invisiblegrillsandsafetynets.in';

// Read the location order from the single source of truth so the sitemap can
// never drift from constants/locations.ts (first entry = primary focus city).
const locationsContent = fs.readFileSync(locationsPath, 'utf8');
const locationsMatch = locationsContent.match(/export const validLocations = (\[[\s\S]*?\]) as const;/);
if (!locationsMatch) {
  throw new Error('Could not find validLocations in constants/locations.ts');
}
const LOCATIONS = eval(locationsMatch[1]);
const PRIMARY_LOCATION = LOCATIONS[0];

const SERVICE_SLUGS = Object.keys(servicesData).filter(isCanonicalSlug);

// Services that lead the category pages and carry the strongest commercial
// intent. Everything else still ships, one priority step lower.
const MAIN_CATEGORY_SERVICES = [
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
const isMainService = slug => MAIN_CATEGORY_SERVICES.includes(slug);

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function urlEntry(page, lastmod) {
  return `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
}

function generateSitemap() {

  const mainPages = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/services/', priority: '0.9', changefreq: 'daily' },
    { url: '/gallery/', priority: '0.8', changefreq: 'weekly' },
    { url: '/contact/', priority: '0.8', changefreq: 'monthly' },
    { url: '/about/', priority: '0.7', changefreq: 'monthly' },
    // Legal pages: indexable but low value, and previously missing entirely.
    { url: '/privacy-policy/', priority: '0.2', changefreq: 'yearly' },
    { url: '/terms-of-service/', priority: '0.2', changefreq: 'yearly' },
  ];

  // The primary focus city outranks the other service cities.
  const locationPages = LOCATIONS.map(loc => ({
    url: `/locations/${loc}/`,
    priority: loc === PRIMARY_LOCATION ? '0.95' : '0.9',
    changefreq: 'weekly'
  }));

  const servicePages = SERVICE_SLUGS.map(slug => ({
    url: `/services/${slug}/`,
    priority: isMainService(slug) ? '0.9' : '0.8',
    changefreq: 'weekly'
  }));

  const serviceLocationPages = SERVICE_SLUGS.flatMap(slug =>
    LOCATIONS.map(loc => ({
      url: `/services/${slug}/${loc}/`,
      priority: isMainService(slug) ? '0.85' : '0.75',
      changefreq: 'weekly'
    }))
  );

  const allPages = [
    ...mainPages.map(p => ({ ...p, lastmod: lastmodFor(`app${p.url === '/' ? '' : p.url.replace(/\/$/, '')}/page.tsx`) })),
    ...locationPages.map(p => ({ ...p, lastmod: LOCATIONS_LASTMOD() })),
    ...servicePages.map(p => ({ ...p, lastmod: SERVICES_LASTMOD() })),
    ...serviceLocationPages.map(p => ({ ...p, lastmod: SERVICES_LASTMOD() })),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => urlEntry(page, page.lastmod)).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(process.cwd(), 'out', 'sitemap.xml'), sitemap);
  console.log(`✅ sitemap.xml written (${allPages.length} URLs)`);
}

function generateImageSitemap() {
  const entries = SERVICE_SLUGS.map(slug => {
    const service = servicesData[slug];
    return {
      url: `${BASE_URL}/services/${slug}/`,
      images: [
        {
          loc: `${BASE_URL}${service.image}`,
          title: service.title,
          caption: service.description
        },
        ...(service.images || [])
          .filter(img => img !== service.image)
          .map(img => ({
            loc: `${BASE_URL}${img}`,
            title: `${service.title} - Installation Example`
          }))
      ]
    };
  });

  const imageSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries.map(entry => `  <url>
    <loc>${entry.url}</loc>
${entry.images.map(img => `    <image:image>
      <image:loc>${img.loc}</image:loc>
      <image:title>${escapeXml(img.title)}</image:title>
      ${img.caption ? `<image:caption>${escapeXml(img.caption)}</image:caption>` : ''}
    </image:image>`).join('\n')}
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(process.cwd(), 'out', 'sitemap-images.xml'), imageSitemap);
  console.log(`✅ sitemap-images.xml written (${entries.length} URLs)`);
}

function generateServicesSitemap() {
  const lastmod = SERVICES_LASTMOD();
  const entries = SERVICE_SLUGS.flatMap(slug => [
    { url: `${BASE_URL}/services/${slug}/`, priority: isMainService(slug) ? 0.9 : 0.8 },
    ...LOCATIONS.map(location => ({
      url: `${BASE_URL}/services/${slug}/${location}/`,
      priority: isMainService(slug) ? 0.85 : 0.75
    }))
  ]);

  const servicesSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(entry => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(process.cwd(), 'out', 'sitemap-services.xml'), servicesSitemap);
  console.log(`✅ sitemap-services.xml written (${entries.length} URLs)`);
}

// Generate all sitemaps
generateSitemap();
generateImageSitemap();
generateServicesSitemap();

// Sitemap index.
//
// Note: there is deliberately no hreflang sitemap. The site is published in a
// single language (en-IN); the previous one declared hi/te/ta/kn alternates that
// all pointed at the same English URL, which Google discards as invalid.
const sitemapIndexLastmod = [SERVICES_LASTMOD(), LOCATIONS_LASTMOD()].sort().pop();
const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE_URL}/sitemap.xml</loc>
    <lastmod>${sitemapIndexLastmod}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-services.xml</loc>
    <lastmod>${sitemapIndexLastmod}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-images.xml</loc>
    <lastmod>${sitemapIndexLastmod}</lastmod>
  </sitemap>
</sitemapindex>`;

fs.writeFileSync(path.join(process.cwd(), 'out', 'sitemap-index.xml'), sitemapIndex);
console.log('✅ sitemap-index.xml written');
