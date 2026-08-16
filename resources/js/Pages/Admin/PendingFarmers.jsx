import React, { useState, useMemo } from 'react';
import AdminLayout from './AdminLayout';
import { 
    CheckCircle, XCircle, Map, User, Smartphone, 
    AlertTriangle, ShieldCheck, MapPin, Search, Filter, ChevronDown, X
} from 'lucide-react';
import { useAlert } from '../../Components/AlertSystem';
import { useTranslation } from 'react-i18next';

export default function PendingFarmers({ farmers = [] }) {
    const { triggerInfo, triggerSuccess } = useAlert();
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');

    const [mockFarmers, setMockFarmers] = useState(farmers.length > 0 ? farmers : [
        { id: 1, user: { name: 'Muthusamy', phone: '+91 9876543210' }, land_size_acres: '4.5', land_latitude: '11.0168', land_longitude: '76.9558', land_address: 'Coimbatore South, Tamil Nadu', creator: { name: 'Officer Rajesh' } },
        { id: 2, user: { name: 'Kandasamy', phone: '+91 8765432109' }, land_size_acres: '2.0', land_latitude: '11.0256', land_longitude: '76.9612', land_address: 'Pollachi, Tamil Nadu', creator: { name: 'Officer Suresh' } },
        { id: 3, user: { name: 'Lakshmi Devi', phone: '+91 7654321098' }, land_size_acres: '3.2', land_latitude: '11.1205', land_longitude: '77.0143', land_address: 'Erode District, Tamil Nadu', creator: { name: 'Officer Priya' } },
    ]);

    const filteredFarmers = useMemo(() => {
        return mockFarmers.filter(f => {
            const q = searchQuery.toLowerCase();
            return f.user.name.toLowerCase().includes(q) || f.user.phone.includes(q) || f.land_address.toLowerCase().includes(q);
        });
    }, [mockFarmers, searchQuery]);

    const handleApprove = (id, name) => {
        setMockFarmers(prev => prev.filter(f => f.id !== id));
        triggerSuccess(`Farmer ${name} approved successfully! SMS credentials sent.`);
    };

    const handleReject = (id, name) => {
        setMockFarmers(prev => prev.filter(f => f.id !== id));
        triggerInfo(`Farmer ${name} application rejected and archived.`);
    };

    return (
        <AdminLayout>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-heading font-extrabold text-gray-900">{t('Pending Approvals')}</h1>
                    <p className="text-gray-500 mt-1 font-medium text-sm">Review board for new farmer onboarding & location verification.</p>
                </div>
                <div className="bg-orange-50 text-orange-600 border border-orange-100 px-5 py-2.5 rounded-xl flex items-center font-bold shadow-sm">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    {filteredFarmers.length} Pending
                </div>
            </div>

            {/* Filter & Category Bar */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder={t('Search by farmer name, phone, or location...')} 
                        className="w-full pl-10 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                    />
                    {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"><X className="w-4 h-4" /></button>}
                </div>
                <div className="flex w-full md:w-auto gap-3 overflow-x-auto pb-1 md:pb-0 hide-scrollbar">
                    <button onClick={() => setActiveCategory('all')}
                        className={`px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-all whitespace-nowrap ${
                            activeCategory === 'all' ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-green-500/30' : 'bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100'
                        }`}>
                        Awaiting Review ({mockFarmers.length})
                    </button>
                    <button onClick={() => setActiveCategory('docs')}
                        className={`px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-all whitespace-nowrap ${
                            activeCategory === 'docs' ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-green-500/30' : 'bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100'
                        }`}>
                        Missing Documents
                    </button>
                </div>
            </div>

            {/* Review Board Grid */}
            <div className="grid grid-cols-1 gap-8">
                {filteredFarmers.length === 0 && (
                    <div className="bg-white border border-gray-100 rounded-[2rem] p-16 text-center text-gray-400 font-medium shadow-sm">
                        {searchQuery ? `No farmers match "${searchQuery}".` : 'No pending farmers. All caught up! 🎉'}
                    </div>
                )}
                {filteredFarmers.map((farmer) => (
                    <div key={farmer.id} className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm flex flex-col md:flex-row group transition-all hover:shadow-md">
                        
                        {/* Data Column */}
                        <div className="p-8 md:w-1/2 flex flex-col justify-between relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-50 to-transparent rounded-bl-full -mr-10 -mt-10 pointer-events-none"></div>

                            <div className="relative z-10">
                                <div className="flex items-start justify-between mb-8 cursor-pointer">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center shadow-sm text-white group-hover:scale-105 transition-transform">
                                            <User className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-heading font-bold text-gray-900">{farmer.user.name}</h3>
                                            <p className="text-sm font-bold text-gray-500 flex items-center mt-1">
                                                <Smartphone className="w-4 h-4 mr-1 text-green-400" /> {farmer.user.phone}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="bg-gray-50 text-gray-600 text-[10px] font-bold px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm uppercase tracking-wider">
                                        By: {farmer.creator.name}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mt-6">
                                    <div className="cursor-pointer bg-gray-50 p-4 rounded-2xl border border-gray-100 shadow-sm transition-colors hover:border-green-200">
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Land Size</p>
                                        <p className="text-2xl font-heading font-bold text-gray-900 mt-1">{farmer.land_size_acres} <span className="text-sm font-sans text-gray-500">Acres</span></p>
                                    </div>
                                    <div className="cursor-pointer bg-gray-50 p-4 rounded-2xl border border-gray-100 shadow-sm transition-colors hover:border-green-200">
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Crop Stage</p>
                                        <p className="text-lg font-heading font-bold text-gray-900 mt-1.5">Pre-Planting</p>
                                    </div>
                                </div>
                                
                                <div className="mt-4 bg-gray-50 p-4 rounded-2xl border border-gray-100 shadow-sm cursor-pointer hover:border-green-200 transition-colors">
                                    <p className="text-[10px] text-green-500 font-bold uppercase mb-1.5 flex items-center tracking-wider">
                                        <MapPin className="w-3 h-3 mr-1.5" /> Registered Address
                                    </p>
                                    <p className="text-sm font-medium text-gray-700 leading-relaxed">{farmer.land_address}</p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-8 pt-6 border-t border-gray-100 relative z-10">
                                <button 
                                    onClick={() => handleApprove(farmer.id, farmer.user.name)}
                                    className="cursor-pointer flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-3 rounded-xl font-bold flex items-center justify-center transition-colors shadow-md shadow-green-500/20"
                                >
                                    <ShieldCheck className="w-5 h-5 mr-2" /> Approve
                                </button>
                                <button
                                    onClick={() => handleReject(farmer.id, farmer.user.name)}
                                    className="cursor-pointer px-5 py-3 bg-white border border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300 rounded-xl font-bold flex items-center justify-center transition-colors shadow-sm">
                                    <XCircle className="w-5 h-5 mr-2" /> Reject
                                </button>
                            </div>
                        </div>

                        {/* Map Verification Column */}
                        <div className="md:w-1/2 bg-gray-50 relative border-l border-gray-100 min-h-[300px] cursor-pointer">
                            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 mb-4 transition-transform hover:scale-110 text-green-200 hover:text-green-500">
                                    <Map className="w-8 h-8" />
                                </div>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Map Verification Required</span>
                                <div className="flex space-x-4 mt-5">
                                    <div className="flex items-center font-bold text-[10px] bg-white px-3 py-1.5 rounded-full text-gray-600 border border-gray-200 shadow-sm">
                                        <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div> Capture Loc
                                    </div>
                                    <div className="flex items-center font-bold text-[10px] bg-white px-3 py-1.5 rounded-full text-gray-600 border border-gray-200 shadow-sm">
                                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 mr-2"></div> Address Loc
                                    </div>
                                </div>
                            </div>
                            
                            <div className="absolute top-6 right-6 bg-white/95 backdrop-blur border border-gray-100 p-4 rounded-2xl shadow-sm max-w-xs z-20 hover:shadow-md transition-shadow">
                                <p className="text-[10px] text-gray-400 font-bold mb-1.5 uppercase tracking-widest">Geographic Match</p>
                                <div className="flex items-end justify-between">
                                    <span className="text-3xl font-heading font-bold text-green-600">98%</span>
                                    <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-md border border-green-100">High Confidence</span>
                                </div>
                                <p className="text-[10px] font-medium text-gray-500 mt-2">Captured within 50m of farm bounds.</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </AdminLayout>
    );
}
