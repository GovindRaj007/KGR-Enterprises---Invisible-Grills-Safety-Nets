// Neighbourhood landing page, e.g. /invisible-grills/bangalore/whitefield/
// targeting "invisible grills in Whitefield" and "invisible grills near me"
// searches made from that area. Only generated for AREA_PAGE_SERVICES.

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Phone, ArrowRight, MapPin, Star, Building, IndianRupee, CheckCircle2 } from 'lucide-react';

import OptimizedImage from '@/components/shared/OptimizedImage';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import HeroWithHeaderWrapper from '@/components/layout/HeroWithHeaderWrapper';
import { servicesData, resolveServiceSlug, getServiceRoute, getServiceUrlSlug } from '@/data/servicesData';
import { PRIMARY } from '@/constants/contacts';
import { locationData, validLocations, type LocationSlug } from '@/constants/locations';
import {
  AREA_PAGE_SERVICES,
  findServiceArea,
  getServiceAreas,
  slugifyArea,
} from '@/constants/service-areas';
import { getCanonicalUrl } from '@/lib/canonical-url';
import { generateBreadcrumbSchema, clampSnippet, withBrand } from '@/lib/seo-metadata';
import {
  INVISIBLE_GRILL_PRICE,
  BUSINESS_FACTS,
  areaIntro,
  buildLocalFaqs,
  fitTitle,
} from '@/lib/local-seo-content';
import {
  GrillPriceAndSpecs,
  GrillComparison,
  InstallProcess,
  NearMeAreas,
  LocalFAQ,
  faqPageSchema,
} from '@/components/location/LocalSeoSections';

export const dynamicParams = false;

type Params = { slug: string; location: string; area: string };

export function generateStaticParams(): Params[] {
  return AREA_PAGE_SERVICES.flatMap(slug =>
    validLocations.flatMap(location =>
      getServiceAreas(location).map(area => ({ slug: getServiceUrlSlug(slug), location, area: slugifyArea(area.name) }))
    )
  );
}

function resolve(params: Params) {
  const { slug, location, area: areaSlug } = params;
  const serviceId = resolveServiceSlug(slug);
  if (!serviceId || !AREA_PAGE_SERVICES.includes(serviceId)) return null;
  const service = servicesData[serviceId as keyof typeof servicesData];
  if (!service || !validLocations.includes(location as LocationSlug)) return null;
  const area = findServiceArea(location, areaSlug);
  if (!area) return null;
  const city = locationData[location as LocationSlug];
  return { service, area, city, citySlug: location as LocationSlug, areaSlug };
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const resolved = resolve(await params);
  if (!resolved) return {};
  const { service, area, city, citySlug, areaSlug } = resolved;
  const { from } = INVISIBLE_GRILL_PRICE;
  const lower = service.title.toLowerCase();

  const title = fitTitle([
    `${service.title} in ${area.name}, ${city.name} | From ₹${from}/sq ft`,
    `${service.title} in ${area.name} | From ₹${from}/sq ft | KGR`,
    `${service.title} in ${area.name}, ${city.name}`,
    withBrand(`${service.title} in ${area.name}`),
  ]);
  const description = clampSnippet(
    `${service.title} in ${area.name}, ${city.name} from ₹${from}/sq ft. SS316 marine-grade, child & pet safe, 15-yr warranty. Free site visit near you in ${area.name}.`
  );
  const path = getServiceRoute(service.id, citySlug, areaSlug);

  return {
    title,
    description,
    keywords: [
      `${lower} in ${area.name}`,
      `${lower} ${area.name}`,
      `${lower} in ${area.name} ${city.name}`,
      `${lower} near me`,
      `${lower} near ${area.name}`,
      `${lower} price in ${area.name}`,
      `${lower} in ${city.name}`,
      ...area.nearby.map(n => `${lower} in ${n}`),
    ].join(', '),
    alternates: { canonical: getCanonicalUrl(path) },
    openGraph: {
      title,
      description,
      url: getCanonicalUrl(path),
      siteName: 'KGR Invisible Grills & Safety Nets',
      images: [{ url: service.image, width: 1200, height: 630, alt: `${service.title} in ${area.name}, ${city.name}` }],
      type: 'article',
      locale: 'en-IN',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: '@Kgr_Grills_Nets',
      creator: '@Kgr_Grills_Nets',
      images: [service.image],
    },
    robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  };
}

export default async function ServiceAreaPage({ params }: { params: Promise<Params> }) {
  const resolved = resolve(await params);
  if (!resolved) notFound();
  const { service, area, city, citySlug, areaSlug } = resolved;
  const { from, to } = INVISIBLE_GRILL_PRICE;
  const lower = service.title.toLowerCase();

  const baseUrl = 'https://invisiblegrillsandsafetynets.in';
  const cityPath = getServiceRoute(service.id, citySlug);
  const path = `${cityPath}${areaSlug}/`;
  const pageUrl = `${baseUrl}${path}`;

  const cityAreas = getServiceAreas(citySlug);
  const areaHref = (name: string) =>
    cityAreas.some(a => a.name === name) ? `${cityPath}${slugifyArea(name)}/` : undefined;

  // Nearby areas first (they matter most to someone in this area), then the
  // rest of the city.
  const nearbyFirst = [
    ...area.nearby,
    ...cityAreas.map(a => a.name).filter(n => n !== area.name && !area.nearby.includes(n)),
  ];
  const areaLinks = nearbyFirst.map(name => ({ name, href: areaHref(name) }));
  const otherCities = validLocations
    .filter(loc => loc !== citySlug)
    .map(loc => ({ name: locationData[loc].name, href: getServiceRoute(service.id, loc) }));

  const faqs = buildLocalFaqs({
    service,
    place: area.name,
    city: city.name,
    citySlug,
    areasSample: [area.name, ...area.nearby],
  });

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: `${service.title} in ${area.name}, ${city.name}`,
        serviceType: `${service.title} Installation`,
        description: `Professional ${lower} installation in ${area.name}, ${city.name} using SS316 marine-grade stainless steel cable. From ₹${from} per sq ft with free site inspection.`,
        image: `${baseUrl}${service.image}`,
        url: pageUrl,
        provider: {
          '@type': 'LocalBusiness',
          '@id': `${baseUrl}#organization`,
          name: 'KGR Enterprises',
          telephone: PRIMARY.phone,
          url: baseUrl,
          image: `${baseUrl}/logo.png`,
          priceRange: '₹₹',
          address: {
            '@type': 'PostalAddress',
            streetAddress: city.streetAddress,
            addressLocality: city.name,
            addressRegion: city.state,
            postalCode: city.postalCode,
            addressCountry: 'IN',
          },
          geo: { '@type': 'GeoCoordinates', latitude: city.latitude, longitude: city.longitude },
        },
        areaServed: {
          '@type': 'Place',
          name: area.name,
          containedInPlace: { '@type': 'City', name: city.name },
        },
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'INR',
          lowPrice: from,
          highPrice: to,
          offerCount: 2,
          availability: 'https://schema.org/InStock',
        },
      },
      faqPageSchema(faqs, pageUrl),
      generateBreadcrumbSchema(
        [
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services/' },
          { name: service.title, url: getServiceRoute(service.id) },
          { name: `${service.title} in ${city.name}`, url: cityPath },
          { name: `${service.title} in ${area.name}`, url: path },
        ],
        path
      ),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="min-h-screen bg-background">
        <HeroWithHeaderWrapper>
          <section className="relative overflow-hidden py-16 md:py-28" style={{ borderRadius: '1rem' }}>
            <div className="absolute inset-0">
              <OptimizedImage
                src={service.image}
                alt={`${service.title} installed on a balcony in ${area.name}, ${city.name}`}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[hsl(222,47%,8%,0.85)] via-[hsl(222,47%,10%,0.7)] to-[hsl(222,47%,10%,0.5)]" />
            </div>
            <div className="absolute inset-0 grid-pattern-dark opacity-30" />

            <div className="container relative z-10 mt-[-2rem]">
              <Breadcrumbs
                items={[
                  { label: 'Services', href: '/services' },
                  { label: service.title, href: getServiceRoute(service.id) },
                  { label: city.name, href: cityPath },
                  { label: area.name },
                ]}
                darkMode={true}
              />

              <div className="mx-auto max-w-4xl">
                <div className="mb-4 flex items-center gap-2 text-white/80">
                  <MapPin className="h-5 w-5" />
                  <span>{area.name}, {city.name}, {city.state}</span>
                </div>
                <h1 className="mb-6 font-heading text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                  {service.title} in {area.name}
                </h1>
                <p className="mb-8 text-lg text-white/85 md:text-xl">
                  Safe, stylish and rust-free balcony protection for homes and apartments in {area.name},{' '}
                  {city.name}. SS316 marine-grade invisible grills from ₹{from}/sq ft, installed by our local
                  team with a free site inspection.
                </p>
                <div className="mb-8 flex flex-col gap-4 sm:flex-row">
                  <Button size="lg" className="cta-gradient" asChild>
                    <Link href="/contact" className="flex items-center gap-2">
                      Get Free Inspection in {area.name} <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20" asChild>
                    <a href={`tel:${PRIMARY.phone}`} className="flex items-center gap-2">
                      <Phone className="h-5 w-5" /> {PRIMARY.display.trim()}
                    </a>
                  </Button>
                </div>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white">
                    <IndianRupee className="h-4 w-4 text-accent" />
                    From ₹{from}/sq ft, installation included
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    {BUSINESS_FACTS.rating} Rated
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white">
                    <Building className="h-4 w-4" />
                    {BUSINESS_FACTS.installations} Homes Secured
                  </div>
                </div>
              </div>
            </div>
          </section>
        </HeroWithHeaderWrapper>

        {/* Neighbourhood-specific intro */}
        <section className="section-bg-1 relative py-16 md:py-20">
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="container relative z-10">
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <h2 className="mb-6 font-heading text-3xl font-bold text-foreground md:text-4xl">
                  Invisible Grills Installers in {area.name}, {city.name}
                </h2>
                <p className="mb-4 text-foreground/90">{areaIntro(area.name, city.name, area.kind)}</p>
                <p className="mb-4 text-foreground/90">
                  {area.office
                    ? `Our ${city.name} office is right here in ${area.name}, so site visits and installations in and around ${area.name} are quick to schedule.`
                    : `Our ${city.name} team covers ${area.name} along with nearby ${area.nearby.join(', ')}, so site visits are quick to schedule.`}{' '}
                  If you are searching for invisible grills near me in {area.name}, call us for a free
                  measurement — we give a fixed written quote before any work starts.
                </p>
                <p className="text-foreground/90">
                  Looking for other parts of the city? See our{' '}
                  <Link href={cityPath} className="font-semibold text-accent underline-offset-2 hover:underline">
                    invisible grills in {city.name}
                  </Link>{' '}
                  page for city-wide pricing and coverage.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[hsl(222,47%,11%)] via-[hsl(217,33%,17%)] to-[hsl(215,25%,22%)] p-8 shadow-lg">
                <h3 className="mb-5 font-heading text-xl font-semibold text-white">
                  Benefits of Invisible Grills in {area.name}
                </h3>
                <ul className="space-y-3 text-white/85">
                  {[
                    'Rust-free SS316 marine-grade cable with nylon coating',
                    'Clear, uninterrupted balcony view',
                    'Keeps pigeons and birds out of the balcony',
                    'Child and pet safe — spacing set on site',
                    'Zero maintenance: no painting or polishing',
                    `Up to ${BUSINESS_FACTS.warrantyYears}-year warranty`,
                  ].map(item => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <GrillPriceAndSpecs place={area.name} citySlug={citySlug} specifications={service.specifications} />
        <GrillComparison place={area.name} />
        <InstallProcess serviceTitle={service.title} place={area.name} />
        <LocalFAQ faqs={faqs} serviceTitle={service.title} place={area.name} />
        <NearMeAreas serviceTitle={service.title} city={city.name} areaLinks={areaLinks} otherCities={otherCities} />

        <section className="section-bg-6 relative py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 font-heading text-3xl font-bold text-white md:text-4xl">
                Book Your Free Site Inspection in {area.name}
              </h2>
              <p className="mb-8 text-lg text-white/80">
                Modern, child-safe, rust-proof invisible grills across {area.name} with quick installation
                and transparent pricing.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" className="cta-gradient" asChild>
                  <Link href="/contact" className="flex items-center gap-2">
                    Schedule Free Visit <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20" asChild>
                  <a href={`tel:${PRIMARY.phone}`} className="flex items-center gap-2">
                    <Phone className="h-5 w-5" /> Call Now
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
