export interface SearchDataItem {
  id: string;
  name: string;
  category: string;
  description: string;
  keywords: string;
  useCase: string;
  locations: string;
  url: string;
}

export const SEARCH_DATA: SearchDataItem[] = [
  {
    id: "invisible-grills",
    name: "Invisible Grills",
    category: "Invisible Grills",
    description:
      "Premium invisible grills installation for balcony and windows. Marine-grade SS316, rust-proof, child-safe, 10-year warranty.",
    keywords:
      "invisible grills marine-grade SS316 rust-proof child-safe unobstructed views balcony window security",
    useCase: "Balcony windows security aesthetics",
    locations: "Hyderabad Bangalore Chennai Andhra Pradesh Vijayawada",
    url: "/services/invisible-grills",
  },
  {
    id: "invisible-grills-balcony",
    name: "Invisible Grills for Balcony",
    category: "Invisible Grills",
    description:
      "Secure balcony protection with elegant invisible grills using high quality steel cables.",
    keywords:
      "balcony invisible grills high quality steel cables modern aesthetics premium protection",
    useCase: "Balcony protection family safety property value",
    locations: "Hyderabad Bangalore Chennai Andhra Pradesh Vijayawada",
    url: "/services/invisible-grills-balcony",
  },
  {
    id: "invisible-grills-dealer",
    name: "Invisible Grills Dealership",
    category: "Invisible Grills",
    description:
      "Authorized dealership with wholesale pricing, territory rights, training and support.",
    keywords:
      "dealer wholesale bulk orders territory rights training support invisible grills",
    useCase: "Business partnership hardware stores contractors",
    locations: "Hyderabad Bangalore Chennai Andhra Pradesh Vijayawada",
    url: "/services/invisible-grills-dealership",
  },
  {
    id: "balcony-safety",
    name: "Balcony Safety Nets",
    category: "Safety Nets",
    description: "Transparent balcony protection. UV-resistant, weather-proof HDPE nets.",
    keywords:
      "balcony safety nets UV-resistant weather-proof HDPE transparent child protection",
    useCase: "Apartment balcony family safety child protection",
    locations: "Hyderabad Bangalore Chennai Andhra Pradesh",
    url: "/services/balcony-safety-nets",
  },
  {
    id: "children-protection",
    name: "Children Protection Nets",
    category: "Safety Nets",
    description: "Child-safe HDPE protective nets. Bite-resistant and durable.",
    keywords:
      "children protection child safety nets HDPE bite-resistant durable kids",
    useCase: "Windows balcony playgrounds child safety",
    locations: "Hyderabad Bangalore Chennai Andhra Pradesh",
    url: "/services/children-protection-nets",
  },
  {
    id: "pets-safety",
    name: "Pets Safety Nets",
    category: "Safety Nets",
    description: "Pet-friendly, bite-resistant, non-toxic nets for balcony and terraces.",
    keywords:
      "pet safety nets pet-friendly bite-resistant non-toxic pet accident prevention",
    useCase: "Balcony terraces pet containment",
    locations: "Hyderabad Bangalore Chennai Andhra Pradesh",
    url: "/services/pets-safety-nets",
  },
  {
    id: "grill-balcony",
    name: "Grill Balcony Safety Nets",
    category: "Safety Nets",
    description:
      "Heat-resistant, fire-retardant, grease-resistant nets for balcony grilling areas.",
    keywords:
      "grill balcony nets heat-resistant fire-retardant grease-resistant outdoor cooking",
    useCase: "Balcony grilling outdoor cooking safety",
    locations: "Hyderabad Bangalore Chennai Andhra Pradesh",
    url: "/services/grill-balcony-safety-nets",
  },
  {
    id: "terrace-top",
    name: "Terrace Top Nets",
    category: "Safety Nets",
    description: "UV protection, rain resistant, wind resistant nets for terraces and outdoor living.",
    keywords:
      "terrace nets UV protection rain resistant privacy coverage wind resistant shade",
    useCase: "Terraces outdoor living shade control",
    locations: "Hyderabad Bangalore Chennai Andhra Pradesh",
    url: "/services/terrace-top-nets",
  },
  {
    id: "industrial-safety",
    name: "Industrial Safety Nets",
    category: "Safety Nets",
    description: "Fire-retardant OSHA-compliant safety nets for warehouses and factories.",
    keywords:
      "industrial safety nets fire-retardant OSHA compliant worker protection heavy-duty",
    useCase: "Warehouses factories construction sites",
    locations: "Hyderabad Bangalore Chennai Andhra Pradesh",
    url: "/services/industrial-safety-nets",
  },
  {
    id: "duct-area",
    name: "Duct Area Nets",
    category: "Safety Nets",
    description: "Fire-retardant ventilation-safe nets for HVAC ducts and utility spaces.",
    keywords:
      "duct area nets fire-retardant ventilation safe debris prevention bird prevention HVAC",
    useCase: "HVAC ducts ventilation shafts utility spaces",
    locations: "Hyderabad Bangalore Chennai Andhra Pradesh",
    url: "/services/duct-area-nets",
  },
  {
    id: "open-area",
    name: "Open Area Safety Nets",
    category: "Safety Nets",
    description:
      "UV stabilized large coverage nets for gardens, playgrounds and recreational areas.",
    keywords:
      "open area nets UV stabilized playground safety garden protection large coverage",
    useCase: "Gardens playgrounds recreational areas",
    locations: "Hyderabad Bangalore Chennai Andhra Pradesh",
    url: "/services/open-area-safety-nets",
  },
  {
    id: "staircase-safety",
    name: "Staircase Safety Nets",
    category: "Safety Nets",
    description: "Fall prevention custom-fitted nets for indoor and outdoor staircases.",
    keywords:
      "staircase nets fall prevention child-safe custom-fitted aesthetic design elderly safety",
    useCase: "Indoor outdoor stairs elderly safety",
    locations: "Hyderabad Bangalore Chennai Andhra Pradesh",
    url: "/services/staircase-safety-nets",
  },
  {
    id: "construction-safety",
    name: "Construction Safety Nets",
    category: "Safety Nets",
    description:
      "OSHA compliant heavy-duty worker and debris protection nets for construction sites.",
    keywords:
      "construction safety nets OSHA compliant worker protection debris control heavy-duty",
    useCase: "Construction sites worker safety",
    locations: "Hyderabad Bangalore Chennai Andhra Pradesh",
    url: "/services/construction-safety-nets",
  },
  {
    id: "mosquito-nets",
    name: "Mosquito Nets",
    category: "Safety Nets",
    description:
      "Fine mesh insect protection for doors and windows. Dengue and malaria prevention.",
    keywords:
      "mosquito nets fine mesh dengue prevention malaria protection ventilation friendly",
    useCase: "Doors windows insect prevention",
    locations: "Hyderabad Bangalore Chennai Andhra Pradesh",
    url: "/services/mosquito-nets",
  },
  {
    id: "cloth-drying",
    name: "Ceiling Cloth Drying Hangers",
    category: "Safety Nets",
    description: "Space-saving ceiling-mounted pulley clothesline for apartments.",
    keywords:
      "cloth drying hangers ceiling mounted space-saving pulley system rust-proof",
    useCase: "Apartments homes indoor drying",
    locations: "Hyderabad Bangalore Chennai Andhra Pradesh",
    url: "/services/cloth-drying-hangers",
  },
  {
    id: "hdpe-nylon",
    name: "HDPE Nylon Nets",
    category: "Safety Nets",
    description:
      "Versatile high-tensile weather-proof HDPE and nylon nets with custom specifications.",
    keywords:
      "HDPE nets nylon nets versatile high-tensile weather-proof custom specifications multipurpose",
    useCase: "Multiple applications multipurpose use",
    locations: "Hyderabad Bangalore Chennai Andhra Pradesh",
    url: "/services/hdpe-nylon-nets",
  },
  {
    id: "pigeon-nets",
    name: "Pigeon Nets",
    category: "Bird Protection",
    description:
      "Humane pigeon control. Weather-resistant netting to prevent bird nesting and mess.",
    keywords:
      "pigeon nets humane bird control bird nesting prevention mess prevention weather-resistant",
    useCase: "Balcony residential pigeon prevention",
    locations: "Hyderabad Bangalore Chennai Andhra Pradesh",
    url: "/services/pigeon-nets",
  },
  {
    id: "bird-spikes",
    name: "Bird Spikes",
    category: "Bird Protection",
    description:
      "Stainless steel 304 bird deterrent spikes. Humane, low-maintenance, for ledges and signs.",
    keywords:
      "bird spikes humane deterrent perching prevention stainless steel 304 low-maintenance",
    useCase: "Ledges signs architectural features",
    locations: "Hyderabad Bangalore Chennai Andhra Pradesh",
    url: "/services/bird-spikes",
  },
  {
    id: "anti-bird-nets",
    name: "Anti Bird Nets",
    category: "Bird Protection",
    description: "Comprehensive multi-species humane bird control for large areas.",
    keywords:
      "anti-bird nets comprehensive bird control multi-species protection humane solution",
    useCase: "Large areas combined bird control",
    locations: "Hyderabad Bangalore Chennai Andhra Pradesh",
    url: "/services/anti-bird-nets",
  },
  {
    id: "pigeon-balcony",
    name: "Pigeon Nets For Balcony",
    category: "Bird Protection",
    description: "Custom-fitted low-profile pigeon nets for residential balcony.",
    keywords:
      "balcony pigeon nets custom-fitted aesthetic design bird control low-profile residential",
    useCase: "Residential balcony bird prevention",
    locations: "Hyderabad Bangalore Chennai Andhra Pradesh",
    url: "/services/pigeon-nets-balcony",
  },
  {
    id: "anti-seagull",
    name: "Anti Seagull Nets",
    category: "Bird Protection",
    description:
      "Marine-grade heavy-duty coastal bird protection nets. Salt-water resistant.",
    keywords:
      "anti-seagull nets marine-grade coastal environments heavy-duty salt-water resistant",
    useCase: "Coastal properties commercial buildings",
    locations: "Hyderabad Bangalore Chennai Andhra Pradesh Visakhapatnam",
    url: "/services/anti-seagull-nets",
  },
  {
    id: "all-sports-practice",
    name: "All Sports Practice Nets",
    category: "Sports Nets",
    description:
      "Multi-purpose professional-grade nets for cricket, football, tennis, badminton, volleyball.",
    keywords:
      "all-sports nets cricket football tennis badminton volleyball professional-grade multi-sport",
    useCase: "Training facilities multi-sport use",
    locations: "Hyderabad Bangalore Chennai Andhra Pradesh",
    url: "/services/all-sports-practice-nets",
  },
  {
    id: "cricket-practice",
    name: "Cricket Practice Nets",
    category: "Sports Nets",
    description: "Professional cricket training nets for batting and bowling practice.",
    keywords:
      "cricket practice nets cricket coaching ball practice bowling training batting practice",
    useCase: "Cricket academies practice grounds",
    locations: "Hyderabad Bangalore Chennai Andhra Pradesh",
    url: "/services/cricket-practice-nets",
  },
  {
    id: "terrace-cricket",
    name: "Terrace Cricket Nets & Box Cricket Nets",
    category: "Sports Nets",
    description:
      "Rooftop and compact space cricket nets. Portable and custom-fitted for terrace cricket.",
    keywords:
      "terrace cricket nets box cricket nets rooftop cricket portable custom cricket nets",
    useCase: "Rooftops apartments terrace cricket",
    locations: "Hyderabad Bangalore Chennai Andhra Pradesh",
    url: "/services/terrace-cricket-nets",
  },
];

export const FUSE_OPTIONS = {
  includeScore: true,
  threshold: 0.35,
  ignoreLocation: true,
  keys: [
    { name: "name", weight: 2.0 },
    { name: "keywords", weight: 1.5 },
    { name: "category", weight: 1.2 },
    { name: "useCase", weight: 1.0 },
    { name: "locations", weight: 0.8 },
    { name: "description", weight: 0.7 },
  ],
};
