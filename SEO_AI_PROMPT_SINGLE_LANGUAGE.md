# SEO IMPLEMENTATION AI PROMPT (SINGLE LANGUAGE)

## **Ready-to-Use Prompt for AI Assistants**

Copy and paste this prompt into Claude, ChatGPT, or any AI assistant to implement enterprise-grade SEO for a new Next.js project. This version focuses on single-language, multi-location optimization without hreflang implementation.

---

```
I need to implement enterprise-grade SEO for a Next.js project. Please implement:

1. **Core SEO Utilities**: Canonical URLs, dynamic metadata generation with 100+ location-specific keywords, JSON-LD schemas (Organization, LocalBusiness, Product, Service, FAQ, Breadcrumb, WebSite)

2. **Configuration**: next.config.ts with WebP image optimization and trailing slashes, next-sitemap-config.js with priority hierarchy

3. **Sitemaps**: 3 sitemaps (static pages, services+locations, images with metadata)

4. **Dynamic Pages**: Service pages [slug], Location pages [location], and Service+Location pages [slug]/[location] with proper static generation

5. **Global Metadata**: Root layout with Organization schema, GA4 integration, OpenGraph/Twitter cards, Google verification

6. **Image Optimization**: Script to convert images to WebP with responsive sizes (320-2560px)

7. **Automation Scripts**: Post-build scripts for sitemap generation and image optimization

8. **Multi-Location Optimization**: Location constants with coordinates, location-specific keyword generation, area-served metadata

9. **Constants & Data**: Services list, locations list, contact info, FAQ data

10. **Best Practices**: Trailing slash enforcement, dynamic canonical URLs, proper heading hierarchy, internal linking, ETag caching, robots.txt with crawler rules

Structure everything following production best practices with proper TypeScript typing.
```

---

## **What This Prompt Implements**

### ✅ Included Features
- Enterprise-grade SEO for multi-location businesses
- 3 automated sitemaps (main, services+locations, images)
- Dynamic metadata generation with 100+ keyword variations
- 7 structured data schemas (Organization, LocalBusiness, Product, Service, FAQ, Breadcrumb, WebSite)
- Google Analytics 4 integration
- Image optimization (WebP format, responsive sizes)
- ETag-based caching
- Robots.txt with crawler rules
- Canonical URL enforcement
- OpenGraph & Twitter card support

### ❌ Removed Features (from full version)
- ~~Hreflang sitemaps for multiple languages~~
- ~~Language variant generation scripts~~
- ~~Multi-language metadata support~~
- ~~x-default language fallback tags~~

---

## **Use Case**

**Perfect for:**
- Single-language websites (English, Spanish, etc.)
- Local service businesses targeting one region in one language
- E-commerce sites in one language
- Corporate websites with single language support
- Any project where language variants aren't needed

**Not ideal for:**
- Multi-language websites (use the full template with hreflang)
- International SEO campaigns
- Websites serving multiple countries with language variants

---

## **Key Differences from Full Version**

| Aspect | Full Version | This Version |
|--------|--------------|--------------|
| **Sitemaps** | 4 (main, services, images, hreflang) | 3 (main, services, images) |
| **Language Support** | 5 languages with hreflang | Single language only |
| **Hreflang Tags** | Yes (language variants) | No |
| **Localization** | Location + language combinations | Location only |
| **Complexity** | Higher (multi-language logic) | Lower (simpler implementation) |
| **Setup Time** | ~2-3 days | ~1-2 days |
| **Maintenance** | Higher (manage language variants) | Lower (single language) |

---

## **After Receiving Implementation**

Once the AI generates the code:

1. **Replace** the project's `lib/`, `scripts/`, `constants/`, and `app/` directories
2. **Configure** your base URL and company information
3. **Update** location data in `constants/locations.ts`
4. **Define** services in `constants/services.ts`
5. **Add** Google Analytics ID to environment variables
6. **Run** `npm run build` to generate sitemaps
7. **Submit** sitemaps to Google Search Console

---

## **Environment Variables Needed**

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_DOMAIN=https://yourdomain.com
NEXT_PUBLIC_GOOGLE_VERIFICATION=YOUR_VERIFICATION_CODE
```

---

## **Build & Deploy**

```bash
# Development
npm run dev

# Production build with SEO optimization
npm run build

# The build will automatically:
# - Optimize images to WebP
# - Generate XML sitemaps
# - Update robots.txt
```

---

## **Verification Checklist**

After implementation, verify:

- [ ] Sitemaps generated in `/public/` (sitemap.xml, sitemap-services.xml, sitemap-images.xml)
- [ ] Robots.txt updated with sitemap reference
- [ ] Canonical URLs include trailing slashes
- [ ] Meta tags present on all pages
- [ ] Open Graph tags configured
- [ ] Twitter card tags configured
- [ ] Schema.org JSON-LD visible in page source
- [ ] Images converted to WebP format
- [ ] Trailing slashes enforced on all routes
- [ ] GA4 tracking script loads

---

## **Next Steps**

1. Copy the prompt above
2. Paste into your AI assistant
3. Wait for code generation
4. Follow the post-implementation checklist
5. Deploy and submit sitemaps to search engines

---

**This is a production-ready, simplified version optimized for single-language, multi-location websites.**
