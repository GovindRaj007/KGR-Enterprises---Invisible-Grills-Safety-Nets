export const validLocations = ['hyderabad', 'bangalore', 'chennai', 'vijayawada', 'visakhapatnam'] as const;

export const locationData = {
  hyderabad: {
    areas: [
      'Banjara Hills', 'Jubilee Hills', 'Gachibowli', 'Madhapur', 'Kondapur', 'Hitech City',
      'Uppal', 'Kukatpally', 'Miyapur', 'Ameerpet', 'Secunderabad', 'Somajiguda'
    ],
    description: 'Serving all areas of Hyderabad including Secunderabad and surrounding localities',
    state: 'Telangana',
    priority: 1.0,
    latitude: 17.385044,
    longitude: 78.486671,
    name: 'Hyderabad',
    streetAddress: '15-21-150/17, JK Heights, Balaji Nagar, Kukatpally'
  },
  bangalore: {
    areas: [
      'Whitefield', 'Koramangala', 'Indiranagar', 'HSR Layout', 'Marathahalli', 'Electronic City',
      'Jayanagar', 'Malleswaram', 'Rajajinagar', 'Bellandur', 'Sarjapur Road', 'BTM Layout'
    ],
    description: 'Covering Bangalore and Bengaluru Urban areas',
    state: 'Karnataka',
    priority: 0.95,
    latitude: 12.971599,
    longitude: 77.594563,
    name: 'Bangalore',
    streetAddress: '367, 2nd A Main Road, Gokula Extension, Mathikera, Bangalore'
  },
  chennai: {
    areas: [
      'Anna Nagar', 'T Nagar', 'Velachery', 'Adyar', 'Porur', 'OMR',
      'Nungambakkam', 'Mylapore', 'Sholinganallur', 'Medavakkam', 'Tambaram', 'Eparchai'
    ],
    description: 'Complete coverage across Chennai and surrounding regions',
    state: 'Tamil Nadu',
    priority: 0.95,
    latitude: 13.082680,
    longitude: 80.270721,
    name: 'Chennai',
    streetAddress: '25/9a, Sathya Moorthy Street, Kamaraj Nagar, Choolaimedu'
  },
  vijayawada: {
    areas: [
      'Benz Circle', 'Governorpet', 'Labbipet', 'Patamata', 'Gunadala', 'Auto Nagar',
      'Vijayawada City', 'Ibrahimpatnam', 'Undavalli', 'Tadepalli', 'Mangalagiri', 'Penamaluru'
    ],
    description: 'Serving Vijayawada and nearby areas in Krishna district',
    state: 'Andhra Pradesh',
    priority: 0.9,
    latitude: 16.506174,
    longitude: 80.648015,
    name: 'Vijayawada',
    streetAddress: '3-12, Ayyappa Nagar, Benz Circle'
  },
  visakhapatnam: {
    areas: [
      'MVP Colony', 'Dwaraka Nagar', 'Gajuwaka', 'Madhurawada', 'Seethammadhara', 'Beach Road',
      'Visakhapatnam City', 'Kailasagiri', 'NAD Junction', 'Akkayyapalem', 'Pendurthi', 'Waltair'
    ],
    description: 'Covering all areas of Visakhapatnam and surrounding regions',
    state: 'Andhra Pradesh',
    priority: 0.9,
    latitude: 17.686815,
    longitude: 83.218482,
    name: 'Visakhapatnam',
    streetAddress: '48-5-6, Dwaraka Nagar Main Road'
  }
} as const;