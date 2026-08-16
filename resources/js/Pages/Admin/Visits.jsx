import React, { useState, useMemo } from 'react';
import AdminLayout from './AdminLayout';
import { 
    CalendarCheck, Clock, MapPin, Camera, 
    Leaf, FileText, CheckCircle2, AlertCircle, Navigation, Search, Filter, ChevronDown, X
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Visits({ visits = [] }) {
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState('');
    const [dateRange, setDateRange] = useState('30');
    const [showDateDropdown, setShowDateDropdown] = useState(false);
    const [activeCategory, setActiveCategory] = useState('all');
    const mockVisits = visits.length > 0 ? visits : [
        {
            id: 1, farmer: { user: { name: 'Muthusamy' } }, employee: { name: 'Officer Rajesh' },
            distance_from_previous_farmer_km: 12.5, check_in_time: '09:15 AM', check_out_time: '10:45 AM',
            date: 'Aug 10, 2026', farm_condition_notes: 'Vetiver crop is showing good root propagation. Soil moisture is optimal. No pests visible.',
            recommendations: 'Apply organic compost in 2 weeks. Maintain current watering schedule.',
            media: [
                { type: 'photo', url: 'https://images.unsplash.com/photo-1599423631163-fdf6dafb2d98?auto=format&fit=crop&q=80&w=600&h=400', exif_lat: '11.0168', exif_lon: '76.9558', exif_time: '09:20 AM', verified: true },
                { type: 'photo', url: 'https://images.unsplash.com/photo-1592982537447-6f2c6a0c5c4e?auto=format&fit=crop&q=80&w=600&h=400', exif_lat: '11.0168', exif_lon: '76.9558', exif_time: '10:10 AM', verified: true }
            ]
        },
        {
            id: 2, farmer: { user: { name: 'Lakshmi Devi' } }, employee: { name: 'Officer Priya' },
            distance_from_previous_farmer_km: 8.2, check_in_time: '11:00 AM', check_out_time: '12:30 PM',
            date: 'Aug 11, 2026', farm_condition_notes: 'Soil needs irrigation. Sugarcane crop at early stage.',
            recommendations: 'Schedule irrigation within 3 days.',
            media: []
        }
    ];

    const filteredVisits = useMemo(() => {
        const q = searchQuery.toLowerCase();
        return mockVisits.filter(v =>
            v.farmer.user.name.toLowerCase().includes(q) ||
            v.employee.name.toLowerCase().includes(q)
        );
    }, [mockVisits, searchQuery]);

    const dateRangeOptions = [{ label: 'Last 7 Days', value: '7' }, { label: 'Last 30 Days', value: '30' }, { label: 'Last 3 Months', value: '90' }, { label: 'All Time', value: 'all' }];

    return (
        <AdminLayout>
            {/* Header & Analytics Summary Tier */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-heading font-extrabold text-gray-900">{t('Visit Audits')}</h1>
                    <p className="text-gray-500 mt-1 font-medium text-sm">Verify employee engagement, distances, and farm conditions.</p>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                        type="text"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder={t('Search by officer or farmer...')} 
                        className="w-full pl-10 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                    />
                    {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"><X className="w-4 h-4" /></button>}
                </div>
                <div className="flex w-full md:w-auto gap-3 overflow-x-auto pb-1 md:pb-0 hide-scrollbar">
                    {/* Date Range Dropdown */}
                    <div className="relative">
                        <button onClick={() => setShowDateDropdown(!showDateDropdown)}
                            className={`flex items-center px-4 py-2 border rounded-xl text-sm font-bold transition-colors ${
                                dateRange !== '30' ? 'bg-green-50 border-green-300 text-green-700' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                            } whitespace-nowrap`}>
                            {dateRangeOptions.find(o => o.value === dateRange)?.label} <ChevronDown className="w-3 h-3 ml-2" />
                        </button>
                        {showDateDropdown && (
                            <div className="absolute top-full mt-1 left-0 min-w-[150px] bg-white border border-gray-200 rounded-xl shadow-lg z-30 overflow-hidden">
                                {dateRangeOptions.map(opt => (
                                    <button key={opt.value} onClick={() => { setDateRange(opt.value); setShowDateDropdown(false); }}
                                        className={`w-full text-left px-4 py-2.5 text-sm font-bold hover:bg-gray-50 ${dateRange === opt.value ? 'text-green-600' : 'text-gray-700'}`}>
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <button onClick={() => setSearchQuery('')}
                        className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-green-500/30 transition-all whitespace-nowrap">
                        Apply Filters
                    </button>
                </div>
            </div>

            {/* Visits List */}
            <div className="space-y-6">
                {filteredVisits.length === 0 && (
                    <div className="bg-white border border-gray-100 rounded-[2rem] p-16 text-center text-gray-400 font-medium shadow-sm">
                        {searchQuery ? `No visits match "${searchQuery}".` : 'No visits recorded yet.'}
                    </div>
                )}
                {filteredVisits.map(visit => (
                    <div key={visit.id} className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col">
                        
                        {/* Elegant Header with Gradient Background */}
                        <div className="bg-gradient-to-r from-green-50 to-white p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between md:items-center">
                            <div className="flex items-center space-x-4 mb-4 md:mb-0">
                                <div className="bg-white p-3 rounded-2xl border border-green-100 shadow-sm group-hover:scale-105 transition-transform text-green-600">
                                    <Leaf className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-gray-900 text-xl leading-tight">Farm: {visit.farmer.user.name}</h3>
                                    <p className="text-xs font-bold text-gray-500 mt-1">Inspected by <span className="text-green-600">{visit.employee.name}</span> on {visit.date}</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-start md:items-end gap-2">
                                <div className="inline-flex items-center text-xs font-bold bg-green-50 text-green-600 px-3 py-1.5 rounded-lg border border-green-100 shadow-sm">
                                    <Navigation className="w-3 h-3 mr-1.5" /> Travel: {visit.distance_from_previous_farmer_km} km
                                </div>
                                <div className="text-xs font-bold text-gray-400 flex items-center">
                                    <Clock className="w-3 h-3 mr-1.5" /> Duration: 1h 30m
                                </div>
                            </div>
                        </div>

                        {/* Content Grid */}
                        <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                            
                            {/* Timing & Logs Column */}
                            <div className="col-span-1 space-y-6">
                                <div>
                                    <h4 className="text-[10px] font-bold text-green-500 uppercase mb-3 flex items-center tracking-wider">
                                        <Clock className="w-4 h-4 mr-2" /> Visit Timeline
                                    </h4>
                                    <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 space-y-3 hover:border-green-200 transition-colors cursor-pointer">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs font-bold text-gray-500">Check-in</span>
                                            <span className="text-sm font-heading font-bold text-gray-900">{visit.check_in_time}</span>
                                        </div>
                                        <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                                            <span className="text-xs font-bold text-gray-500">Check-out</span>
                                            <span className="text-sm font-heading font-bold text-gray-900">{visit.check_out_time}</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-[10px] font-bold text-green-500 uppercase mb-3 flex items-center tracking-wider">
                                        <FileText className="w-4 h-4 mr-2" /> Agronomy Log
                                    </h4>
                                    <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 text-sm shadow-inner hover:border-green-200 transition-colors">
                                        <div className="mb-4">
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Farm Conditions</span>
                                            <p className="font-medium text-gray-700 leading-relaxed text-xs">{visit.farm_condition_notes}</p>
                                        </div>
                                        <div className="pt-4 border-t border-gray-200">
                                            <span className="text-[10px] font-bold text-orange-500 uppercase tracking-wider block mb-1.5">Recommendations</span>
                                            <p className="font-medium text-gray-700 leading-relaxed text-xs">{visit.recommendations}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Media Confirmation Grid */}
                            <div className="col-span-1 lg:col-span-2">
                                <h4 className="text-[10px] font-bold text-green-500 uppercase mb-3 flex items-center tracking-wider">
                                    <Camera className="w-4 h-4 mr-2" /> Media Confirmation & Metadata
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {visit.media.map((media, index) => (
                                        <div key={index} className="bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden flex flex-col hover:border-green-200 transition-colors group/media">
                                            <div className="relative overflow-hidden h-40">
                                                <img src={media.url} alt="Farm" className="w-full h-full object-cover transition-transform duration-700 group-hover/media:scale-105" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent"></div>
                                                <div className="absolute bottom-3 left-3 text-white">
                                                    <p className="text-[10px] font-bold tracking-wider uppercase text-gray-300">Capture Time</p>
                                                    <p className="font-heading font-bold text-sm">{media.exif_time}</p>
                                                </div>
                                            </div>
                                            <div className="p-4 flex-1">
                                                <div className="flex justify-between items-start mb-3">
                                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">GPS Data</span>
                                                    {media.verified ? (
                                                        <span className="flex items-center text-[10px] font-bold bg-green-50 text-green-600 px-2 py-1 rounded-full border border-green-100">
                                                            <CheckCircle2 className="w-3 h-3 mr-1" /> Verified
                                                        </span>
                                                    ) : (
                                                        <span className="flex items-center text-[10px] font-bold bg-red-50 text-red-500 px-2 py-1 rounded-full border border-red-100">
                                                            <AlertCircle className="w-3 h-3 mr-1" /> Mismatch
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex space-x-2">
                                                    <div className="flex-1 bg-white border border-gray-100 rounded-xl p-2 text-center shadow-sm">
                                                        <p className="text-[9px] font-bold text-gray-400 uppercase mb-0.5">Latitude</p>
                                                        <p className="text-xs font-bold text-gray-700">{media.exif_lat}</p>
                                                    </div>
                                                    <div className="flex-1 bg-white border border-gray-100 rounded-xl p-2 text-center shadow-sm">
                                                        <p className="text-[9px] font-bold text-gray-400 uppercase mb-0.5">Longitude</p>
                                                        <p className="text-xs font-bold text-gray-700">{media.exif_lon}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </AdminLayout>
    );
}
