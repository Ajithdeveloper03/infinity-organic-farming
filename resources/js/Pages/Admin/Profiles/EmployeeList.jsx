import React, { useState } from 'react';
import AdminLayout from '../AdminLayout';
import { Link, usePage, router } from '@inertiajs/react';
import { Shield, MapPin, ChevronRight, Search, Filter, Plus, ChevronDown, CheckCircle2, Circle, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function EmployeeList({ employees = [], regions = [], filters = {} }) {
    const { t } = useTranslation();
    const { flash } = usePage().props;
    const [search, setSearch] = useState(filters.search || '');
    const [region, setRegion] = useState(filters.region || '');
    const [viewMode, setViewMode] = useState('grid'); 

    const formatDesignation = (designation) => {
        if (!designation) return 'Field Officer';
        return designation.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };
    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin/employees', { search, region }, { preserveState: true, replace: true });
    };
    const handleRegionChange = (r) => {
        const newRegion = region === r ? '' : r;
        setRegion(newRegion);
        router.get('/admin/employees', { search, region: newRegion }, { preserveState: true, replace: true });
    };
    return (
        <AdminLayout>
            {flash?.success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 font-medium flex justify-between items-center">
                    <div>
                        <p>{flash.success}</p>
                        {flash.generated_password && (
                            <p className="mt-1">
                                <strong>Generated Password: </strong>
                                <span className="bg-white px-2 py-1 rounded text-green-900 border border-green-300 ml-2 font-mono">{flash.generated_password}</span>
                            </p>
                        )}
                    </div>
                </div>
            )}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-gray-900">{t('Employee Directory')}</h1>
                    <p className="text-gray-500 mt-1 font-medium text-sm">
                        {employees.length} {t('field staff registered')}
                    </p>
                </div>
                <Link href="/admin/employees/create" className="cursor-pointer bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-bold flex items-center transition-all shadow-md shadow-slate-900/10">
                    <Plus className="w-5 h-5 mr-1" /> {t('Register Employee')}
                </Link>
            </div>
            <form onSubmit={handleSearch} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder={t('Search by EMP ID, Name, or Phone...')}
                        className="cursor-pointer w-full pl-10 pr-4 py-2 border border-gray-200 bg-gray-50 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all text-sm"
                    />
                </div>
                <div className="flex w-full md:w-auto gap-3 overflow-x-auto pb-1 md:pb-0 hide-scrollbar">
                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl p-1 mr-2">
                        <button
                            type="button"
                            onClick={() => setViewMode('grid')}
                            className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-slate-900 font-bold' : 'text-gray-400 hover:text-gray-600'}`}
                            title={t('Grid View')}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                        </button>
                        <button
                            type="button"
                            onClick={() => setViewMode('list')}
                            className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-slate-900 font-bold' : 'text-gray-400 hover:text-gray-600'}`}
                            title={t('List View')}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                        </button>
                    </div>
                    <div className="relative">
                        <select
                            value={region}
                            onChange={(e) => handleRegionChange(e.target.value)}
                            className="appearance-none cursor-pointer bg-gray-50 border border-gray-200 text-gray-700 text-sm font-bold rounded-xl px-4 py-2 pr-8 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                        >
                            <option value="">{t('All Regions')}</option>
                            {regions.map(r => (
                                <option key={r} value={r}>{r}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                    <button type="submit" className="flex items-center px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition whitespace-nowrap shadow-sm shadow-slate-900/10">
                        <Search className="w-4 h-4 mr-2" /> {t('Search')}
                    </button>
                </div>
            </form>
            {employees.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                    <Shield className="w-12 h-12 mx-auto mb-4 opacity-30" />
                    <p className="text-lg font-semibold">{t('No employees found')}</p>
                    <p className="text-sm mt-1">{t('Try adjusting your search or register a new employee.')}</p>
                </div>
            ) : viewMode === 'list' ? (
                <div className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-gray-100">
                                    <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider">{t('Employee')}</th>
                                    <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider">{t('Designation')}</th>
                                    <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider">{t('Region')}</th>
                                    <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider">{t('Reports To')}</th>
                                    <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider">{t('Status')}</th>
                                    <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">{t('Actions')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map(emp => (
                                    <tr key={emp.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-white font-bold text-sm">
                                                    {emp.name[0]}
                                                </div>
                                                <div>
                                                    <p className="font-heading font-bold text-sm text-gray-900">{emp.name}</p>
                                                    <p className="text-[10px] font-mono text-gray-500 mt-0.5">{emp.employee_code}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded-md">
                                                {formatDesignation(emp.designation)}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="text-xs font-medium text-gray-600 flex items-center">
                                                <MapPin className="w-3 h-3 mr-1" /> {emp.region}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-xs font-medium text-gray-600">
                                            {emp.manager_name}
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex flex-col gap-1 items-start">
                                                {emp.checked_in ? (
                                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md uppercase bg-green-50 text-green-700 border border-green-200 flex items-center gap-1">
                                                        <CheckCircle2 className="w-3 h-3" /> Present
                                                    </span>
                                                ) : (
                                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md uppercase bg-gray-50 text-gray-400 border border-gray-200">
                                                        Not Checked In
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <Link href={`/admin/employees/${emp.id}`} className="text-sm font-bold text-green-600 hover:text-green-700 transition-colors">
                                                {t('View')}
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                    {employees.map((emp) => (
                        <Link key={emp.id} href={`/admin/employees/${emp.id}`} className="cursor-pointer group relative h-72 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col">
                            <img src={`/images/image${(emp.id % 12) + 1}.jpg`} alt="Cover" className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                            
                            <div className="absolute top-4 right-4 flex items-center gap-2">
                                {emp.checked_in ? (
                                    <span className="flex items-center gap-1 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider bg-emerald-500/90 backdrop-blur-md text-white shadow-sm border border-emerald-400/50">
                                        <CheckCircle2 className="w-3 h-3 text-white" /> {t('Present')}
                                    </span>
                                ) : (
                                    <span className="text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider bg-slate-900/50 backdrop-blur-md text-white shadow-sm border border-white/20">
                                        {t('Absent')}
                                    </span>
                                )}
                            </div>
                            
                            <div className="absolute bottom-5 left-5 right-5 z-10">
                                <h3 className="font-heading font-bold text-2xl text-white mb-1 group-hover:text-emerald-300 transition-colors">{emp.name}</h3>
                                <p className="text-xs font-medium text-slate-300 flex items-center mb-4">
                                    <MapPin className="w-3 h-3 mr-1" /> {emp.region}
                                </p>
                                
                                <div className="flex items-center justify-between border-t border-white/20 pt-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
                                            <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(emp.name)}&background=random`} alt={emp.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-white uppercase tracking-wider">{formatDesignation(emp.designation)}</p>
                                            <p className="text-[10px] font-mono text-emerald-400 mt-0.5">{emp.employee_code}</p>
                                        </div>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                                        <ChevronRight className="w-4 h-4 text-white" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </AdminLayout>
    );
}