export interface Farmer {
  id: string;
  name: string;
  phone: string;
  address: string;
  latitude: number;
  longitude: number;
  farmArea: string;
  cropType: string;
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
    address: 'Vetiver Farm - Block A, Thondamuthur',
    latitude: 10.9930,
    longitude: 76.8220,
    farmArea: '2.5 Acres',
    cropType: 'Vetiver',
  },
  {
    id: 'f2',
    name: 'Subramani',
    phone: '+91 87654 32109',
    address: 'Vetiver Farm - Block B, Pollachi',
    latitude: 10.6620,
    longitude: 77.0060,
    farmArea: '4.0 Acres',
    cropType: 'Vetiver',
  },
  {
    id: 'f3',
    name: 'Muthuvel',
    phone: '+91 76543 21098',
    address: 'Vetiver Farm - Block C, Kinathukadavu',
    latitude: 10.8170,
    longitude: 77.0140,
    farmArea: '1.5 Acres',
    cropType: 'Vetiver',
  },
  {
    id: 'f4',
    name: 'Perumal',
    phone: '+91 65432 10987',
    address: 'Vetiver Farm - Block D, Sulur',
    latitude: 11.0260,
    longitude: 77.1260,
    farmArea: '3.0 Acres',
    cropType: 'Vetiver',
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
  const visit = mockVisits.find(v => v.id === visitId);
  if (!visit) return null;
  const farmer = mockFarmers.find(f => f.id === visit.farmerId);
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
