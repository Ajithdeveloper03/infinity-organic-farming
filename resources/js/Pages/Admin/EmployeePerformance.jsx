import React, { useState, useMemo } from 'react';
import AdminLayout from './AdminLayout';
import { 
    Fuel, Navigation, UserCheck, Star, Trophy, Clock, Search, Filter, ChevronDown, Download, X
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAlert } from '../../Components/AlertSystem';

export default function EmployeePerformance() {
    const { t } = useTranslation();
    const { triggerInfo } = useAlert();
    const [searchQuery, setSearchQuery] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [department, setDepartment] = useState('all');
    const [showDeptDropdown, setShowDeptDropdown] = useState(false);

    const performanceData = [
        { name: 'Rajesh Kumar', route: 'HQ → Farm A → Farm B → HQ', distance: 42.5, fuel: 148.75, dept: 'Field' },
        { name: 'Suresh Menon', route: 'HQ → Farm X → Farm Y', distance: 28.0, fuel: 98.00, dept: 'Field' },
        { name: 'Priya D.', route: 'HQ → Farm C → Farm D → Farm E', distance: 55.2, fuel: 193.20, dept: 'Agronomy' },
        { name: 'Murugan P.', route: 'HQ → Farm P → HQ', distance: 18.5, fuel: 64.75, dept: 'Field' },
    ];

    const filteredData = useMemo(() => {
        return performanceData.filter(e => {
            const matchSearch = e.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchDept = department === 'all' || e.dept === department;
            return matchSearch && matchDept;
        });
    }, [searchQuery, department]);

    const handleExport = () => {
        triggerInfo(`Exporting performance report${filterDate ? ` for ${filterDate}` : ''}. Download will begin shortly.`);
    };

    return (
        <AdminLayout>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-heading font-extrabold text-gray-900">{t('Performance Logs')}</h1>
                    <p className="text-gray-500 mt-1 font-medium text-sm">Distance tracking, fuel reimbursements, and attendance logs.</p>
                </div>
                <button onClick={handleExport} className="flex items-center px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition shadow-sm">
                    <Download className="w-4 h-4 mr-2" /> Export Report
                </button>
            </div>

            {/* Filter Bar */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                        type="text"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder={t('Search by officer name...')} 
                        className="w-full pl-10 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                    />
                    {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"><X className="w-4 h-4" /></button>}
                </div>
                <div className="flex w-full md:w-auto gap-3 overflow-x-auto pb-1 md:pb-0 hide-scrollbar">
                    <input type="date" value={filterDate} onChange={e => setFilterDate(e.target.value)}
                        className="cursor-pointer bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all" />
                    <div className="relative">
                        <button onClick={() => setShowDeptDropdown(!showDeptDropdown)}
                            className={`flex items-center px-4 py-2 border rounded-xl text-sm font-bold transition-colors whitespace-nowrap ${
                                department !== 'all' ? 'bg-green-50 border-green-300 text-green-700' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                            }`}>
                            <Filter className="w-4 h-4 mr-2 text-gray-400" />
                            {department === 'all' ? 'Department' : department} <ChevronDown className="w-3 h-3 ml-2" />
                        </button>
                        {showDeptDropdown && (
                            <div className="absolute top-full mt-1 right-0 min-w-[140px] bg-white border border-gray-200 rounded-xl shadow-lg z-30 overflow-hidden">
                                {['all', 'Field', 'Agronomy', 'Admin'].map(d => (
                                    <button key={d} onClick={() => { setDepartment(d); setShowDeptDropdown(false); }}
                                        className={`w-full text-left px-4 py-2.5 text-sm font-bold hover:bg-gray-50 ${department === d ? 'text-green-600' : 'text-gray-700'}`}>
                                        {d === 'all' ? 'All Departments' : d}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Distance & Fuel Tracker */}
                <div className="col-span-1 lg:col-span-2 space-y-8">
                    <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                        <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                            <h2 className="text-xl font-heading font-bold text-gray-900 flex items-center group-hover:text-green-600 transition-colors">
                                <div className="p-2 bg-green-50 rounded-xl mr-3 border border-green-100 shadow-sm">
                                    <Fuel className="w-5 h-5 text-green-600" />
                                </div>
                                Daily Fuel & Distance Audit
                            </h2>
                        </div>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b-2 border-gray-100 text-xs font-bold uppercase tracking-wider text-gray-400">
                                        <th className="pb-4 pl-2">Officer Name</th>
                                        <th className="pb-4 text-right">Route Hops</th>
                                        <th className="pb-4 text-right">Total Distance</th>
                                        <th className="pb-4 text-right pr-2">Est. Fuel Allowance</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {filteredData.length === 0 && (
                                        <tr><td colSpan={4} className="py-8 text-center text-gray-400 font-medium text-sm">No officers match your search.</td></tr>
                                    )}
                                    {filteredData.map((e, i) => (
                                        <tr key={i} className="cursor-pointer border-b border-gray-50 hover:bg-gray-50 transition group/row">
                                            <td className="py-5 pl-2 font-bold text-gray-900 group-hover/row:text-green-600 transition-colors">{e.name}</td>
                                            <td className="py-5 text-right font-medium text-gray-500">{e.route}</td>
                                            <td className="py-5 text-right font-bold text-green-600 text-lg">{e.distance} km</td>
                                            <td className="py-5 text-right font-bold text-gray-900 pr-2">₹ {e.fuel.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm relative overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-orange-50 to-transparent rounded-bl-full -mr-10 -mt-10 pointer-events-none"></div>

                        <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4 relative z-10">
                            <h2 className="text-xl font-heading font-bold text-gray-900 flex items-center group-hover:text-orange-600 transition-colors">
                                <div className="p-2 bg-orange-50 rounded-xl mr-3 border border-orange-100 shadow-sm">
                                    <UserCheck className="w-5 h-5 text-orange-600" />
                                </div>
                                Attendance Ledger (Selfie Checks)
                            </h2>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="cursor-pointer bg-gray-50 border border-gray-100 p-4 rounded-2xl flex flex-col items-center shadow-sm hover:shadow-md transition-all group/card hover:border-orange-200">
                                    <div className="w-20 h-20 bg-white rounded-full mb-4 border-4 border-white shadow-md overflow-hidden relative group-hover/card:scale-105 transition-transform">
                                        <img src={`https://ui-avatars.com/api/?name=User&background=f97316&color=fff&random=${i}`} alt="Selfie" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 ring-4 ring-inset ring-orange-500/20 rounded-full"></div>
                                    </div>
                                    <p className="text-sm font-bold text-gray-900 text-center">Officer {i}</p>
                                    <div className="mt-2 bg-white px-3 py-1 rounded-full border border-gray-200 flex items-center shadow-sm group-hover/card:border-orange-300 transition-colors">
                                        <Clock className="w-3 h-3 mr-1.5 text-orange-500" />
                                        <span className="text-xs font-bold text-orange-600">08:30 AM</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Behavior Matrix */}
                <div className="col-span-1">
                    <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm h-full relative overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-green-50 to-transparent rounded-tr-full -ml-8 -mb-8 pointer-events-none"></div>

                        <h2 className="text-xl font-heading font-bold text-gray-900 flex items-center mb-6 border-b border-gray-100 pb-4 relative z-10 group-hover:text-green-600 transition-colors">
                            <div className="p-2 bg-green-500 rounded-xl mr-3 shadow-sm text-white">
                                <Trophy className="w-5 h-5" />
                            </div>
                            Behavior Matrix
                        </h2>
                        
                        <div className="space-y-4 relative z-10">
                            {[
                                { name: 'Rajesh Kumar', rating: 4.8, reviews: 24, bad: 0 },
                                { name: 'Anita Raj', rating: 4.5, reviews: 18, bad: 1 },
                                { name: 'Karthik S.', rating: 3.2, reviews: 12, bad: 3 },
                            ].map((officer, i) => (
                                <div key={i} className="cursor-pointer bg-gray-50 border border-gray-100 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-green-200 transition-all group/matrix">
                                    <div className="flex justify-between items-center mb-3">
                                        <p className="font-bold text-gray-900 group-hover/matrix:text-green-600 transition-colors">{officer.name}</p>
                                        <div className="flex items-center bg-white px-2.5 py-1 rounded-lg border border-gray-200 shadow-sm group-hover/matrix:border-amber-200 transition-colors">
                                            <Star className="w-3.5 h-3.5 text-amber-400 mr-1.5 fill-amber-400" />
                                            <span className="text-sm font-bold text-gray-900">{officer.rating}</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between text-[10px] font-bold text-gray-400 mt-4 border-t border-gray-200 pt-3 uppercase tracking-wider">
                                        <span>Total Reviews: {officer.reviews}</span>
                                        <span className={`px-2 py-0.5 rounded flex items-center ${officer.bad > 0 ? 'bg-red-50 text-red-500 border border-red-100' : 'bg-gray-100 text-gray-500 border border-gray-200'}`}>
                                            Flags: {officer.bad}
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
