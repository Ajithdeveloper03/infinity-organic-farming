import React, { useState, useMemo } from 'react';
import AdminLayout from './AdminLayout';
import { router, usePage } from '@inertiajs/react';
import { 
    CheckCircle, XCircle, Map, User, Smartphone, 
    AlertTriangle, ShieldCheck, MapPin, Search, Filter, ChevronDown, X
} from 'lucide-react';
import { useAlert } from '../../Components/AlertSystem';
import { useTranslation } from 'react-i18next';

export default function PendingFarmers({ farmers = [] }) {
    const { triggerInfo, triggerSuccess } = useAlert();
    const { t } = useTranslation();
    const { flash } = usePage().props;
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [processing, setProcessing] = useState(null);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

    const filteredFarmers = useMemo(() => {
        return farmers.filter(f => {
            const q = searchQuery.toLowerCase();
            return f.name.toLowerCase().includes(q) ||
                   f.phone?.includes(q) ||
                   (f.district || '').toLowerCase().includes(q) ||
                   (f.village || '').toLowerCase().includes(q);
        });
    }, [farmers, searchQuery]);

    const handleApprove = (id, name) => {
        if (processing) return;
        setProcessing(id + '_approve');
        router.post(`/admin/pending-farmers/${id}/approve`, {}, {
            onSuccess: () => { triggerSuccess(`Farmer ${name} approved successfully!`); setProcessing(null); },
            onError: () => setProcessing(null),
        });
    };

    const handleReject = (id, name) => {
        if (processing) return;
        if (!confirm(`Are you sure you want to reject ${name}?`)) return;
        setProcessing(id + '_reject');
        router.post(`/admin/pending-farmers/${id}/reject`, {}, {
            onSuccess: () => { triggerInfo(`Farmer ${name} application rejected.`); setProcessing(null); },
            onError: () => setProcessing(null),
        });
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
                    {farmers.length} Pending
                </div>
            </div>
            {flash?.success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 font-medium">{flash.success}</div>
            )}

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
                    {/* Grid / List Toggle */}
                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl p-1 mr-2">
                        <button
                            type="button"
                            onClick={() => setViewMode('grid')}
                            className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-slate-900 font-bold' : 'text-gray-400 hover:text-gray-600'}`}
                            title="Grid View"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                        </button>
                        <button
                            type="button"
                            onClick={() => setViewMode('list')}
                            className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-slate-900 font-bold' : 'text-gray-400 hover:text-gray-600'}`}
                            title="List View"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                        </button>
                    </div>
                    <button onClick={() => setActiveCategory('all')}
                        className={`px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-all whitespace-nowrap ${
                            activeCategory === 'all' ? 'bg-slate-900 text-white shadow-slate-900/10' : 'bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100'
                        }`}>
                        Awaiting Review ({farmers.length})
                    </button>
                    <button onClick={() => setActiveCategory('docs')}
                        className={`px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-all whitespace-nowrap ${
                            activeCategory === 'docs' ? 'bg-slate-900 text-white shadow-slate-900/10' : 'bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100'
                        }`}>
                        Missing Documents
                    </button>
                </div>
            </div>

            {viewMode === 'list' ? (
                <div className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm">
                    {filteredFarmers.length === 0 && (
                        <div className="p-16 text-center text-gray-400 font-medium">
                            {searchQuery ? `No farmers match "${searchQuery}".` : 'No pending farmers. All caught up!'}
                        </div>
                    )}
                    {filteredFarmers.length > 0 && (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-gray-100">
                                        <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Farmer</th>
                                        <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Contact</th>
                                        <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Location</th>
                                        <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Reg. By</th>
                                        <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredFarmers.map(farmer => (
                                        <tr key={farmer.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                            <td className="py-4 px-6">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-white font-bold text-sm">
                                                        <User className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <p className="font-heading font-bold text-sm text-gray-900">{farmer.name}</p>
                                                        <p className="text-[10px] font-medium text-gray-500 mt-0.5">{farmer.land_acres || '–'} Acres</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="text-xs font-medium text-gray-600 flex items-center">
                                                    <Smartphone className="w-3 h-3 mr-1 text-green-500" /> {farmer.phone}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="text-xs font-medium text-gray-600 flex items-center">
                                                    <MapPin className="w-3 h-3 mr-1" /> {farmer.village}, {farmer.district}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="bg-gray-50 text-gray-600 text-[10px] font-bold px-2 py-1 rounded-md border border-gray-200">
                                                    {farmer.registered_by}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <div className="flex items-center justify-end space-x-2">
                                                    <button 
                                                        onClick={() => handleApprove(farmer.id, farmer.name)}
                                                        disabled={processing !== null}
                                                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors disabled:opacity-50"
                                                    >
                                                        {processing === farmer.id + '_approve' ? '...' : 'Approve'}
                                                    </button>
                                                    <button 
                                                        onClick={() => handleReject(farmer.id, farmer.name)}
                                                        disabled={processing !== null}
                                                        className="px-3 py-1.5 bg-white border border-red-200 text-red-500 hover:bg-red-50 rounded-lg text-xs font-bold transition-colors disabled:opacity-50"
                                                    >
                                                        {processing === farmer.id + '_reject' ? '...' : 'Reject'}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-8">
                    {filteredFarmers.length === 0 && (
                        <div className="bg-white border border-gray-100 rounded-[2rem] p-16 text-center text-gray-400 font-medium shadow-sm">
                            {searchQuery ? `No farmers match "${searchQuery}".` : 'No pending farmers. All caught up!'}
                        </div>
                    )}
                    {filteredFarmers.map((farmer) => (
                        <div key={farmer.id} className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm flex flex-col md:flex-row group transition-all hover:shadow-md">
                            
                            {/* Data Column */}
                            <div className="p-8 md:w-1/2 flex flex-col justify-between relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -mr-10 -mt-10 pointer-events-none"></div>

                                <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-8 cursor-pointer">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center shadow-sm text-white group-hover:scale-105 transition-transform">
                                                <User className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-heading font-bold text-gray-900">{farmer.name}</h3>
                                                <p className="text-sm font-bold text-gray-500 flex items-center mt-1">
                                                    <Smartphone className="w-4 h-4 mr-1 text-green-400" /> {farmer.phone}
                                                </p>
                                            </div>
                                        </div>
                                        <span className="bg-gray-50 text-gray-600 text-[10px] font-bold px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm uppercase tracking-wider">
                                            By: {farmer.registered_by}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mt-6">
                                        <div className="cursor-pointer bg-gray-50 p-4 rounded-2xl border border-gray-100 shadow-sm transition-colors hover:border-green-200">
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Land Size</p>
                                            <p className="text-2xl font-heading font-bold text-gray-900 mt-1">{farmer.land_acres || '–'} <span className="text-sm font-sans text-gray-500">Acres</span></p>
                                        </div>
                                        <div className="cursor-pointer bg-gray-50 p-4 rounded-2xl border border-gray-100 shadow-sm transition-colors hover:border-green-200">
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">KYC Status</p>
                                            <p className="text-lg font-heading font-bold text-gray-900 mt-1.5 capitalize">{farmer.kyc_status}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-4 bg-gray-50 p-4 rounded-2xl border border-gray-100 shadow-sm cursor-pointer hover:border-green-200 transition-colors">
                                        <p className="text-[10px] text-slate-700 font-bold uppercase mb-1.5 flex items-center tracking-wider">
                                            <MapPin className="w-3 h-3 mr-1.5" /> Location
                                        </p>
                                        <p className="text-sm font-medium text-gray-700 leading-relaxed">{farmer.village}, {farmer.district}</p>
                                        <p className="text-xs text-gray-400 mt-1">Submitted: {farmer.submitted_on}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-8 pt-6 border-t border-gray-100 relative z-10">
                                    <button 
                                        onClick={() => handleApprove(farmer.id, farmer.name)}
                                        disabled={processing !== null}
                                        className="cursor-pointer flex-1 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white py-3 rounded-xl font-bold flex items-center justify-center transition-colors shadow-md shadow-slate-900/10"
                                    >
                                        <ShieldCheck className="w-5 h-5 mr-2" />
                                        {processing === farmer.id + '_approve' ? 'Approving...' : 'Approve'}
                                    </button>
                                    <button
                                        onClick={() => handleReject(farmer.id, farmer.name)}
                                        disabled={processing !== null}
                                        className="cursor-pointer px-5 py-3 bg-white border border-red-200 text-red-500 hover:bg-red-50 disabled:opacity-50 hover:border-red-300 rounded-xl font-bold flex items-center justify-center transition-colors shadow-sm">
                                        <XCircle className="w-5 h-5 mr-2" />
                                        {processing === farmer.id + '_reject' ? 'Rejecting...' : 'Reject'}
                                    </button>
                                </div>
                            </div>

                            {/* Map Verification Column */}
                            <div className="md:w-1/2 bg-gray-50 relative border-l border-gray-100 min-h-[300px] cursor-pointer">
                                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 mb-4 transition-transform hover:scale-110 text-green-200 hover:text-slate-700">
                                        <Map className="w-8 h-8" />
                                    </div>
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Map Verification Required</span>
                                    <div className="flex space-x-4 mt-5">
                                        <div className="flex items-center font-bold text-[10px] bg-white px-3 py-1.5 rounded-full text-gray-600 border border-gray-200 shadow-sm">
                                            <div className="w-2 h-2 rounded-full bg-slate-800 mr-2"></div> Capture Loc
                                        </div>
                                        <div className="flex items-center font-bold text-[10px] bg-white px-3 py-1.5 rounded-full text-gray-600 border border-gray-200 shadow-sm">
                                            <div className="w-2 h-2 rounded-full bg-slate-700 mr-2"></div> Address Loc
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur border border-gray-100 p-4 rounded-2xl shadow-sm max-w-xs z-20 hover:shadow-md transition-shadow">
                                    <p className="text-[10px] text-gray-400 font-bold mb-1.5 uppercase tracking-widest">Geographic Match</p>
                                    <div className="flex items-end justify-between">
                                        <span className="text-3xl font-heading font-bold text-slate-800">98%</span>
                                        <span className="text-[10px] font-bold text-slate-800 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">High Confidence</span>
                                    </div>
                                    <p className="text-[10px] font-medium text-gray-500 mt-2">Captured within 50m of farm bounds.</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </AdminLayout>
    );
}
