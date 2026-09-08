import React, { useState } from 'react';
import AdminLayout from '../AdminLayout';
import { Link, usePage, router } from '@inertiajs/react';
import { Map, Leaf, ChevronRight, Search, Phone, Plus, Filter, ChevronDown, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const kycBadge = (status) => {
    if (status === 'verified') return 'bg-green-50 text-green-700 border-green-200';
    if (status === 'rejected') return 'bg-red-50 text-red-700 border-red-200';
    return 'bg-amber-50 text-amber-600 border-amber-100';
};

const kycIcon = (status) => {
    if (status === 'verified') return <CheckCircle2 className="w-3 h-3" />;
    if (status === 'rejected') return <AlertCircle className="w-3 h-3" />;
    return <Clock className="w-3 h-3" />;
};

export default function FarmerList({ farmers = [], districts = [], filters = {} }) {
    const { t } = useTranslation();
    const { flash } = usePage().props;
    const [search, setSearch] = useState(filters.search || '');
    const [district, setDistrict] = useState(filters.district || '');
    const [kyc, setKyc] = useState(filters.kyc || '');
    const [category, setCategory] = useState(filters.category || 'crop');
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin/farmers', { search, district, kyc, category }, { preserveState: true, replace: true });
    };

    const handleDistrictChange = (d) => {
        const nd = district === d ? '' : d;
        setDistrict(nd);
        router.get('/admin/farmers', { search, district: nd, kyc, category }, { preserveState: true, replace: true });
    };

    const handleCategoryChange = (cat) => {
        setCategory(cat);
        router.get('/admin/farmers', { search, district, kyc, category: cat }, { preserveState: true, replace: true });
    };

    return (
        <AdminLayout>
            {flash?.success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 font-medium">
                    {flash.success}
                </div>
            )}

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-heading font-extrabold text-gray-900">{t('Farmer Directory')}</h1>
                    <p className="text-gray-500 mt-1 font-medium text-sm">{farmers.length} verified farm properties and agricultural profiles.</p>
                </div>
                <Link href="/admin/farmers/register" className="cursor-pointer bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-bold flex items-center transition-all shadow-md shadow-slate-900/10">
                    <Plus className="w-5 h-5 mr-1" /> Register Farmer
                </Link>
            </div>

            {/* Category Tabs */}
            <div className="flex space-x-4 mb-6 border-b border-gray-200">
                <button
                    onClick={() => handleCategoryChange('crop')}
                    className={`pb-4 px-2 text-sm font-bold transition-colors border-b-2 ${category === 'crop' ? 'border-green-600 text-green-700' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                    Crop Farmers (Vetiver, etc)
                </button>
                <button
                    onClick={() => handleCategoryChange('fertilizer')}
                    className={`pb-4 px-2 text-sm font-bold transition-colors border-b-2 ${category === 'fertilizer' ? 'border-green-600 text-green-700' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                    Fertilizer Customers
                </button>
                <button
                    onClick={() => handleCategoryChange('both')}
                    className={`pb-4 px-2 text-sm font-bold transition-colors border-b-2 ${category === 'both' ? 'border-green-600 text-green-700' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                    Both (Crop & Fertilizer)
                </button>
            </div>

            {/* Filter Bar */}
            <form onSubmit={handleSearch} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search by FAR ID, Name, or Phone..."
                        className="cursor-pointer w-full pl-10 pr-4 py-2 border border-gray-200 bg-gray-50 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all text-sm"
                    />
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

                    {districts.slice(0, 4).map(d => (
                        <button key={d} type="button" onClick={() => handleDistrictChange(d)}
                            className={`flex items-center px-4 py-2 rounded-xl text-sm font-bold transition whitespace-nowrap border ${district === d ? 'bg-slate-900 text-white border-slate-900' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'}`}>
                            {d}
                        </button>
                    ))}
                    <select value={kyc} onChange={e => { setKyc(e.target.value); router.get('/admin/farmers', { search, district, kyc: e.target.value }, { preserveState: true, replace: true }); }}
                        className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-600">
                        <option value="">All KYC</option>
                        <option value="verified">Verified</option>
                        <option value="pending">Pending</option>
                        <option value="rejected">Rejected</option>
                    </select>
                    <button type="submit" className="flex items-center px-4 py-2 bg-green-600 border border-green-600 text-white rounded-xl text-sm font-bold hover:bg-green-700 transition whitespace-nowrap">
                        <Search className="w-4 h-4 mr-2" /> Search
                    </button>
                </div>
            </form>

            {farmers.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                    <Leaf className="w-12 h-12 mx-auto mb-4 opacity-30" />
                    <p className="text-lg font-semibold">No farmers found</p>
                    <p className="text-sm mt-1">Try adjusting your search or register a new farmer.</p>
                </div>
            ) : viewMode === 'list' ? (
                <div className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-gray-100">
                                    <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Farmer</th>
                                    <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Acres / Crop</th>
                                    <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Location</th>
                                    <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider">KYC Status</th>
                                    <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {farmers.map(farm => (
                                    <tr key={farm.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 rounded-xl bg-slate-800 overflow-hidden flex items-center justify-center text-white font-bold text-sm">
                                                    {farm.farmer_photo ? (
                                                        <img src={farm.farmer_photo} alt={farm.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        farm.name[0]
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-heading font-bold text-sm text-gray-900">{farm.name}</p>
                                                    <p className="text-[10px] font-mono text-gray-500 mt-0.5">{farm.farmer_code}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="text-xs font-bold text-slate-700">
                                                {farm.land_acres || '–'} Acres
                                            </span>
                                            <p className="text-[10px] font-medium text-gray-500 mt-0.5">Vetiver</p>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="text-xs font-medium text-gray-600 flex items-center">
                                                <MapPin className="w-3 h-3 mr-1" /> {farm.village}, {farm.district}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className={`inline-flex flex-row items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase border ${kycBadge(farm.kyc_status)}`}>
                                                {kycIcon(farm.kyc_status)} <span className="ml-0.5">{farm.kyc_status}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <Link href={`/admin/farmers/${farm.id}`} className="text-sm font-bold text-green-600 hover:text-green-700 transition-colors">
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {farmers.map((farm) => (
                        <Link key={farm.id} href={`/admin/farmers/${farm.id}`} className="cursor-pointer group bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-md transition-all hover:border-green-200 flex flex-col">
                            <div className="relative h-40 bg-gradient-to-br from-slate-800 to-slate-900">
                                {farm.farmer_photo ? (
                                    <img src={farm.farmer_photo} alt={farm.name} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <Leaf className="w-16 h-16 text-green-400/30" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent" />
                                <div className="absolute bottom-4 left-4 text-white">
                                    <h3 className="font-heading font-bold text-xl">{farm.name}</h3>
                                    <p className="text-xs font-mono font-bold text-green-300 tracking-wider mt-1">{farm.farmer_code}</p>
                                </div>
                                <div className={`absolute top-4 right-4 flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider border ${kycBadge(farm.kyc_status)}`}>
                                    {kycIcon(farm.kyc_status)} {farm.kyc_status}
                                </div>
                            </div>
                            <div className="p-5 bg-white flex-1 flex flex-col justify-between">
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center text-sm font-medium text-gray-700">
                                        <Leaf className="w-4 h-4 text-green-600 mr-2" /> {farm.land_acres || '–'} Acres · Vetiver
                                    </div>
                                    <div className="flex items-center text-sm font-medium text-gray-700">
                                        <Map className="w-4 h-4 text-slate-700 mr-2" /> {farm.village}, {farm.district}
                                    </div>
                                    <div className="flex items-center text-sm font-medium text-gray-700">
                                        <Phone className="w-4 h-4 text-slate-700 mr-2" /> {farm.phone}
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1">Reg. by: {farm.registered_by}</p>
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider group-hover:text-slate-700 transition-colors">View Profile</span>
                                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-slate-800 transition-colors group-hover:translate-x-1" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </AdminLayout>
    );
}
