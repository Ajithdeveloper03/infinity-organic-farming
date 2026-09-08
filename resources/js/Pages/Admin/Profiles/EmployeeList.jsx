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
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

    // Format designation
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
                    <h1 className="text-3xl font-heading font-extrabold text-gray-900">{t('Employee Directory')}</h1>
                    <p className="text-gray-500 mt-1 font-medium text-sm">
                        {employees.length} field staff registered
                    </p>
                </div>
                <Link href="/admin/employees/create" className="cursor-pointer bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-bold flex items-center transition-all shadow-md shadow-slate-900/10">
                    <Plus className="w-5 h-5 mr-1" /> Register Employee
                </Link>
            </div>
            {/* Filter Bar */}
            <form onSubmit={handleSearch} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search by EMP ID, Name, or Phone..."
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

                    {regions.map(r => (
                        <button
                            key={r}
                            type="button"
                            onClick={() => handleRegionChange(r)}
                            className={`flex items-center px-4 py-2 rounded-xl text-sm font-bold transition whitespace-nowrap border ${
                                region === r
                                    ? 'bg-slate-900 text-white border-slate-900'
                                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            {r}
                        </button>
                    ))}
                    <button type="submit" className="flex items-center px-4 py-2 bg-green-600 border border-green-600 text-white rounded-xl text-sm font-bold hover:bg-green-700 transition whitespace-nowrap">
                        <Search className="w-4 h-4 mr-2" /> Search
                    </button>
                </div>
            </form>

            {employees.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                    <Shield className="w-12 h-12 mx-auto mb-4 opacity-30" />
                    <p className="text-lg font-semibold">No employees found</p>
                    <p className="text-sm mt-1">Try adjusting your search or register a new employee.</p>
                </div>
            ) : viewMode === 'list' ? (
                <div className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-gray-100">
                                    <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Employee</th>
                                    <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Designation</th>
                                    <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Region</th>
                                    <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Reports To</th>
                                    <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                                    <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
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
                    {employees.map((emp) => (
                        <Link key={emp.id} href={`/admin/employees/${emp.id}`} className="cursor-pointer group bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-md transition-all hover:border-green-200 flex flex-col">
                            <div className="p-6 border-b border-gray-100 bg-slate-50 relative">
                                <div className="absolute top-4 right-4 flex items-center gap-2">
                                    {emp.checked_in ? (
                                        <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider bg-green-50 text-green-700 border border-green-200">
                                            <CheckCircle2 className="w-3 h-3" /> Present
                                        </span>
                                    ) : (
                                        <span className="text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider bg-gray-50 text-gray-400 border border-gray-200">
                                            Not Checked In
                                        </span>
                                    )}
                                    <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider ${emp.status === 'active' ? 'bg-slate-50 text-slate-800 border border-slate-200' : 'bg-amber-50 text-amber-600 border border-amber-100'}`}>
                                        {emp.status}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-4 mt-2">
                                    <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center border-2 border-white shadow-sm group-hover:scale-105 transition-transform">
                                        <span className="text-white font-bold text-xl">{emp.name[0]}</span>
                                    </div>
                                    <div>
                                        <h3 className="font-heading font-bold text-lg text-gray-900 group-hover:text-slate-800 transition-colors">{emp.name}</h3>
                                        <p className="text-[10px] font-bold text-gray-500 font-mono bg-white px-2 py-0.5 rounded-lg inline-block mt-1 border border-gray-200 shadow-sm">{emp.employee_code}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-5 bg-white flex-1 flex flex-col justify-between">
                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center text-sm font-medium text-gray-700">
                                        <Shield className="w-4 h-4 text-slate-700 mr-2" /> {formatDesignation(emp.designation)}
                                    </div>
                                    <div className="flex items-center text-sm font-medium text-gray-700">
                                        <MapPin className="w-4 h-4 text-slate-700 mr-2" /> {emp.region}
                                    </div>
                                    <div className="flex items-center text-sm font-medium text-gray-700">
                                        <Phone className="w-4 h-4 text-slate-700 mr-2" /> {emp.phone}
                                    </div>
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
