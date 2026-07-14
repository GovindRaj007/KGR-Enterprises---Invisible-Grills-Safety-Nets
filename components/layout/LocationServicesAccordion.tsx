"use client";

import Link from "next/link";
import { PRIMARY_LOCATIONS } from "@/lib/seo-metadata";
import { servicesData, getServiceLocationRoute } from "@/data/servicesData";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { MapPin } from "lucide-react";

const LOCATION_ORDER = [
  "chennai",
  "bangalore",
  "hyderabad",
  "visakhapatnam",
  "vijayawada",
];

const CATEGORY_ORDER = [
  "invisible-grills",
  "safety-nets",
  "bird-protection",
  "sports",
  "cloth-hangers",
];

const CATEGORIES = [
  {
    key: "invisible-grills",
    title: "Invisible Grills",
    serviceIds: ["invisible-grills", "invisible-grills-balcony", "invisible-grills-dealer"],
  },
  {
    key: "safety-nets",
    title: "Safety Nets",
    serviceIds: [
      "balcony-safety",
      "children-protection",
      "pets-safety",
      "grill-balcony",
      "terrace-top",
      "industrial-safety",
      "duct-area",
      "open-area",
      "staircase-safety",
      "construction-safety",
      "mosquito-nets",
      "hdpe-nylon",
    ],
  },
  {
    key: "bird-protection",
    title: "Pigeon Nets",
    serviceIds: ["pigeon-nets", "bird-spikes", "anti-bird-nets", "pigeon-balcony", "anti-seagull"],
  },
  {
    key: "sports",
    title: "Sports",
    serviceIds: ["all-sports-practice", "cricket-practice", "terrace-cricket"],
  },
  {
    key: "cloth-hangers",
    title: "Cloth Hangers",
    serviceIds: ["cloth-drying"],
  },
];

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
    return `Cloth Hangers in ${locationName}`;
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
}

const variantStyles = {
  footer: {
    wrapper: "bg-white/5 rounded-3xl border border-white/10 p-4 shadow-lg",
    locationTitle: "text-sm font-semibold text-white",
    categoryTitle: "text-sm font-medium text-[#FF6B42]",
    item: "text-sm text-[#C8D8EE] hover:text-white",
  },
  desktop: {
    wrapper: "bg-slate-950/95 rounded-3xl border border-white/10 p-5 shadow-2xl max-h-[650px] overflow-y-auto",
    locationTitle: "text-sm font-semibold text-white",
    categoryTitle: "text-sm font-semibold text-[#FF6B42]",
    item: "text-sm text-[#C8D8EE] hover:text-white",
  },
  mobile: {
    wrapper: "bg-white rounded-3xl border border-slate-200 p-4 shadow-lg",
    locationTitle: "text-base font-semibold text-slate-900",
    categoryTitle: "text-sm font-semibold text-[#0f172a]",
    item: "text-sm text-slate-700 hover:text-slate-900",
  },
};

export default function LocationServicesAccordion({ variant = "footer" }: LocationServicesAccordionProps) {
  const styles = variantStyles[variant];

  return (
    <div className={styles.wrapper}>
      <Accordion type="single" collapsible className="space-y-3">
        {locationMap.map((location) => (
          <AccordionItem key={location.slug} value={`location-${location.slug}`}>
            <AccordionTrigger className="flex items-center justify-between rounded-2xl px-4 py-3 text-left shadow-sm">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-[#FF6B42] flex-shrink-0" />
                <div>
                  <p className={styles.locationTitle}>{location.name}</p>
                  <p className="text-xs text-slate-400">{location.state}</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-2">
              <div className="space-y-2">
                {/* Single Accordion for categories - keeps expanded content within same parent card */}
                <Accordion type="single" collapsible className="space-y-2">
                  {getLocationServiceLinks(location.slug, location.name).map((category) => (
                    <AccordionItem key={category.key} value={`${location.slug}-${category.key}`}>
                      <AccordionTrigger className="flex items-center justify-between px-4 py-3 text-left">
                        <span className={styles.categoryTitle}>{category.title}</span>
                      </AccordionTrigger>
                      <AccordionContent className="px-2 pt-2">
                        <div className="space-y-2">
                          {category.services.map((service) => (
                            <Link
                              key={service.id}
                              href={service.href}
                              className={`block rounded-md px-3 py-2 transition-colors duration-150 no-underline flex items-center justify-between bg-white`}
                            >
                              <span className="text-sm font-medium text-[hsl(var(--primary))]">{service.title}</span>
                              <ArrowRight className="h-4 w-4 text-[hsl(var(--primary))]" />
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
