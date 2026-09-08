export type CustomerType = 'both' | 'crop' | 'fertilizer';

export interface Farmer {
  id: string;
  name: string;
  phone: string;
  address: string;
  latitude: number;
  longitude: number;
  farmArea: string;
  cropType: string;
  customerType: CustomerType;
  cropDetails?: string;
  fertilizerDetails?: string;
  recentOrder?: string;
  photo?: string;
}

export interface Visit {
  id: string;
  farmerId: string;
  date: string;
  time: string;
  status: 'completed' | 'pending' | 'upcoming';
  visitFrequency: string;
  previousVisitDate?: string;
  remarks?: string;
  report?: {
    cropCondition: string;
    notes: string;
    photos: string[];
    recommendations: string;
  }
}

export const mockFarmers: Farmer[] = [
  {
    id: 'f1',
    name: 'Kuppusamy',
    phone: '+91 98765 43210',
    address: 'Vetiver & Organic Farm - Block A, Thondamuthur',
    latitude: 10.9930,
    longitude: 76.8220,
    farmArea: '4.5 Acres',
    cropType: 'Vetiver & Turmeric',
    customerType: 'both',
    cropDetails: 'Vetiver (3.0 Acres) + Turmeric (1.5 Acres)',
    fertilizerDetails: 'Vermicompost (500kg/season) & Bio-NPK Granules',
    recentOrder: '50kg Bio-NPK Granules (Delivered)',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'f2',
    name: 'Subramani',
    phone: '+91 87654 32109',
    address: 'Horticultural Estate - Block B, Pollachi',
    latitude: 10.6620,
    longitude: 77.0060,
    farmArea: '4.0 Acres',
    cropType: 'Coconut & Cocoa (Commercial)',
    customerType: 'fertilizer',
    cropDetails: 'Commercial Plantation Crop',
    fertilizerDetails: 'Organic Manure, Neem Cake & Liquid Bio-Fertilizer',
    recentOrder: '100L Liquid Growth Booster (In Transit)',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'f3',
    name: 'Muthuvel',
    phone: '+91 76543 21098',
    address: 'Contract Farm - Block C, Kinathukadavu',
    latitude: 10.8170,
    longitude: 77.0140,
    farmArea: '3.5 Acres',
    cropType: 'Contract Vetiver Saplings',
    customerType: 'crop',
    cropDetails: 'Exclusive Vetiver Root Slips for Industrial Distillation',
    fertilizerDetails: 'Supplied under buyback contract',
    recentOrder: '5,000 Certified Vetiver Slips (Ready)',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'f4',
    name: 'Perumal',
    phone: '+91 65432 10987',
    address: 'Spice & Agronomy Fields - Block D, Sulur',
    latitude: 11.0260,
    longitude: 77.1260,
    farmArea: '5.0 Acres',
    cropType: 'Organic Pepper & Vetiver',
    customerType: 'both',
    cropDetails: 'Pepper intercropped with Vetiver border rows',
    fertilizerDetails: 'Enriched Compost, Bio-Potash & Micronutrient Foliar',
    recentOrder: '200kg Enriched Vermicompost (Delivered)',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'f5',
    name: 'Lakshmi Devi',
    phone: '+91 94444 12345',
    address: 'Greenhouse & Natural Farm - Udumalpet',
    latitude: 10.5840,
    longitude: 77.2480,
    farmArea: '2.0 Acres',
    cropType: 'Exotic Veg & Millets',
    customerType: 'fertilizer',
    cropDetails: 'Organic Kitchen & Millets Garden',
    fertilizerDetails: 'Panchagavya, Neem Kernel Cake & Bio-Pesticide',
    recentOrder: '25kg Neem Pellets (Delivered)',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'f6',
    name: 'Murugan S',
    phone: '+91 94555 67890',
    address: 'Delta Agronomy Lands - Thanjavur',
    latitude: 10.7870,
    longitude: 79.1378,
    farmArea: '6.0 Acres',
    cropType: 'Organic Paddy & Vetiver',
    customerType: 'both',
    cropDetails: 'Traditional Ponni Organic Paddy & Vetiver Bunds',
    fertilizerDetails: 'Azospirillum, Phosphobacteria & Farmyard Bio-Manure',
    recentOrder: '75kg Bio-Manure Blend (Processing)',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
  }
];

export const mockVisits: Visit[] = [
  {
    id: 'v1',
    farmerId: 'f1',
    date: 'Aug 12, 2025',
    time: '10:30 AM',
    status: 'pending',
    visitFrequency: 'Every 15 Days',
    previousVisitDate: 'Jul 28, 2025',
    remarks: 'Regular field inspection and growth monitoring. Check for moisture levels.',
  },
  {
    id: 'v2',
    farmerId: 'f2',
    date: 'Aug 12, 2025',
    time: '01:00 PM',
    status: 'pending',
    visitFrequency: 'Every 30 Days',
    previousVisitDate: 'Jul 12, 2025',
    remarks: 'Check root development and organic manure application.',
  },
  {
    id: 'v3',
    farmerId: 'f3',
    date: 'Aug 12, 2025',
    time: '03:30 PM',
    status: 'upcoming',
    visitFrequency: 'Every 15 Days',
    previousVisitDate: 'Jul 28, 2025',
    remarks: 'Assess irrigation requirements.',
  },
  {
    id: 'v4',
    farmerId: 'f4',
    date: 'Aug 05, 2025',
    time: '11:00 AM',
    status: 'completed',
    visitFrequency: 'Every 15 Days',
    previousVisitDate: 'Jul 20, 2025',
    remarks: 'Harvesting stage inspection.',
    report: {
      cropCondition: 'Excellent',
      notes: 'Roots have grown deep and thick. Ready for partial harvest.',
      photos: ['https://example.com/photo1.jpg'],
      recommendations: 'Proceed with partial harvest in sector 2.'
    }
  }
];

export const getVisitWithFarmer = (visitId: string) => {
  const cleanId = String(visitId || "");
  const visit =
    mockVisits.find(
      (v) =>
        v.id === cleanId ||
        v.id === `v${cleanId}` ||
        v.id.replace("v", "") === cleanId
    ) || mockVisits[0];

  const farmer =
    mockFarmers.find((f) => f.id === visit?.farmerId) || mockFarmers[0];

  return { ...visit, farmer };
};

export const getTodayVisits = () => {
  const today = 'Aug 12, 2025';
  return mockVisits
    .filter(v => v.date === today)
    .map(v => ({ ...v, farmer: mockFarmers.find(f => f.id === v.farmerId) }));
};

export const dashboardStats = {
  totalVisits: 3,
  completed: 2,
  pending: 1,
  adminTarget: {
    monthlyGoal: 50,
    currentProgress: 35,
    message: "You're 70% towards your monthly goal!"
  },
  attendance: {
    clockIn: '08:45 AM',
    status: 'Present',
    location: 'Coimbatore Hub'
  }
};

export const employeeProfile = {
  name: 'Ramesh Kumar',
  role: 'Field Officer',
  id: 'EMP1008',
  phone: '+91 98765 43210',
  email: 'ramesh.kumar@infinity.com',
  department: 'Field Operations'
};
