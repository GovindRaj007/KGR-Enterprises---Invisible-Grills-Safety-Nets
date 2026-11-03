// Single source of truth for the factual claims the site makes about the
// business. Search engines and AI answer engines repeat what they find, so the
// same number must appear everywhere — change a fact here, not in page copy.
const FOUNDED_YEAR = 2010;

export const BUSINESS_FACTS = {
  name: 'KGR Enterprises',
  foundedYear: FOUNDED_YEAR,
  // Rounded down to the nearest 5 so the claim stays true between updates.
  experienceYears: `${Math.floor((new Date().getFullYear() - FOUNDED_YEAR) / 5) * 5}+`,
  installations: '4000+',
  warrantyYears: 10,
  installHours: '4–6',
  // Customer rating shown on the site and in structured data. Keep both in
  // step with the real review source (e.g. Google Business Profile).
  rating: '4.9',
  reviewCount: 386,
} as const;

// AggregateRating node for JSON-LD, built from the facts above.
export const AGGREGATE_RATING = {
  '@type': 'AggregateRating',
  ratingValue: BUSINESS_FACTS.rating,
  bestRating: '5',
  worstRating: '1',
  ratingCount: String(BUSINESS_FACTS.reviewCount),
  reviewCount: String(BUSINESS_FACTS.reviewCount),
} as const;

// Official profiles of the business elsewhere on the web. Emitted as `sameAs`
// in the Organization schema — this is how search and AI engines connect the
// website to the same business on other platforms. Add each real profile URL
// (Google Business Profile, Facebook, Instagram, YouTube, Justdial, IndiaMART…).
export const SOCIAL_PROFILES: string[] = [
  'https://x.com/Kgr_Grills_Nets',
];

// One-paragraph description of the business, reused wherever the site
// introduces itself to a machine reader (Organization schema, llms.txt).
export const BUSINESS_DESCRIPTION =
  `KGR Enterprises installs invisible grills, balcony safety nets, pigeon nets and sports nets for homes, apartments and commercial buildings in Bangalore, Hyderabad, Chennai, Vijayawada and Visakhapatnam. In business since ${FOUNDED_YEAR}, with ${BUSINESS_FACTS.installations} installations completed and a ${BUSINESS_FACTS.warrantyYears}-year warranty.`;
