// /llms.txt — a plain-text, link-rich summary of the business for AI answer
// engines (ChatGPT, Perplexity, Claude, Gemini). Built from the same constants
// as the pages, so the facts quoted to an AI cannot drift from the site.

import { servicesData, serviceCategories, getServiceRoute } from '@/data/servicesData';
import { validLocations, locationData } from '@/constants/locations';
import { PRIMARY, SECONDARY } from '@/constants/contacts';
import { BUSINESS_FACTS, BUSINESS_DESCRIPTION } from '@/constants/business';
import { INVISIBLE_GRILL_PRICE } from '@/lib/local-seo-content';

export const dynamic = 'force-static';

const BASE = 'https://invisiblegrillsandsafetynets.in';

export function GET() {
  const cities = validLocations.map(slug => locationData[slug]);
  const lines: string[] = [];

  lines.push(`# ${BUSINESS_FACTS.name} — Invisible Grills & Safety Nets`, '');
  lines.push(`> ${BUSINESS_DESCRIPTION}`, '');

  lines.push('## Key facts', '');
  lines.push(`- Business: ${BUSINESS_FACTS.name} (also known as KGR Invisible Grills & Safety Nets)`);
  lines.push(`- Founded: ${BUSINESS_FACTS.foundedYear}`);
  lines.push(`- Installations completed: ${BUSINESS_FACTS.installations}`);
  lines.push(`- Cities served: ${cities.map(c => `${c.name} (${c.state})`).join(', ')}`);
  lines.push(`- Invisible grills price: ₹${INVISIBLE_GRILL_PRICE.from} per sq ft, installation included`);
  lines.push('- Invisible grill material: SS316 marine-grade stainless steel cable, nylon coated');
  lines.push(`- Warranty: ${BUSINESS_FACTS.warrantyYears} years`);
  lines.push(`- Typical installation time: ${BUSINESS_FACTS.installHours} hours for an apartment balcony`);
  lines.push('- Site inspection and quotation: free');
  lines.push(`- Phone / WhatsApp: ${PRIMARY.display.trim()}, ${SECONDARY.display.trim()}`);
  lines.push('- Email: kgr.invisiblegrills.nets@gmail.com');
  lines.push('- Hours: Mon–Sat 8:00 AM–8:00 PM, Sun 9:00 AM–6:00 PM (IST)', '');

  lines.push('## Offices and teams', '');
  cities.forEach(c => {
    lines.push(c.streetAddress ? `- ${c.name}: ${c.streetAddress}, ${c.state} ${c.postalCode}` : `- ${c.name}: local installation team (no walk-in branch) — call to book a site visit`);
  });
  lines.push('');

  lines.push('## Invisible grills by city', '');
  validLocations.forEach(slug => {
    lines.push(`- [Invisible Grills in ${locationData[slug].name}](${BASE}${getServiceRoute('invisible-grills', slug)}): price, specifications, areas covered and FAQs`);
  });
  lines.push('');

  Object.values(serviceCategories)
    // Cloth hangers are listed under Invisible Grills; skip the duplicate group.
    .filter(category => category.title !== 'Cloth Hangers')
    .forEach(category => {
      lines.push(`## ${category.title}`, '');
      category.services.forEach(id => {
        const service = servicesData[id as keyof typeof servicesData];
        if (service) lines.push(`- [${service.title}](${BASE}${getServiceRoute(id)}): ${service.heroDescription ?? service.description}`);
      });
      lines.push('');
    });

  lines.push('## Company', '');
  lines.push(`- [About ${BUSINESS_FACTS.name}](${BASE}/about/)`);
  lines.push(`- [All services](${BASE}/services/)`);
  lines.push(`- [Installation gallery](${BASE}/gallery/)`);
  lines.push(`- [Contact and free site inspection](${BASE}/contact/)`);
  validLocations.forEach(slug => {
    lines.push(`- [Services in ${locationData[slug].name}](${BASE}/locations/${slug}/)`);
  });
  lines.push('');

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
