export const validLocations = ['hyderabad', 'bangalore', 'chennai', 'vijayawada', 'visakhapatnam'] as const;

export const locationData = {
  hyderabad: {
    areas: ['Banjara Hills', 'Jubilee Hills', 'Gachibowli', 'Madhapur', 'Kondapur', 'Hitech City'],
    description: 'Serving all areas of Hyderabad including Secunderabad and surrounding localities',
    state: 'Telangana',
    priority: 1.0,
    latitude: 17.385044,
    longitude: 78.486671,
    name: 'Hyderabad'
  },
  bangalore: {
    areas: ['Whitefield', 'Koramangala', 'Indiranagar', 'HSR Layout', 'Marathahalli', 'Electronic City'],
    description: 'Covering Bangalore and Bengaluru Urban areas',
    state: 'Karnataka',
    priority: 0.95,
    latitude: 12.971599,
    longitude: 77.594563,
    name: 'Bangalore'
  },
  chennai: {
    areas: ['Anna Nagar', 'T Nagar', 'Velachery', 'Adyar', 'Porur', 'OMR'],
    description: 'Complete coverage across Chennai and surrounding regions',
    state: 'Tamil Nadu',
    priority: 0.95,
    latitude: 13.082680,
    longitude: 80.270721,
    name: 'Chennai'
  },
  vijayawada: {
    areas: ['Benz Circle', 'Governorpet', 'Labbipet', 'Patamata', 'Gunadala', 'Auto Nagar'],
    description: 'Serving Vijayawada and nearby areas in Krishna district',
    state: 'Andhra Pradesh',
    priority: 0.9,
    latitude: 16.506174,
    longitude: 80.648015,
    name: 'Vijayawada'
  },
  visakhapatnam: {
    areas: ['MVP Colony', 'Dwaraka Nagar', 'Gajuwaka', 'Madhurawada', 'Seethammadhara', 'Beach Road'],
    description: 'Covering all areas of Visakhapatnam and surrounding regions',
    state: 'Andhra Pradesh',
    priority: 0.9,
    latitude: 17.686815,
    longitude: 83.218482,
    name: 'Visakhapatnam'
  }
} as const;