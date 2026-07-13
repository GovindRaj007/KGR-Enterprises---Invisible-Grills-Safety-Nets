export const validLocations = ['hyderabad', 'bangalore', 'chennai', 'vijayawada', 'visakhapatnam'] as const;

export const locationData = {
  hyderabad: {
    areas: [
      'Banjara Hills', 'Jubilee Hills', 'Gachibowli', 'Madhapur', 'Kondapur', 'Hitech City',
      'Uppal', 'Kukatpally', 'Miyapur', 'Ameerpet', 'Secunderabad', 'Somajiguda',
      'Kokapet', 'Shamshabad', 'Nizampet', 'Manikonda', 'Kompally', 'Patancheru'
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
      'Jayanagar', 'Malleswaram', 'Rajajinagar', 'Bellandur', 'Sarjapur Road', 'BTM Layout',
      'Yelahanka', 'Hebbal', 'Banashankari', 'Bommanahalli', 'Yeshwantpur', 'Malleshwaram'
    ],
    description: 'Covering Bangalore and Bengaluru Urban areas',
    state: 'Karnataka',
    priority: 0.95,
    latitude: 13.04266073172332,
    longitude: 77.55298708465743,
    name: 'Bangalore',
    streetAddress: '367, 2nd A Main Rd, Sharadamba Nagar, Muthyala Nagar, Gokula Extension, Mathikere, Bengaluru - 560054, Karnataka'
  },
  chennai: {
    areas: [
      'Anna Nagar', 'T Nagar', 'Velachery', 'Adyar', 'Porur', 'OMR',
      'Nungambakkam', 'Mylapore', 'Sholinganallur', 'Medavakkam', 'Tambaram', 'Eparchai',
      'Perungudi', 'Kilpauk', 'Guindy', 'Chromepet', 'Kancheepuram', 'Avadi'
    ],
    description: 'Complete coverage across Chennai and surrounding regions',
    state: 'Tamil Nadu',
    priority: 0.95,
    latitude: 13.065460796383261,
    longitude: 80.2214640558218,
    name: 'Chennai',
    streetAddress: '25, Sathya Moorthy Street, Kamaraj Nagar,NGO Colony, Choolaimedu, Greater Chennai - 600094, Tamil Nadu'
  },
  vijayawada: {
    areas: [
      'Benz Circle', 'Governorpet', 'Labbipet', 'Patamata', 'Gunadala', 'Auto Nagar',
      'Vijayawada City', 'Ibrahimpatnam', 'Undavalli', 'Tadepalli', 'Mangalagiri', 'Penamaluru',
      'Kanuru', 'Mylavaram', 'Pamarru', 'Nuzvid', 'Gannavaram', 'Kankipadu'
    ],
    description: 'Serving Vijayawada and nearby areas in Krishna district',
    state: 'Andhra Pradesh',
    priority: 0.9,
    latitude: 16.483198690558233,
    longitude: 80.66901608208298,
    name: 'Vijayawada',
    streetAddress: '3-12, Ayyappa Nagar, Benz Circle, Vijayawada - 521134, Andhra Pradesh'
  },
  visakhapatnam: {
    areas: [
      'MVP Colony', 'Dwaraka Nagar', 'Gajuwaka', 'Madhurawada', 'Seethammadhara', 'Beach Road',
      'Visakhapatnam City', 'Kailasagiri', 'NAD Junction', 'Akkayyapalem', 'Pendurthi', 'Waltair',
      'Rushikonda', 'Gopalapatnam', 'Marripalem', 'Pothinamallayya Palem', 'Anakapalle', 'Sabbavaram'
    ],
    description: 'Covering all areas of Visakhapatnam and surrounding regions',
    state: 'Andhra Pradesh',
    priority: 0.9,
    latitude: 17.73464614605787,
    longitude: 83.31177354232871,
    name: 'Visakhapatnam',
    streetAddress: '50-79-31/1, Ganesh Nagar, Seetamma Peta, Dwaraka Nagar, Visakhapatnam - 530016, Andhra Pradesh'
  }
} as const;