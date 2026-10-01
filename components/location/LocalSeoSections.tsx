// Server-rendered local-SEO sections shared by the service + city pages and the
// service + neighbourhood pages. Everything here is plain HTML (no client
// state), so all of it — including FAQ answers — is in the crawled markup.

import Link from 'next/link';
import { CheckCircle2, MapPin, ArrowRight, IndianRupee, X } from 'lucide-react';
import {
  INVISIBLE_GRILL_PRICE,
  BUSINESS_FACTS,
  INSTALL_STEPS,
  GRILL_VS_IRON,
  GRILL_USES,
  CITY_MATERIAL_NOTE,
  type FAQ,
} from '@/lib/local-seo-content';

const cardClass =
  'rounded-2xl border border-white/10 bg-gradient-to-br from-[hsl(222,47%,11%)] via-[hsl(217,33%,17%)] to-[hsl(215,25%,22%)] shadow-lg';

type AreaLink = { name: string; href?: string };

type Props = {
  serviceTitle: string;
  isGrill: boolean;
  place: string;
  city: string;
  citySlug: string;
  specifications: Array<{ label: string; value: string }>;
  faqs: FAQ[];
  areaLinks: AreaLink[];
  otherCities: Array<{ name: string; href: string }>;
};

export function GrillPriceAndSpecs({ place, citySlug, specifications }: Pick<Props, 'place' | 'citySlug' | 'specifications'>) {
  const { from, to } = INVISIBLE_GRILL_PRICE;
  return (
    <section className="section-bg-4 relative py-16 md:py-20">
      <div className="container relative z-10">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 font-heading text-3xl font-bold text-foreground md:text-4xl">
              Invisible Grills Price in {place}
            </h2>
            <p className="mb-4 text-foreground/90">
              The cost of invisible grills in {place} starts from <strong>₹{from} per sq ft</strong> and
              usually falls between ₹{from} and ₹{to} per sq ft, installation included. What moves the
              price is the cable grade (SS304 or SS316), cable thickness, spacing between cables, the
              floor height and the total area to be covered.
            </p>
            <p className="mb-6 text-foreground/90">
              Invisible grills cost a little more than basic iron grills, but they never need painting,
              do not rust and last far longer — so over the life of the flat they work out cheaper. We
              measure on site and give a fixed written quote with no hidden charges.
            </p>
            <div className={`${cardClass} inline-flex items-center gap-4 p-5`}>
              <IndianRupee className="h-8 w-8 flex-shrink-0 text-accent" />
              <div>
                <p className="text-sm text-white/70">Starting from</p>
                <p className="text-2xl font-bold text-white">
                  ₹{from}/sq ft <span className="text-sm font-normal text-white/70">(installation included)</span>
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-4 font-heading text-2xl font-bold text-foreground md:text-3xl">
              What Are Invisible Grills?
            </h2>
            <p className="mb-4 text-foreground/90">
              Invisible grills are high-tensile stainless steel cables fixed vertically or horizontally
              across balconies and windows, held in powder-coated aluminium tracks. From a few feet away
              they almost disappear, so you keep the view, light and breeze while children and pets stay
              safe. {CITY_MATERIAL_NOTE[citySlug] ?? CITY_MATERIAL_NOTE.bangalore}
            </p>
            <div className={`${cardClass} p-6`}>
              <h3 className="mb-4 font-heading text-lg font-semibold text-white">Technical Specifications</h3>
              <dl className="space-y-3">
                {[...specifications, { label: 'Warranty', value: `Up to ${BUSINESS_FACTS.warrantyYears} years` }].map(spec => (
                  <div key={spec.label} className="flex justify-between gap-4 border-b border-white/10 pb-2 text-sm md:text-base">
                    <dt className="text-white/60">{spec.label}</dt>
                    <dd className="text-right font-medium text-white">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function GrillComparison({ place }: { place: string }) {
  return (
    <section className="relative bg-white py-16 md:py-20">
      <div className="container relative z-10">
        <h2 className="mb-4 text-center font-heading text-3xl font-bold text-gray-900 md:text-4xl">
          Invisible Grills vs Traditional Iron Grills
        </h2>
        <p className="mx-auto mb-10 max-w-3xl text-center text-gray-700">
          Why more homes in {place} are choosing invisible grills over conventional iron grills for their
          balconies and windows.
        </p>
        <div className="mx-auto max-w-4xl overflow-x-auto rounded-2xl border border-gray-200">
          <table className="w-full min-w-[520px] text-left text-sm md:text-base">
            <thead className="bg-gray-100 text-gray-900">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold"> </th>
                <th scope="col" className="px-4 py-3 font-semibold">Invisible Grills</th>
                <th scope="col" className="px-4 py-3 font-semibold">Iron Grills</th>
              </tr>
            </thead>
            <tbody>
              {GRILL_VS_IRON.map(row => (
                <tr key={row.label} className="border-t border-gray-200">
                  <th scope="row" className="px-4 py-3 font-medium text-gray-900">{row.label}</th>
                  <td className="px-4 py-3 text-gray-800">
                    <span className="inline-flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                      {row.grill}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    <span className="inline-flex items-start gap-2">
                      <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                      {row.iron}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mx-auto mt-12 max-w-4xl">
          <h3 className="mb-4 text-center font-heading text-2xl font-bold text-gray-900">
            Where Can Invisible Grills Be Installed?
          </h3>
          <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {GRILL_USES.map(use => (
              <li key={use} className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-gray-800">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-accent" />
                {use}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function InstallProcess({ serviceTitle, place }: { serviceTitle: string; place: string }) {
  return (
    <section className="section-bg-1 relative py-16 md:py-20">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="container relative z-10">
        <h2 className="mb-4 text-center font-heading text-3xl font-bold text-foreground md:text-4xl">
          Simple 5-Step {serviceTitle} Installation in {place}
        </h2>
        <p className="mx-auto mb-10 max-w-3xl text-center text-foreground/80">
          From the first call to the warranty handover, most homes in {place} are done within{' '}
          {BUSINESS_FACTS.installHours} hours of installation work.
        </p>
        <ol className="grid gap-4 md:grid-cols-5">
          {INSTALL_STEPS.map((step, i) => (
            <li key={step.title} className={`${cardClass} p-5`}>
              <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent font-bold text-white">
                {i + 1}
              </span>
              <h3 className="mb-2 font-heading text-base font-semibold text-white">{step.title}</h3>
              <p className="text-sm text-white/75">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function NearMeAreas({
  serviceTitle,
  city,
  areaLinks,
  otherCities,
}: Pick<Props, 'serviceTitle' | 'city' | 'areaLinks' | 'otherCities'>) {
  return (
    <section className="section-bg-3 relative py-16 md:py-20">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="container relative z-10">
        <h2 className="mb-4 text-center font-heading text-3xl font-bold text-foreground md:text-4xl">
          {serviceTitle} Near Me in {city}
        </h2>
        <p className="mx-auto mb-10 max-w-3xl text-center text-foreground/80">
          Searching for {serviceTitle.toLowerCase()} near you? Our {city} installation teams cover every
          major neighbourhood — pick your area for local details, or call us for a free site visit.
        </p>
        <ul className="mx-auto grid max-w-5xl grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {areaLinks.map(area => (
            <li key={area.name}>
              {area.href ? (
                <Link
                  href={area.href}
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white/90 transition hover:border-accent hover:text-accent"
                >
                  <MapPin className="h-4 w-4 flex-shrink-0 text-accent" />
                  {serviceTitle} in {area.name}
                </Link>
              ) : (
                <span className="flex items-center gap-2 px-3 py-2.5 text-sm text-white/85">
                  <MapPin className="h-4 w-4 flex-shrink-0 text-accent" />
                  {area.name}
                </span>
              )}
            </li>
          ))}
        </ul>

        {otherCities.length > 0 && (
          <div className="mx-auto mt-12 max-w-4xl text-center">
            <h3 className="mb-4 font-heading text-xl font-semibold text-foreground">
              {serviceTitle} in Other Cities
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {otherCities.map(c => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:border-accent hover:text-accent"
                >
                  {serviceTitle} in {c.name} <ArrowRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export function LocalFAQ({ faqs, serviceTitle, place }: { faqs: FAQ[]; serviceTitle: string; place: string }) {
  return (
    <section id="faq" className="relative bg-white py-16 md:py-20">
      <div className="container relative z-10">
        <h2 className="mx-auto mb-10 max-w-3xl text-center font-heading text-3xl font-bold text-gray-900 md:text-4xl">
          Frequently Asked Questions About {serviceTitle} in {place}
        </h2>
        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((faq, i) => (
            <details key={faq.question} className={`${cardClass} group overflow-hidden`} open={i === 0}>
              <summary className="cursor-pointer list-none px-5 py-4 font-heading font-semibold text-white marker:hidden">
                {faq.question}
              </summary>
              <p className="border-t border-white/10 bg-white/5 px-5 py-4 text-white/80">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// FAQPage JSON-LD built from the same list the page renders.
export function faqPageSchema(faqs: FAQ[], pageUrl: string) {
  return {
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
    inLanguage: 'en-IN',
  };
}
