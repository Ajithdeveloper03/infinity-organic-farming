import React from 'react';
import AdminLayout from '../AdminLayout';
import { Link } from '@inertiajs/react';
import { ArrowLeft, Map, Smartphone, FileText, CheckCircle2, Leaf, Clock, Navigation } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function FarmerDetail({ farmer = {}, visits = [] }) {
    const { t } = useTranslation();

    return (
        <AdminLayout>
            <div className="mb-6">
                <Link href="/admin/farmers" className="cursor-pointer inline-flex items-center text-sm font-bold text-gray-500 hover:text-slate-800 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back to Directory
                </Link>
            </div>

            {/* Farm Hero Header */}
            <div className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-md transition-shadow mb-8 group cursor-pointer">
                <div className="relative h-64 w-full bg-slate-800">
                    {farmer.farmer_photo ? (
                        <img src={farmer.farmer_photo} alt="Farmer" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-80" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center opacity-40">
                            <Leaf className="w-24 h-24 text-green-400" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent"></div>
                    <div className="absolute bottom-6 left-8 text-white">
                        <div className="flex items-center space-x-3 mb-2">
                            <span className="bg-slate-900/90 backdrop-blur text-white text-[10px] font-bold px-3 py-1 rounded-lg border border-slate-700/50 shadow-sm uppercase tracking-wider">
                                {farmer.farmer_code || 'N/A'}
                            </span>
                            {farmer.kyc_status === 'verified' && (
                                <span className="bg-green-600/90 backdrop-blur text-white text-[10px] font-bold px-3 py-1 rounded-lg border border-green-800/50 shadow-sm uppercase tracking-wider flex items-center">
                                    <CheckCircle2 className="w-3 h-3 mr-1" /> Verified Property
                                </span>
                            )}
                        </div>
                        <h1 className="text-4xl font-heading font-extrabold">{farmer.name}'s Farm</h1>
                        <p className="text-sm font-medium flex items-center mt-2 text-gray-200">
                            <Map className="w-4 h-4 mr-1.5 text-green-400" /> {farmer.village}, {farmer.district}
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100 bg-white">
                    <div className="p-5 text-center hover:bg-gray-50 transition-colors">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Total Land Size</p>
                        <p className="font-heading font-bold text-2xl text-gray-900">{farmer.land_acres || '–'} Acres</p>
                    </div>
                    <div className="p-5 text-center hover:bg-gray-50 transition-colors">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Primary Crop</p>
                        <p className="font-heading font-bold text-2xl text-slate-800">Vetiver</p>
                    </div>
                    <div className="p-5 text-center hover:bg-gray-50 transition-colors">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Current Stage</p>
                        <p className="font-heading font-bold text-xl text-gray-900 mt-1 capitalize">{farmer.crop_stage || 'Unknown'}</p>
                    </div>
                    <div className="p-5 text-center hover:bg-gray-50 transition-colors">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Contact</p>
                        <p className="font-bold text-sm text-gray-900 flex items-center justify-center mt-2"><Smartphone className="w-4 h-4 mr-1 text-slate-700" /> {farmer.phone}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Geolocation Details */}
                <div className="col-span-1 space-y-8">
                    <div className="bg-white border border-gray-100 rounded-[2rem] p-6 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                        <h3 className="text-sm font-heading font-bold text-gray-900 flex items-center mb-6">
                            <Navigation className="w-5 h-5 text-slate-700 mr-2" /> Registered Coordinates
                        </h3>
                        <div className="relative h-48 rounded-2xl overflow-hidden mb-6 border border-gray-100 bg-gray-50 flex items-center justify-center">
                            {/* Abstract map representation */}
                            <div className="absolute inset-0 opacity-10 bg-black/5"></div>
                            <Map className="w-10 h-10 text-green-300 relative z-10" />
                        </div>
                        <div className="flex justify-between space-x-4">
                            <div className="flex-1 bg-gray-50 border border-gray-100 rounded-xl p-3 text-center">
                                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Latitude</p>
                                <p className="text-sm font-bold text-gray-900">{farmer.land_latitude || 'N/A'}</p>
                            </div>
                            <div className="flex-1 bg-gray-50 border border-gray-100 rounded-xl p-3 text-center">
                                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Longitude</p>
                                <p className="text-sm font-bold text-gray-900">{farmer.land_longitude || 'N/A'}</p>
                            </div>
                        </div>
                        <p className="text-xs font-medium text-gray-500 mt-6 text-center bg-gray-50 p-2 rounded-xl">
                            Registered by <span className="font-bold text-gray-700">{farmer.registered_by}</span> on {farmer.joined}
                        </p>
                    </div>
                </div>

                {/* Inspection History */}
                <div className="col-span-1 lg:col-span-2">
                    <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm cursor-pointer hover:shadow-md transition-shadow h-full">
                        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                            <h3 className="text-xl font-heading font-bold text-gray-900 flex items-center">
                                <FileText className="w-5 h-5 text-orange-600 mr-2" /> Farm Inspection Log
                            </h3>
                            <span className="text-[10px] font-bold text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 uppercase tracking-wider">
                                {farmer.total_visits || 0} Total Visits
                            </span>
                        </div>

                        <div className="space-y-6">
                            {visits.length === 0 ? (
                                <div className="text-center text-gray-500 py-10">No visits recorded yet.</div>
                            ) : visits.map((visit, idx) => (
                                <div key={visit.id} className="flex items-start group">
                                    <div className="flex flex-col items-center mr-4">
                                        <div className={`w-10 h-10 rounded-xl ${idx === 0 ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-gray-50 border-gray-200 text-gray-400'} border flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-colors`}>
                                            <Leaf className="w-5 h-5" />
                                        </div>
                                        {idx !== visits.length - 1 && <div className="w-px h-full bg-gray-200 mt-2"></div>}
                                    </div>
                                    <div className={`flex-1 bg-gray-50 border border-gray-100 rounded-2xl p-5 shadow-sm ${idx !== 0 ? 'opacity-70 group-hover:opacity-100' : ''} group-hover:border-green-200 group-hover:shadow-md transition-all`}>
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <h4 className="font-bold text-gray-900">Farm Inspection</h4>
                                                <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mt-0.5">By {visit.employee_name}</p>
                                            </div>
                                            <span className={`text-xs font-bold flex items-center bg-white px-2 py-1 rounded-lg shadow-sm border border-gray-200 ${idx === 0 ? 'text-gray-500' : 'text-gray-400'}`}>
                                                <Clock className={`w-3 h-3 mr-1 ${idx === 0 ? 'text-green-400' : 'text-gray-400'}`} /> {visit.date}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-700 leading-relaxed">
                                            <strong>Notes:</strong> {visit.notes || 'No notes.'}
                                        </p>
                                        {visit.recommendations && (
                                            <p className="text-sm text-gray-700 leading-relaxed mt-2 border-t border-gray-200 pt-2">
                                                <strong>Recommendations:</strong> {visit.recommendations}
                                            </p>
                                        )}
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
