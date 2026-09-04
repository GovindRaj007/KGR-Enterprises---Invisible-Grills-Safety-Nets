// Single source of truth for every service location.
// NAP (name / address / phone) consistency matters for local SEO, so all
// metadata, JSON-LD and sitemap code must read city data from here.
// Order matters: the first entry is the primary SEO focus city.
export const validLocations = ['bangalore', 'hyderabad', 'chennai', 'vijayawada', 'visakhapatnam'] as const;

export const locationData = {
  bangalore: {
    areas: [
      'Whitefield', 'Koramangala', 'Indiranagar', 'HSR Layout', 'Marathahalli', 'Electronic City',
      'Jayanagar', 'Malleswaram', 'Rajajinagar', 'Bellandur', 'Sarjapur Road', 'BTM Layout',
      'Yelahanka', 'Hebbal', 'Banashankari', 'Bommanahalli', 'Yeshwantpur', 'Mathikere'
    ],
    // Short list used in meta descriptions, where length is at a premium.
    primaryAreas: ['Whitefield', 'Electronic City', 'Marathahalli', 'HSR Layout', 'Koramangala'],
    description: 'Covering Bangalore and Bengaluru Urban areas',
    state: 'Karnataka',
    priority: 1.0,
    latitude: 13.04266073172332,
    longitude: 77.55298708465743,
    name: 'Bangalore',
    streetAddress: '367, 2nd A Main Rd, Sharadamba Nagar, Muthyala Nagar, Gokula Extension, Mathikere, Bengaluru',
    postalCode: '560054'
  },
  hyderabad: {
    areas: [
      'Banjara Hills', 'Jubilee Hills', 'Gachibowli', 'Madhapur', 'Kondapur', 'Hitech City',
      'Uppal', 'Kukatpally', 'Miyapur', 'Ameerpet', 'Secunderabad', 'Somajiguda',
      'Kokapet', 'Shamshabad', 'Nizampet', 'Manikonda', 'Kompally', 'Patancheru'
    ],
    primaryAreas: ['Kukatpally', 'Madhapur', 'Gachibowli', 'Kondapur', 'Miyapur'],
    description: 'Serving all areas of Hyderabad including Secunderabad and surrounding localities',
    state: 'Telangana',
    priority: 0.95,
    latitude: 17.385044,
    longitude: 78.486671,
    name: 'Hyderabad',
    streetAddress: '15-21-150/17, JK Heights, Balaji Nagar, Kukatpally',
    postalCode: '500072'
  },
  chennai: {
    areas: [
      'Anna Nagar', 'T Nagar', 'Velachery', 'Adyar', 'Porur', 'OMR',
      'Nungambakkam', 'Mylapore', 'Sholinganallur', 'Medavakkam', 'Tambaram', 'Eparchai',
      'Perungudi', 'Kilpauk', 'Guindy', 'Chromepet', 'Kancheepuram', 'Avadi'
    ],
    primaryAreas: ['Anna Nagar', 'T Nagar', 'Velachery', 'Adyar', 'Porur'],
    description: 'Complete coverage across Chennai and surrounding regions',
    state: 'Tamil Nadu',
    priority: 0.95,
    latitude: 13.065460796383261,
    longitude: 80.2214640558218,
    name: 'Chennai',
    streetAddress: '25, Sathya Moorthy Street, Kamaraj Nagar, NGO Colony, Choolaimedu, Greater Chennai',
    postalCode: '600094'
  },
  vijayawada: {
    areas: [
      'Benz Circle', 'Governorpet', 'Labbipet', 'Patamata', 'Gunadala', 'Auto Nagar',
      'Vijayawada City', 'Ibrahimpatnam', 'Undavalli', 'Tadepalli', 'Mangalagiri', 'Penamaluru',
      'Kanuru', 'Mylavaram', 'Pamarru', 'Nuzvid', 'Gannavaram', 'Kankipadu'
    ],
    primaryAreas: ['Benz Circle', 'Governorpet', 'Patamata', 'Auto Nagar'],
    description: 'Serving Vijayawada and nearby areas in Krishna district',
    state: 'Andhra Pradesh',
    priority: 0.9,
    latitude: 16.483198690558233,
    longitude: 80.66901608208298,
    name: 'Vijayawada',
    streetAddress: '3-12, Ayyappa Nagar, Benz Circle, Vijayawada',
    postalCode: '520007'
  },
  visakhapatnam: {
    areas: [
      'MVP Colony', 'Dwaraka Nagar', 'Gajuwaka', 'Madhurawada', 'Seethammadhara', 'Beach Road',
      'Visakhapatnam City', 'Kailasagiri', 'NAD Junction', 'Akkayyapalem', 'Pendurthi', 'Waltair',
      'Rushikonda', 'Gopalapatnam', 'Marripalem', 'Pothinamallayya Palem', 'Anakapalle', 'Sabbavaram'
    ],
    primaryAreas: ['MVP Colony', 'Dwaraka Nagar', 'Gajuwaka', 'Madhurawada', 'Seethammadhara'],
    description: 'Covering all areas of Visakhapatnam and surrounding regions',
    state: 'Andhra Pradesh',
    priority: 0.9,
    latitude: 17.73464614605787,
    longitude: 83.31177354232871,
    name: 'Visakhapatnam',
    streetAddress: '50-79-31/1, Ganesh Nagar, Seetamma Peta, Dwaraka Nagar, Visakhapatnam',
    postalCode: '530016'
  }
} as const;

export type LocationSlug = (typeof validLocations)[number];

// The city the site leads with in titles, descriptions and schema.
export const PRIMARY_LOCATION_SLUG: LocationSlug = 'bangalore';
export const PRIMARY_LOCATION = locationData[PRIMARY_LOCATION_SLUG];

// Ordered city list for copy such as "Bangalore, Hyderabad, Chennai …".
export const LOCATION_NAMES = validLocations.map(slug => locationData[slug].name);
