// Copy for the city and neighbourhood landing pages ("invisible grills in
// Bangalore", "invisible grills in Whitefield", "... near me").
//
// Every figure that appears on the page lives here once so the visible copy,
// the meta description and the JSON-LD offers can never disagree — Google
// ignores structured-data prices that are not visible on the page.

import { PRIMARY } from '@/constants/contacts';
import type { AreaKind } from '@/constants/service-areas';

// Per-sq-ft price range, installation included. Matches the offers already
// declared in the service JSON-LD (lib/seo-metadata.ts).
export const INVISIBLE_GRILL_PRICE = { from: 120, to: 150 } as const;

export const BUSINESS_FACTS = {
  installations: '600+',
  rating: '4.9',
  warrantyYears: 10,
  installHours: '4–6',
  experienceYears: '15+',
} as const;

type Service = { id: string; title: string; category: string };

// Invisible-grill pages get the price / spec / comparison content. The dealer
// programme and cloth hangers share the category but are not grills.
export function isInvisibleGrillService(service: Service): boolean {
  return service.category === 'invisible-grills' && !['invisible-grills-dealer', 'cloth-drying'].includes(service.id);
}

// Return the first title that fits Google's ~60 character display window.
export function fitTitle(candidates: string[], max = 60): string {
  return candidates.find(t => t.length <= max) ?? candidates[candidates.length - 1];
}

// City-level material advice. Coastal cities get SS316 as the default.
export const CITY_MATERIAL_NOTE: Record<string, string> = {
  bangalore:
    "Bangalore's moderate climate is gentle on stainless steel, but heavy monsoon showers and dust on high floors still matter — we use SS316 marine-grade cable with nylon coating as standard so the grills stay rust-free for years.",
  hyderabad:
    "Hyderabad's hot summers and dusty air are hard on painted iron grills. SS316 stainless steel cable does not need repainting, and the nylon coating stays smooth to the touch even in peak summer.",
  chennai:
    "Chennai's salty, humid coastal air rusts ordinary steel quickly, so every Chennai installation uses SS316 marine-grade cable and stainless fittings — never SS304 near the coast.",
  vijayawada:
    "Vijayawada's intense summers and heavy monsoons call for materials that do not fade, crack or rust. SS316 cable with UV-stable coating handles both without maintenance.",
  visakhapatnam:
    "Visakhapatnam's sea breeze carries salt far inland, so we only use SS316 marine-grade cable and stainless anchors here — the same grade used on ships and seaside railings.",
};

// Neighbourhood copy by area type. Written so each area page says something
// true and specific about the housing there, not just the area name swapped in.
const AREA_KIND_COPY: Record<AreaKind, (area: string, city: string) => string> = {
  it: (area, city) =>
    `${area} is one of ${city}'s IT and office corridors, and most families here live in high-rise gated communities. We regularly work with apartment associations in ${area} to fit invisible grills that follow façade guidelines while making upper-floor balconies safe for children and pets.`,
  established: (area, city) =>
    `${area} is an established residential neighbourhood of ${city}, with independent houses, builder floors and low- to mid-rise apartments. Many homeowners in ${area} call us to replace old, rusting iron grills with invisible grills on balconies, windows and staircases.`,
  growth: (area, city) =>
    `${area} is one of the fastest-growing residential pockets of ${city}, with new apartment projects being handed over every year. We fit a lot of invisible grills in newly handed-over flats in ${area}, often before the family moves in.`,
  mixed: (area, city) =>
    `${area} has a mix of apartment complexes, independent homes and shops, so the jobs we do here in ${city} range from a single bedroom window to full-length apartment balconies and open staircases.`,
  coastal: (area, city) =>
    `${area} is close to the sea, and salt-laden air corrodes ordinary grills within a few seasons. Every invisible grill we install in ${area}, ${city} uses SS316 marine-grade cable and stainless fittings for exactly that reason.`,
};

export function areaIntro(area: string, city: string, kind: AreaKind): string {
  return AREA_KIND_COPY[kind](area, city);
}

export type FAQ = { question: string; answer: string };

// FAQs for a city or neighbourhood page. `place` is what the page targets
// ("Bangalore" or "Whitefield"); `city` is always the city name.
export function buildLocalFaqs(params: {
  service: Service;
  place: string;
  city: string;
  citySlug: string;
  areasSample: string[];
}): FAQ[] {
  const { service, place, city, citySlug, areasSample } = params;
  const areas = areasSample.slice(0, 6).join(', ');
  const inPlace = place === city ? `in ${city}` : `in ${place}, ${city}`;
  const coastal = citySlug === 'chennai' || citySlug === 'visakhapatnam';
  const { from, to } = INVISIBLE_GRILL_PRICE;

  if (isInvisibleGrillService(service)) {
    return [
      {
        question: `What is the cost of invisible grills ${inPlace}?`,
        answer: `Invisible grills ${inPlace} start from ₹${from} per sq ft and usually cost ₹${from}–₹${to} per sq ft including installation. The final price depends on the cable grade (SS304 or SS316), cable thickness, spacing, floor height and total area. We give a fixed written quote after a free site inspection — no hidden charges.`,
      },
      {
        question: `Where can I get invisible grills installed near me ${inPlace}?`,
        answer: `KGR Enterprises installs invisible grills across ${city}, including ${areas} and nearby localities. Call ${PRIMARY.display.trim()} or book online and our ${city} team will visit your home for a free measurement, usually the same or next day.`,
      },
      {
        question: `Are SS316 invisible grills rust-proof?`,
        answer: coastal
          ? `Yes. SS316 is marine-grade stainless steel made for salty, humid air, which is why we use it on every ${city} installation. With a nylon coating over the cable, the grills do not rust, stain or need repainting.`
          : `Yes. SS316 marine-grade stainless steel resists rust and corrosion far better than iron or SS304. With a nylon coating over the cable, the grills stay rust-free and never need repainting in ${city}'s weather.`,
      },
      {
        question: `How long does invisible grill installation take?`,
        answer: `A typical apartment balcony takes ${BUSINESS_FACTS.installHours} hours. There is no welding or heavy cutting — aluminium tracks are anchored to the wall and the cables are tensioned by hand — so the work is clean and quick. Larger homes or villas may take a day.`,
      },
      {
        question: `Are invisible grills safe for children and pets?`,
        answer: `Yes. Each tensioned stainless steel cable takes heavy loads, and we set the cable spacing on site — closer spacing for homes with toddlers or small pets. The system prevents falls from balconies and windows without blocking your view.`,
      },
      {
        question: `Invisible grills vs iron grills — which is better?`,
        answer: `Invisible grills keep your view, light and airflow open, never rust, and need no painting. Iron grills are bulky, block the view and need repainting every few years. Invisible grills cost a little more upfront but last longer and add a modern look to the flat.`,
      },
      {
        question: `Do you offer a free site inspection ${inPlace}?`,
        answer: `Yes. Site inspection, measurement and quotation are free ${inPlace}. Our technician explains the cable options, spacing and exact cost before any work starts.`,
      },
      {
        question: `What warranty do you give on invisible grills?`,
        answer: `Our invisible grills come with up to ${BUSINESS_FACTS.warrantyYears} years of warranty on materials and workmanship, plus after-sales support from our local ${city} team.`,
      },
    ];
  }

  const name = service.title;
  const lower = name.toLowerCase();
  return [
    {
      question: `What is the cost of ${lower} ${inPlace}?`,
      answer: `${name} ${inPlace} are priced per sq ft, depending on the material, mesh size and the area to be covered. We visit, measure and give you a fixed written quote free of charge — no hidden charges.`,
    },
    {
      question: `Where can I get ${lower} installed near me ${inPlace}?`,
      answer: `KGR Enterprises installs ${lower} across ${city}, including ${areas} and nearby localities. Call ${PRIMARY.display.trim()} and our ${city} team will visit for a free measurement, usually the same or next day.`,
    },
    {
      question: `How long does ${lower} installation take?`,
      answer: `Most homes are done in ${BUSINESS_FACTS.installHours} hours. Larger commercial or terrace jobs may take a day; we confirm the timeline during the site visit.`,
    },
    {
      question: `Do you offer a free site inspection ${inPlace}?`,
      answer: `Yes. Site inspection, measurement and quotation are free ${inPlace}.`,
    },
    {
      question: `Are your ${lower} suitable for ${city}'s weather?`,
      answer: coastal
        ? `Yes. For ${city}'s coastal climate we use UV-stabilised, salt-resistant materials and stainless fittings that do not rust.`
        : `Yes. We use UV-stabilised, weather-resistant materials and stainless fittings chosen for ${city}'s sun and monsoon.`,
    },
  ];
}

export const INSTALL_STEPS = [
  { title: 'Book a free site visit', text: 'Call, WhatsApp or fill the form. We schedule a visit at a time that suits you.' },
  { title: 'Measurement & fixed quote', text: 'Our technician measures every opening, suggests cable grade and spacing, and gives a written quote.' },
  { title: 'Material selection', text: 'Choose SS304 or SS316 cable, thickness and spacing. Everything is cut to your measurements.' },
  { title: 'Clean installation', text: 'No welding and no heavy cutting — tracks are anchored and cables tensioned in a few hours.' },
  { title: 'Safety check & warranty', text: 'We load-test every cable, clean up and hand over your warranty.' },
] as const;

export const GRILL_VS_IRON = [
  { label: 'View & light', grill: 'Clear, unobstructed view', iron: 'Bulky bars block the view' },
  { label: 'Rust', grill: 'SS316 marine-grade, rust-free', iron: 'Rusts, especially in rain' },
  { label: 'Maintenance', grill: 'None — no painting', iron: 'Repainting every few years' },
  { label: 'Looks', grill: 'Modern, almost invisible', iron: 'Cage-like, dated' },
  { label: 'Installation', grill: 'Few hours, no welding', iron: 'Welding, dust and days of work' },
  { label: 'Child & pet safety', grill: 'Yes, spacing set on site', iron: 'Yes, but gaps often too wide' },
] as const;

export const GRILL_USES = [
  'Apartment balconies',
  'Windows & French windows',
  'Staircases & open corridors',
  'Duct areas & utility spaces',
  'Terraces & open terraces',
  'Villas & duplex homes',
] as const;
