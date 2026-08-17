import React from 'react';
import AdminLayout from '../AdminLayout';
import { Link } from '@inertiajs/react';
import { Map, Leaf, ChevronRight, Search, Phone, Plus, Filter, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function FarmerList() {
    const { t } = useTranslation();

    const farmers = [
        { id: 'FAR-001', name: 'Muthusamy', size: '4.5 Acres', crop: 'Vetiver', location: 'Coimbatore South', img: 'https://images.unsplash.com/photo-1599423631163-fdf6dafb2d98?auto=format&fit=crop&q=80&w=300&h=300' },
        { id: 'FAR-002', name: 'Kandasamy', size: '2.0 Acres', crop: 'Vetiver', location: 'Pollachi', img: 'https://images.unsplash.com/photo-1592982537447-6f2c6a0c5c4e?auto=format&fit=crop&q=80&w=300&h=300' },
        { id: 'FAR-003', name: 'Velusamy', size: '6.2 Acres', crop: 'Vetiver', location: 'Tirupur', img: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=300&h=300' },
    ];

    return (
        <AdminLayout>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-heading font-extrabold text-gray-900">{t('Farmer Directory')}</h1>
                    <p className="text-gray-500 mt-1 font-medium text-sm">Verified farm properties and agricultural profiles.</p>
                </div>
                <Link href="/admin/farmers/register" className="cursor-pointer bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-bold flex items-center transition-all shadow-md shadow-slate-900/10">
                    <Plus className="w-5 h-5 mr-1" /> Register Farmer
                </Link>
            </div>

            {/* Filter & Category Bar */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Search by FAR ID, Name, or Location..." 
                        className="cursor-pointer w-full pl-10 pr-4 py-2 border border-gray-200 bg-gray-50 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all text-sm"
                    />
                </div>
                <div className="flex w-full md:w-auto gap-3 overflow-x-auto pb-1 md:pb-0 hide-scrollbar">
                    <button className="flex items-center px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-100 transition whitespace-nowrap">
                        Crop Type <ChevronDown className="w-3 h-3 ml-2" />
                    </button>
                    <button className="flex items-center px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-100 transition whitespace-nowrap">
                        Location <ChevronDown className="w-3 h-3 ml-2" />
                    </button>
                    <button className="flex items-center px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-100 transition whitespace-nowrap">
                        <Filter className="w-4 h-4 mr-2 text-gray-400" /> More Filters
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {farmers.map((farm) => (
                    <Link key={farm.id} href={`/admin/farmers/${farm.id}`} className="cursor-pointer group bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-md transition-all hover:border-green-200 flex flex-col">
                        <div className="relative h-40">
                            <img src={farm.img} alt={farm.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-slate-900/80"></div>
                            <div className="absolute bottom-4 left-4 text-white">
                                <h3 className="font-heading font-bold text-xl">{farm.name}</h3>
                                <p className="text-xs font-mono font-bold text-green-300 tracking-wider mt-1">{farm.id}</p>
                            </div>
                        </div>
                        <div className="p-5 bg-white flex-1 flex flex-col justify-between relative">
                            {/* Floating icon */}
                            <div className="absolute -top-6 right-4 w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-100 text-slate-700">
                                <Leaf className="w-6 h-6" />
                            </div>
                            
                            <div className="space-y-3 mb-6 pt-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500 font-bold">Land Size</span>
                                    <span className="font-heading font-bold text-gray-900">{farm.size}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500 font-bold">Main Crop</span>
                                    <span className="font-heading font-bold text-gray-900">{farm.crop}</span>
                                </div>
                                <div className="flex items-center text-sm font-medium text-gray-700 mt-4 pt-3 border-t border-gray-100">
                                    <Map className="w-4 h-4 text-slate-700 mr-2" /> {farm.location}
                                </div>
                            </div>
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider group-hover:text-slate-700 transition-colors">View Farm Profile</span>
                                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-slate-800 transition-colors group-hover:translate-x-1" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </AdminLayout>
    );
}
