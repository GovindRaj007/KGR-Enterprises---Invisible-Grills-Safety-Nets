// Neighbourhood-level service areas.
//
// Each entry becomes an indexable page such as
// /invisible-grills/bangalore/whitefield/ — the "invisible grills in
// <area>" long tail is where most local "near me" searches land.
//
// scripts/generate-static-sitemaps.js reads AREA_PAGE_SERVICES and
// serviceAreas with a regex + eval, so keep both as plain literals: no type
// assertions or function calls inside the braces/brackets.

// Services that get a page per neighbourhood. Kept deliberately short: area
// pages only make sense for services people actually search by locality.
export const AREA_PAGE_SERVICES = ['invisible-grills'];

// kind drives the neighbourhood-specific copy on the area page:
//   it          – IT/office corridor, mostly high-rise gated communities
//   established – older residential area, independent houses + low/mid-rise
//   growth      – fast-growing area with many newly handed-over apartments
//   mixed       – apartments, independent homes and commercial side by side
//   coastal     – sea-facing / near-sea area (salt air)
// office: true marks the area where our city office is.
export type AreaKind = 'it' | 'established' | 'growth' | 'mixed' | 'coastal';

export type ServiceArea = {
  name: string;
  kind: AreaKind;
  nearby: string[];
  office?: boolean;
};

export const serviceAreas: Record<string, ServiceArea[]> = {
  bangalore: [
    { name: 'Whitefield', kind: 'it', nearby: ['Kadugodi', 'Hoodi', 'Varthur'] },
    { name: 'Bellandur', kind: 'it', nearby: ['Sarjapur Road', 'Marathahalli', 'HSR Layout'] },
    { name: 'Electronic City', kind: 'it', nearby: ['Chandapura', 'Begur Road', 'Bommanahalli'] },
    { name: 'Marathahalli', kind: 'it', nearby: ['Bellandur', 'Mahadevapura', 'Panathur'] },
    { name: 'HSR Layout', kind: 'established', nearby: ['Koramangala', 'BTM Layout', 'Bellandur'] },
    { name: 'Koramangala', kind: 'established', nearby: ['HSR Layout', 'Indiranagar', 'BTM Layout'] },
    { name: 'Indiranagar', kind: 'established', nearby: ['Koramangala', 'Domlur', 'CV Raman Nagar'] },
    { name: 'Hebbal', kind: 'mixed', nearby: ['Nagavara', 'Thanisandra', 'Yelahanka'] },
    { name: 'Sarjapur Road', kind: 'growth', nearby: ['Bellandur', 'Varthur', 'HSR Layout'] },
    { name: 'Thanisandra', kind: 'growth', nearby: ['Hennur Road', 'Nagavara', 'Jakkur'] },
    { name: 'Hennur Road', kind: 'growth', nearby: ['Kalyan Nagar', 'Thanisandra', 'Horamavu'] },
    { name: 'Yelahanka', kind: 'growth', nearby: ['Jakkur', 'Kogilu', 'Hebbal'] },
    { name: 'Bannerghatta Road', kind: 'mixed', nearby: ['Arekere', 'JP Nagar', 'BTM Layout'] },
    { name: 'Rajarajeshwari Nagar', kind: 'established', nearby: ['Uttarahalli', 'Kengeri', 'Banashankari'] },
    { name: 'Jakkur', kind: 'growth', nearby: ['Yelahanka', 'Thanisandra', 'Hebbal'] },
    { name: 'Kogilu', kind: 'growth', nearby: ['Yelahanka', 'Jakkur', 'Thanisandra'] },
    { name: 'Varthur', kind: 'growth', nearby: ['Whitefield', 'Sarjapur Road', 'Panathur'] },
    { name: 'Panathur', kind: 'growth', nearby: ['Marathahalli', 'Varthur', 'Bellandur'] },
    { name: 'Kadugodi', kind: 'growth', nearby: ['Whitefield', 'Hoodi', 'KR Puram'] },
    { name: 'Nagavara', kind: 'mixed', nearby: ['Hebbal', 'Thanisandra', 'Kalyan Nagar'] },
    { name: 'JP Nagar', kind: 'established', nearby: ['Bannerghatta Road', 'Jayanagar', 'Uttarahalli'] },
    { name: 'Uttarahalli', kind: 'growth', nearby: ['Rajarajeshwari Nagar', 'JP Nagar', 'Kanakapura Road'] },
    { name: 'Kanakapura Road', kind: 'growth', nearby: ['JP Nagar', 'Uttarahalli', 'Banashankari'] },
    { name: 'KR Puram', kind: 'mixed', nearby: ['Mahadevapura', 'Hoodi', 'Horamavu'] },
    { name: 'Hoodi', kind: 'it', nearby: ['Whitefield', 'Mahadevapura', 'KR Puram'] },
    { name: 'Kalyan Nagar', kind: 'established', nearby: ['Hennur Road', 'Horamavu', 'Nagavara'] },
    { name: 'Mahadevapura', kind: 'it', nearby: ['Marathahalli', 'KR Puram', 'Hoodi'] },
    { name: 'Horamavu', kind: 'growth', nearby: ['Kalyan Nagar', 'KR Puram', 'Hennur Road'] },
    { name: 'Chandapura', kind: 'growth', nearby: ['Electronic City', 'Bommasandra', 'Hosur Road'] },
    { name: 'Begur Road', kind: 'growth', nearby: ['Bommanahalli', 'Electronic City', 'Arekere'] },
    { name: 'BTM Layout', kind: 'established', nearby: ['HSR Layout', 'Koramangala', 'JP Nagar'] },
    { name: 'Arekere', kind: 'mixed', nearby: ['Bannerghatta Road', 'BTM Layout', 'Begur Road'] },
    { name: 'Jayanagar', kind: 'established', nearby: ['JP Nagar', 'Banashankari', 'BTM Layout'] },
    { name: 'Banashankari', kind: 'established', nearby: ['Jayanagar', 'Kanakapura Road', 'Rajarajeshwari Nagar'] },
    { name: 'Bommanahalli', kind: 'mixed', nearby: ['Begur Road', 'HSR Layout', 'Electronic City'] },
    { name: 'Malleswaram', kind: 'established', nearby: ['Rajajinagar', 'Yeshwantpur', 'Mathikere'] },
    { name: 'Rajajinagar', kind: 'established', nearby: ['Malleswaram', 'Yeshwantpur', 'Basaveshwaranagar'] },
    { name: 'Yeshwantpur', kind: 'mixed', nearby: ['Mathikere', 'Malleswaram', 'Rajajinagar'] },
    { name: 'Mathikere', kind: 'established', nearby: ['Yeshwantpur', 'Malleswaram', 'Hebbal'], office: true },
  ],
  hyderabad: [
    { name: 'Gachibowli', kind: 'it', nearby: ['Kondapur', 'Nanakramguda', 'Manikonda'] },
    { name: 'Madhapur', kind: 'it', nearby: ['Hitech City', 'Kondapur', 'Jubilee Hills'] },
    { name: 'Hitech City', kind: 'it', nearby: ['Madhapur', 'Kondapur', 'Gachibowli'] },
    { name: 'Kondapur', kind: 'it', nearby: ['Gachibowli', 'Madhapur', 'Miyapur'] },
    { name: 'Kukatpally', kind: 'mixed', nearby: ['KPHB Colony', 'Nizampet', 'Miyapur'], office: true },
    { name: 'Miyapur', kind: 'growth', nearby: ['Kukatpally', 'Bachupally', 'Kondapur'] },
    { name: 'Banjara Hills', kind: 'established', nearby: ['Jubilee Hills', 'Somajiguda', 'Ameerpet'] },
    { name: 'Jubilee Hills', kind: 'established', nearby: ['Banjara Hills', 'Madhapur', 'Film Nagar'] },
    { name: 'Manikonda', kind: 'growth', nearby: ['Gachibowli', 'Narsingi', 'Kokapet'] },
    { name: 'Kokapet', kind: 'it', nearby: ['Narsingi', 'Gachibowli', 'Manikonda'] },
    { name: 'Narsingi', kind: 'growth', nearby: ['Kokapet', 'Manikonda', 'Gachibowli'] },
    { name: 'Tellapur', kind: 'growth', nearby: ['Kollur', 'Nallagandla', 'Gachibowli'] },
    { name: 'Nizampet', kind: 'growth', nearby: ['Kukatpally', 'Bachupally', 'Miyapur'] },
    { name: 'Bachupally', kind: 'growth', nearby: ['Nizampet', 'Miyapur', 'Pragathi Nagar'] },
    { name: 'Kompally', kind: 'growth', nearby: ['Suchitra', 'Alwal', 'Medchal'] },
    { name: 'Uppal', kind: 'mixed', nearby: ['Habsiguda', 'Nacharam', 'LB Nagar'] },
    { name: 'Secunderabad', kind: 'established', nearby: ['Begumpet', 'Tarnaka', 'Alwal'] },
    { name: 'Ameerpet', kind: 'mixed', nearby: ['Begumpet', 'SR Nagar', 'Punjagutta'] },
  ],
  chennai: [
    { name: 'OMR', kind: 'it', nearby: ['Sholinganallur', 'Thoraipakkam', 'Perungudi'] },
    { name: 'Sholinganallur', kind: 'it', nearby: ['OMR', 'Medavakkam', 'Thoraipakkam'] },
    { name: 'Perungudi', kind: 'it', nearby: ['Thoraipakkam', 'Velachery', 'Pallikaranai'] },
    { name: 'Thoraipakkam', kind: 'it', nearby: ['Perungudi', 'Sholinganallur', 'Pallikaranai'] },
    { name: 'Velachery', kind: 'mixed', nearby: ['Guindy', 'Pallikaranai', 'Perungudi'] },
    { name: 'Anna Nagar', kind: 'established', nearby: ['Kilpauk', 'Mogappair', 'Aminjikarai'] },
    { name: 'T Nagar', kind: 'established', nearby: ['Nungambakkam', 'Kodambakkam', 'Mylapore'] },
    { name: 'Adyar', kind: 'coastal', nearby: ['Besant Nagar', 'Mylapore', 'Thiruvanmiyur'] },
    { name: 'Mylapore', kind: 'established', nearby: ['Adyar', 'T Nagar', 'Nungambakkam'] },
    { name: 'Nungambakkam', kind: 'established', nearby: ['T Nagar', 'Kilpauk', 'Mylapore'] },
    { name: 'Kilpauk', kind: 'established', nearby: ['Anna Nagar', 'Nungambakkam', 'Choolaimedu'] },
    { name: 'Choolaimedu', kind: 'mixed', nearby: ['Kilpauk', 'Nungambakkam', 'Anna Nagar'], office: true },
    { name: 'Porur', kind: 'growth', nearby: ['Valasaravakkam', 'Guindy', 'Poonamallee'] },
    { name: 'Guindy', kind: 'mixed', nearby: ['Velachery', 'Saidapet', 'Porur'] },
    { name: 'Medavakkam', kind: 'growth', nearby: ['Pallikaranai', 'Sholinganallur', 'Tambaram'] },
    { name: 'Pallikaranai', kind: 'growth', nearby: ['Medavakkam', 'Velachery', 'Perungudi'] },
    { name: 'Tambaram', kind: 'growth', nearby: ['Chromepet', 'Medavakkam', 'Perungalathur'] },
    { name: 'Chromepet', kind: 'mixed', nearby: ['Tambaram', 'Pallavaram', 'Medavakkam'] },
    { name: 'ECR', kind: 'coastal', nearby: ['Neelankarai', 'Injambakkam', 'Thiruvanmiyur'] },
  ],
  vijayawada: [
    { name: 'Benz Circle', kind: 'mixed', nearby: ['Patamata', 'Gurunanak Colony', 'Labbipet'], office: true },
    { name: 'Governorpet', kind: 'established', nearby: ['Labbipet', 'Suryaraopet', 'One Town'] },
    { name: 'Labbipet', kind: 'established', nearby: ['Benz Circle', 'Governorpet', 'Gurunanak Colony'] },
    { name: 'Patamata', kind: 'established', nearby: ['Benz Circle', 'Auto Nagar', 'Kanuru'] },
    { name: 'Gunadala', kind: 'established', nearby: ['Machavaram', 'Ramavarappadu', 'Patamata'] },
    { name: 'Poranki', kind: 'growth', nearby: ['Kanuru', 'Penamaluru', 'Tadigadapa'] },
    { name: 'Kanuru', kind: 'growth', nearby: ['Poranki', 'Patamata', 'Penamaluru'] },
    { name: 'Gollapudi', kind: 'growth', nearby: ['Bhavanipuram', 'Vidyadharapuram', 'Ibrahimpatnam'] },
    { name: 'Tadepalli', kind: 'growth', nearby: ['Undavalli', 'Mangalagiri', 'Kunchanapalli'] },
    { name: 'Mangalagiri', kind: 'growth', nearby: ['Tadepalli', 'Nidamarru', 'Atmakur'] },
  ],
  visakhapatnam: [
    { name: 'MVP Colony', kind: 'established', nearby: ['Siripuram', 'Lawsons Bay Colony', 'Seethammadhara'] },
    { name: 'Dwaraka Nagar', kind: 'mixed', nearby: ['Akkayyapalem', 'Seethammadhara', 'Siripuram'], office: true },
    { name: 'Seethammadhara', kind: 'established', nearby: ['Dwaraka Nagar', 'MVP Colony', 'Akkayyapalem'] },
    { name: 'Akkayyapalem', kind: 'established', nearby: ['Dwaraka Nagar', 'Seethammadhara', 'NAD Junction'] },
    { name: 'Madhurawada', kind: 'growth', nearby: ['PM Palem', 'Rushikonda', 'Yendada'] },
    { name: 'PM Palem', kind: 'growth', nearby: ['Madhurawada', 'Kommadi', 'Yendada'] },
    { name: 'Yendada', kind: 'growth', nearby: ['Rushikonda', 'Madhurawada', 'PM Palem'] },
    { name: 'Rushikonda', kind: 'coastal', nearby: ['Yendada', 'Sagar Nagar', 'Madhurawada'] },
    { name: 'Beach Road', kind: 'coastal', nearby: ['RK Beach', 'Siripuram', 'Pedda Waltair'] },
    { name: 'Gajuwaka', kind: 'mixed', nearby: ['Sheela Nagar', 'Kurmannapalem', 'Pedagantyada'] },
    { name: 'NAD Junction', kind: 'mixed', nearby: ['Gopalapatnam', 'Marripalem', 'Akkayyapalem'] },
    { name: 'Pendurthi', kind: 'growth', nearby: ['Gopalapatnam', 'Sujatha Nagar', 'Vepagunta'] },
  ],
};

// "HSR Layout" -> "hsr-layout". Mirrored in scripts/generate-static-sitemaps.js.
export function slugifyArea(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

export function getServiceAreas(citySlug: string): ServiceArea[] {
  return serviceAreas[citySlug] ?? [];
}

export function findServiceArea(citySlug: string, areaSlug: string): ServiceArea | undefined {
  return getServiceAreas(citySlug).find(area => slugifyArea(area.name) === areaSlug);
}

export function hasAreaPages(serviceSlug: string): boolean {
  return AREA_PAGE_SERVICES.includes(serviceSlug);
}
