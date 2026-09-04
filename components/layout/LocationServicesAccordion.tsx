"use client";

import Link from "next/link";
import { PRIMARY_LOCATIONS } from "@/lib/seo-metadata";
import { validLocations } from "@/constants/locations";
import { servicesData, serviceCategories, getServiceLocationRoute } from "@/data/servicesData";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { MapPin, ArrowRight } from "lucide-react";

// Ordered by constants/locations.ts so the primary focus city leads.
const LOCATION_ORDER: string[] = [...validLocations];

// Derived from serviceCategories in servicesData.ts. This was previously a
// second, hand-maintained copy of the same map, and it had silently fallen
// behind: shade-nets, swimming-pool, car-parking and monkey-safety were
// missing, so none of their per-city pages were linked from anywhere.
const CATEGORIES = Object.entries(serviceCategories).map(([key, category]) => ({
  key,
  title: category.title,
  serviceIds: category.services,
}));

const locationMap = LOCATION_ORDER
  .map((slug) => {
    const item = PRIMARY_LOCATIONS.find((location) => location.name.toLowerCase() === slug);
    return item ? { ...item, slug } : null;
  })
  .filter(Boolean) as Array<typeof PRIMARY_LOCATIONS[number] & { slug: string }>;

const getServiceLabel = (serviceId: string, locationName: string) => {
  const service = servicesData[serviceId as keyof typeof servicesData];
  if (!service) return `${serviceId} in ${locationName}`;

  if (serviceId === "cloth-drying") {
    return `Ceiling Cloth Hangers in ${locationName}`;
  }

  if (serviceId === "invisible-grills-dealer") {
    return `Invisible Grills Dealer in ${locationName}`;
  }

  return `${service.title} in ${locationName}`;
};

const getLocationServiceLinks = (locationSlug: string, locationName: string) =>
  CATEGORIES.map((category) => ({
    ...category,
    services: category.serviceIds
      .map((id) => servicesData[id as keyof typeof servicesData])
      .filter(Boolean)
      .map((service) => ({
        id: service.id,
        title: getServiceLabel(service.id, locationName),
        href: getServiceLocationRoute(service.id, locationSlug),
      })),
  }));

interface LocationServicesAccordionProps {
  variant?: "footer" | "desktop" | "mobile";
  onLocationLinkClick?: () => void;
}

const variantStyles = {
  footer: {
    wrapper: "space-y-4",
    locationCard: "rounded-3xl border border-white/10 bg-slate-950/95 shadow-2xl",
    locationTrigger: "flex items-center justify-between gap-3 rounded-3xl px-5 py-4 text-left",
    locationTitle: "text-sm font-semibold text-white",
    locationState: "text-xs text-slate-400",
    categoryTrigger: "flex items-center justify-between px-4 py-3 text-left",
    categoryTitle: "text-sm font-semibold text-[#FF6B42]",
    categoryContent: "px-4 pb-4 pt-2",
    serviceGroup: "rounded-3xl overflow-hidden border border-slate-200/10 bg-white divide-y divide-slate-200/10",
    serviceItem: "flex items-center justify-between gap-3 px-4 py-3 transition-colors duration-200 bg-white hover:bg-slate-50",
    serviceText: "text-sm font-semibold text-slate-950",
    serviceIcon: "h-4 w-4 text-slate-950",
  },
  desktop: {
    wrapper: "space-y-4 py-2 max-h-[650px] overflow-y-auto",
    locationCard: "rounded-3xl border border-white/10 bg-slate-950/95 shadow-2xl",
    locationTrigger: "flex items-center justify-between gap-3 rounded-3xl px-4 py-4 text-left",
    locationTitle: "text-sm font-semibold text-white",
    locationState: "text-xs text-slate-400",
    categoryTrigger: "flex items-center justify-between px-4 py-3 text-left",
    categoryTitle: "text-sm font-semibold text-[#FF6B42]",
    categoryContent: "px-4 pb-4 pt-2",
    serviceGroup: "rounded-3xl overflow-hidden border border-slate-200/10 bg-white divide-y divide-slate-200/10",
    serviceItem: "flex items-center justify-between gap-3 px-4 py-3 transition-colors duration-200 bg-white hover:bg-slate-50",
    serviceText: "text-sm font-semibold text-slate-950",
    serviceIcon: "h-4 w-4 text-slate-950",
  },
  mobile: {
    wrapper: "space-y-4",
    locationCard: "rounded-3xl border border-slate-200 bg-slate-950/95 shadow-sm",
    locationTrigger: "flex items-center justify-between gap-3 rounded-3xl px-4 py-4 text-left",
    locationTitle: "text-base font-semibold text-white",
    locationState: "text-xs text-slate-400",
    categoryTrigger: "flex items-center justify-between px-4 py-3 text-left",
    categoryTitle: "text-sm font-semibold text-white",
    categoryContent: "px-4 pb-4 pt-2",
    serviceGroup: "rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 divide-y divide-slate-800",
    serviceItem: "flex items-center justify-between gap-3 px-4 py-3 transition-colors duration-200 bg-slate-950 hover:bg-slate-900",
    serviceText: "text-sm font-semibold text-white",
    serviceIcon: "h-4 w-4 text-[#FF6B42]",
  },
};

export default function LocationServicesAccordion({ variant = "footer", onLocationLinkClick }: LocationServicesAccordionProps) {
  const styles = variantStyles[variant];

  return (
    <div className={styles.wrapper}>
      <Accordion type="single" collapsible className="space-y-4">
        {locationMap.map((location) => (
          <AccordionItem key={location.slug} value={`location-${location.slug}`} className="border-none group">
            <div className={`${styles.locationCard} w-full max-w-[375px] min-w-0`}> 
              <AccordionTrigger className={styles.locationTrigger}>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-[#FF6B42] flex-shrink-0" />
                  <div>
                    <p className={styles.locationTitle}>{location.name}</p>
                    <p className={styles.locationState}>{location.state}</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-0">
                <div className="border-t border-white/10 px-0">
                  <Link
                    href={`/locations/${location.slug}/`}
                    prefetch={false}
                    onClick={onLocationLinkClick}
                    className={styles.serviceItem}
                  >
                    <span className={styles.serviceText}>
                      All services in {location.name}
                    </span>
                    <ArrowRight className={styles.serviceIcon} />
                  </Link>
                  <Accordion type="single" collapsible className="space-y-3">
                    {getLocationServiceLinks(location.slug, location.name).map((category) => (
                      <AccordionItem
                        key={category.key}
                        value={`${location.slug}-${category.key}`}
                        className="border-b last:border-none"
                      >
                        <AccordionTrigger className={styles.categoryTrigger}>
                          <span className={styles.categoryTitle}>{category.title}</span>
                        </AccordionTrigger>
                        <AccordionContent className={styles.categoryContent}>
                          <div className={styles.serviceGroup}>
                            {category.services.map((service, index) => (
                              <Link
                                key={service.id}
                                href={service.href}
                                prefetch={false}
                                onClick={onLocationLinkClick}
                                className={`${styles.serviceItem} ${index === category.services.length - 1 ? "" : ""}`}
                              >
                                <span className={styles.serviceText}>{service.title}</span>
                                <ArrowRight className={styles.serviceIcon} />
                              </Link>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </AccordionContent>
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
