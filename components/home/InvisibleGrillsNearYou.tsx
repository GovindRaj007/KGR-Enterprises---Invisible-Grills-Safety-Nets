// Home-page hub linking every city page and the busiest neighbourhood pages
// with descriptive anchors ("Invisible Grills in Whitefield"). This is the main
// internal-link path from the strongest page on the site to the local pages.

import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import { validLocations, locationData } from '@/constants/locations';
import { getServiceAreas, slugifyArea } from '@/constants/service-areas';
import { INVISIBLE_GRILL_PRICE } from '@/lib/local-seo-content';
import { getServiceRoute } from '@/data/servicesData';

const AREAS_PER_CITY = 8;

export default function InvisibleGrillsNearYou() {
  return (
    <section className="section-bg-3 relative py-16 md:py-20" aria-labelledby="grills-near-you">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="container relative z-10">
        <h2 id="grills-near-you" className="mb-4 text-center font-heading text-3xl font-bold text-foreground md:text-4xl">
          Invisible Grills Near You
        </h2>
        <p className="mx-auto mb-10 max-w-3xl text-center text-foreground/80">
          Looking for invisible grills in Bangalore, Hyderabad, Chennai or Andhra Pradesh? Our local teams
          install SS316 marine-grade invisible grills from ₹{INVISIBLE_GRILL_PRICE.from}/sq ft with a free
          site inspection. Choose your city or neighbourhood.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {validLocations.map(slug => {
            const city = locationData[slug];
            const areas = getServiceAreas(slug).slice(0, AREAS_PER_CITY);
            return (
              <div
                key={slug}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-[hsl(222,47%,11%)] via-[hsl(217,33%,17%)] to-[hsl(215,25%,22%)] p-6 shadow-lg"
              >
                <h3 className="mb-1 font-heading text-xl font-semibold text-white">
                  <Link href={getServiceRoute('invisible-grills', slug)} className="inline-flex items-center gap-2 hover:text-accent">
                    Invisible Grills in {city.name} <ArrowRight className="h-4 w-4 text-accent" />
                  </Link>
                </h3>
                <p className="mb-4 text-sm text-white/60">{city.state}</p>
                <ul className="mb-4 grid grid-cols-2 gap-x-3 gap-y-2">
                  {areas.map(area => (
                    <li key={area.name}>
                      <Link
                        href={getServiceRoute('invisible-grills', slug, slugifyArea(area.name))}
                        className="flex items-start gap-1.5 text-sm text-white/80 hover:text-accent"
                      >
                        <MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-accent" />
                        {area.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-x-4 gap-y-1 border-t border-white/10 pt-3 text-xs text-white/70">
                  <Link href={getServiceRoute('balcony-safety', slug)} className="hover:text-accent">
                    Balcony Safety Nets in {city.name}
                  </Link>
                  <Link href={getServiceRoute('pigeon-nets', slug)} className="hover:text-accent">
                    Pigeon Nets in {city.name}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
