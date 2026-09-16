import React, { useState, useMemo } from 'react';
import AdminLayout from './AdminLayout';
import { 
    UserCheck, Star, Trophy, Search, Filter, ChevronDown, Download, X, CheckCircle2
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAlert } from '../../Components/AlertSystem';

export default function EmployeePerformance({ employees = [], period = '' }) {
    const { t } = useTranslation();
    const { triggerInfo } = useAlert();
    const [searchQuery, setSearchQuery] = useState('');
    const [regionFilter, setRegionFilter] = useState('all');
    const [showRegionDropdown, setShowRegionDropdown] = useState(false);

    const regions = ['all', ...Array.from(new Set(employees.map(e => e.region)))];

    const filteredData = useMemo(() => {
        return employees.filter(e => {
            const matchSearch = e.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchRegion = regionFilter === 'all' || e.region === regionFilter;
            return matchSearch && matchRegion;
        });
    }, [searchQuery, regionFilter, employees]);

    const handleExport = () => {
        triggerInfo(t('Exporting performance report. Download will begin shortly.'));
    };

    return (
        <AdminLayout>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{t('Performance Analytics')}</h1>
                    <p className="text-gray-500 mt-1 text-sm">{t('Monthly performance scoring for')} {period}</p>
                </div>
                <button onClick={handleExport} className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition shadow-sm">
                    <Download className="w-4 h-4 mr-2" /> {t('Export Report')}
                </button>
            </div>

            {/* Filter Bar */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                        type="text"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder={t('Search by officer name...')} 
                        className="w-full pl-9 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                    />
                    {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"><X className="w-4 h-4" /></button>}
                </div>
                <div className="flex w-full md:w-auto gap-3">
                    <div className="relative">
                        <button onClick={() => setShowRegionDropdown(!showRegionDropdown)}
                            className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                            <Filter className="w-4 h-4 mr-2 text-gray-400" />
                            {regionFilter === 'all' ? t('All Regions') : regionFilter} <ChevronDown className="w-4 h-4 ml-2 text-gray-400" />
                        </button>
                        {showRegionDropdown && (
                            <div className="absolute top-full mt-1 right-0 min-w-[140px] bg-white border border-gray-200 rounded-xl shadow-lg z-30 py-1">
                                {regions.map(r => (
                                    <button key={r} onClick={() => { setRegionFilter(r); setShowRegionDropdown(false); }}
                                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${regionFilter === r ? 'font-bold text-green-700 bg-green-50/50' : 'text-gray-700'}`}>
                                        {r === 'all' ? t('All Regions') : r}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                <div className="col-span-1 lg:col-span-2 space-y-6">
                    {/* Performance Leaderboard */}
                    <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                        <div className="flex items-center mb-6">
                            <Trophy className="w-5 h-5 text-gray-400 mr-2" />
                            <h2 className="text-lg font-bold text-gray-900">{t('Performance Leaderboard')}</h2>
                        </div>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-100 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                        <th className="pb-3 px-2">{t('Officer Name')}</th>
                                        <th className="pb-3 text-center">{t('Visits (Month)')}</th>
                                        <th className="pb-3 text-center">{t('Attendance')}</th>
                                        <th className="pb-3 text-right pr-2">{t('Total Score')}</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm divide-y divide-gray-50">
                                    {filteredData.length === 0 && (
                                        <tr><td colSpan={4} className="py-8 text-center text-gray-500">{t('No officers match your search.')}</td></tr>
                                    )}
                                    {filteredData.map((e, i) => (
                                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                                            <td className="py-4 px-2">
                                                <div className="font-semibold text-gray-900">{e.name}</div>
                                                <div className="text-xs text-gray-500 mt-0.5">{e.employee_code}</div>
                                            </td>
                                            <td className="py-4 text-center text-gray-600">{e.visits_month} / {e.target_visits}</td>
                                            <td className="py-4 text-center text-gray-600">{e.attendance_rate}%</td>
                                            <td className="py-4 text-right font-bold text-green-700 pr-2">{e.score} {t('pts')}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Removed Attendance Ledger to simplify page and focus on core metrics */}
                </div>

                {/* Behavior Matrix */}
                <div className="col-span-1">
                    <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm h-full">
                        <div className="flex items-center mb-6">
                            <Star className="w-5 h-5 text-gray-400 mr-2" />
                            <h2 className="text-lg font-bold text-gray-900">{t('Behavior Matrix')}</h2>
                        </div>
                        
                        <div className="space-y-3">
                            {filteredData.slice(0, 6).map((officer, i) => (
                                <div key={i} className="bg-gray-50 border border-gray-100 p-4 rounded-xl">
                                    <div className="flex justify-between items-center mb-2">
                                        <p className="font-semibold text-gray-900 text-sm">{officer.name}</p>
                                        <div className="flex items-center bg-white px-2 py-0.5 rounded text-xs border border-gray-200">
                                            <Star className="w-3 h-3 text-amber-400 mr-1 fill-amber-400" />
                                            <span className="font-medium">{officer.avg_rating || 'N/A'}</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
                                        <span>{t('Total Visits:')} {officer.total_visits}</span>
                                        <span className={`px-2 py-0.5 rounded font-medium ${officer.score < 50 ? 'text-red-700 bg-red-50' : 'text-green-700 bg-green-50'}`}>
                                            {t('Score:')} {officer.score}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
