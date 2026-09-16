import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import { router, Link } from '@inertiajs/react';
import {
    Clock, MapPin, Camera, Leaf, FileText, CheckCircle2, AlertCircle, Navigation, Search, ChevronDown, X, User, Image as ImageIcon, Star, ChevronRight
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Visits({ visits = {}, employees = [], filters = {} }) {
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [dateRange, setDateRange] = useState(filters.days || '30');
    const [showDateDropdown, setShowDateDropdown] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [viewMode, setViewMode] = useState('grid');

    const visitsData = visits.data || [];
    
    const totalVisits = visits.total || visitsData.length;
    const avgDistance = visitsData.length ? (visitsData.reduce((acc, v) => acc + parseFloat(v.distance_from_previous_farmer_km || 0), 0) / visitsData.length).toFixed(1) : 0;
    
    const handleApplyFilters = () => {
        setProcessing(true);
        router.get('/admin/visits', { search: searchQuery, days: dateRange }, {
            preserveState: true,
            preserveScroll: true,
            onFinish: () => setProcessing(false)
        });
    };

    const dateRangeOptions = [
        { label: 'Last 7 Days', value: '7' }, 
        { label: 'Last 30 Days', value: '30' }, 
        { label: 'Last 3 Months', value: '90' }, 
        { label: 'All Time', value: 'all' }
    ];

    // Helper to get a random cover image from public/images
    const getCoverImage = (id) => `/images/image${(id % 12) + 1}.jpg`;

    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto space-y-8">
                
                {/* Maximalist Header Section */}
                <div className="relative rounded-[3rem] overflow-hidden bg-slate-900/60 text-white p-10 md:p-14 shadow-2xl">
                    <img src="/images/image5.jpg" className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-overlay" alt="Header Background" />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/20 via-slate-900/20 to-transparent"></div>
                    
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
                        <div className="max-w-2xl">
                            <span className="inline-block py-1.5 px-4 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px] uppercase tracking-widest mb-4 border border-emerald-500/30">
                                {t('Field Operations')}
                            </span>
                            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 leading-tight">
                                {t('Visit Analytics')}
                            </h1>
                            <p className="text-slate-300 font-medium text-lg max-w-xl leading-relaxed">
                                {t('Dive into the rich visual data of your field officers. Track agronomy conditions, travel routes, and real-time farmer engagement.')}
                            </p>
                        </div>
                        
                        <div className="flex gap-4">
                            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl text-center min-w-[140px]">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{t('Total Visits')}</p>
                                <p className="text-4xl font-bold text-white">{totalVisits}</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl text-center min-w-[140px]">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{t('Avg Travel')}</p>
                                <p className="text-4xl font-bold text-emerald-400">{avgDistance}<span className="text-lg text-emerald-600/50 ml-1">km</span></p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Streamlined Filter Bar */}
                <div className="bg-white rounded-3xl p-3 shadow-xl shadow-slate-200/40 border border-slate-100 flex flex-col md:flex-row gap-3 items-center">
                    <div className="relative w-full md:flex-1">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleApplyFilters()}
                            placeholder={t('Search by officer or farmer...')}
                            className="w-full pl-14 pr-10 py-4 bg-transparent border-none text-base font-bold focus:ring-0 text-slate-900 placeholder-slate-300 outline-none"
                        />
                        {searchQuery && (
                            <button onClick={() => { setSearchQuery(''); handleApplyFilters(); }} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors bg-slate-100 rounded-full p-1">
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                    
                    <div className="w-px h-10 bg-slate-100 hidden md:block"></div>
                    
                    <div className="flex w-full md:w-auto gap-3 px-3 pb-3 md:pb-0 overflow-x-auto hide-scrollbar">
                        <div className="relative min-w-[160px]">
                            <button onClick={() => setShowDateDropdown(!showDateDropdown)}
                                className="w-full flex items-center justify-between px-5 py-4 bg-slate-50 hover:bg-slate-100 rounded-2xl text-sm font-bold text-slate-700 transition-colors border border-slate-200/50">
                                {dateRangeOptions.find(o => o.value === dateRange)?.label} <ChevronDown className="w-4 h-4 text-slate-400" />
                            </button>
                            {showDateDropdown && (
                                <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-slate-100 rounded-2xl shadow-2xl z-30 overflow-hidden py-2">
                                    {dateRangeOptions.map(opt => (
                                        <button key={opt.value} onClick={() => { setDateRange(opt.value); setShowDateDropdown(false); }}
                                            className={`w-full text-left px-5 py-3 text-sm font-bold hover:bg-slate-50 transition-colors ${dateRange === opt.value ? 'text-emerald-600 bg-emerald-50/50' : 'text-slate-600'}`}>
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <button onClick={handleApplyFilters} disabled={processing}
                            className="px-8 py-4 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/20 transition-all disabled:opacity-50 flex items-center whitespace-nowrap">
                            {processing ? t('Applying...') : t('Apply Filters')}
                        </button>
                    </div>
                    
                </div>

                {/* Maximalist Grid Layout for Visits */}
                {visitsData.length === 0 ? (
                    <div className="bg-white rounded-[3rem] p-20 text-center shadow-2xl shadow-slate-200/40 border border-slate-100">
                        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                            <Leaf className="w-10 h-10 text-slate-300" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">{t('No visits found')}</h2>
                        <p className="text-slate-500 font-medium text-lg">
                            {searchQuery ? `${t('No visits match')} "${searchQuery}".` : t('No visits recorded yet.')}
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {visitsData.map(visit => (
                            <Link key={visit.id} href={`/admin/visits/${visit.id}`} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-8 hover:shadow-md hover:border-emerald-200 transition-all group">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-200 shadow-sm border border-slate-100 flex-shrink-0">
                                        <img src={getCoverImage(visit.id)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Farm Cover" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">{visit.farmer.user.name}</h3>
                                        <p className="text-xs font-medium text-slate-500 mt-1 flex items-center">
                                            <MapPin className="w-3 h-3 mr-1" /> {t('Farm Profile')}
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-end gap-4 md:gap-12 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100">
                                            <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(visit.employee.name)}&background=random`} alt={visit.employee.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t('Inspected By')}</p>
                                            <p className="text-sm font-bold text-slate-700">{visit.employee.name}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col justify-center">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md">{visit.date}</span>
                                            <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md flex items-center">
                                                <Clock className="w-3 h-3 mr-1" /> {visit.check_in_time} - {visit.check_out_time}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="hidden md:flex items-center justify-center text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all">
                                        <ChevronRight className="w-5 h-5" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
                
            </div>
        </AdminLayout>
    );
}
