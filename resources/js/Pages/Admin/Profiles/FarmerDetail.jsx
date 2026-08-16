import React from 'react';
import AdminLayout from '../AdminLayout';
import { Link } from '@inertiajs/react';
import { ArrowLeft, Map, Smartphone, FileText, CheckCircle2, Leaf, Clock, Navigation } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function FarmerDetail({ id }) {
    const { t } = useTranslation();

    const farm = {
        id: id,
        name: 'Muthusamy',
        phone: '+91 8765432109',
        size: '4.5 Acres',
        crop: 'Vetiver',
        stage: 'Growing phase',
        location: 'Coimbatore South, Tamil Nadu',
        lat: '11.0168',
        lon: '76.9558',
        registered_by: 'Officer Rajesh',
        img: 'https://images.unsplash.com/photo-1599423631163-fdf6dafb2d98?auto=format&fit=crop&q=80&w=1200&h=400'
    };

    return (
        <AdminLayout>
            <div className="mb-6">
                <Link href="/admin/farmers" className="cursor-pointer inline-flex items-center text-sm font-bold text-gray-500 hover:text-green-600 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back to Directory
                </Link>
            </div>

            {/* Farm Hero Header */}
            <div className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-md transition-shadow mb-8 group cursor-pointer">
                <div className="relative h-64 w-full">
                    <img src={farm.img} alt="Farm Landscape" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent"></div>
                    <div className="absolute bottom-6 left-8 text-white">
                        <div className="flex items-center space-x-3 mb-2">
                            <span className="bg-gradient-to-r from-emerald-600 to-teal-600/90 backdrop-blur text-white text-[10px] font-bold px-3 py-1 rounded-lg border border-green-500/50 shadow-sm uppercase tracking-wider">
                                {farm.id}
                            </span>
                            <span className="bg-orange-600/90 backdrop-blur text-white text-[10px] font-bold px-3 py-1 rounded-lg border border-orange-500/50 shadow-sm uppercase tracking-wider flex items-center">
                                <CheckCircle2 className="w-3 h-3 mr-1" /> Verified Property
                            </span>
                        </div>
                        <h1 className="text-4xl font-heading font-extrabold">{farm.name}'s Farm</h1>
                        <p className="text-sm font-medium flex items-center mt-2 text-gray-200">
                            <Map className="w-4 h-4 mr-1.5 text-green-400" /> {farm.location}
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100 bg-white">
                    <div className="p-5 text-center hover:bg-gray-50 transition-colors">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Total Land Size</p>
                        <p className="font-heading font-bold text-2xl text-gray-900">{farm.size}</p>
                    </div>
                    <div className="p-5 text-center hover:bg-gray-50 transition-colors">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Primary Crop</p>
                        <p className="font-heading font-bold text-2xl text-green-600">{farm.crop}</p>
                    </div>
                    <div className="p-5 text-center hover:bg-gray-50 transition-colors">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Current Stage</p>
                        <p className="font-heading font-bold text-xl text-gray-900 mt-1">{farm.stage}</p>
                    </div>
                    <div className="p-5 text-center hover:bg-gray-50 transition-colors">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Contact</p>
                        <p className="font-bold text-sm text-gray-900 flex items-center justify-center mt-2"><Smartphone className="w-4 h-4 mr-1 text-orange-500" /> {farm.phone}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Geolocation Details */}
                <div className="col-span-1 space-y-8">
                    <div className="bg-white border border-gray-100 rounded-[2rem] p-6 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                        <h3 className="text-sm font-heading font-bold text-gray-900 flex items-center mb-6">
                            <Navigation className="w-5 h-5 text-green-500 mr-2" /> Registered Coordinates
                        </h3>
                        <div className="relative h-48 rounded-2xl overflow-hidden mb-6 border border-gray-100 bg-gray-50 flex items-center justify-center">
                            {/* Abstract map representation */}
                            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')]"></div>
                            <Map className="w-10 h-10 text-green-300 relative z-10" />
                        </div>
                        <div className="flex justify-between space-x-4">
                            <div className="flex-1 bg-gray-50 border border-gray-100 rounded-xl p-3 text-center">
                                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Latitude</p>
                                <p className="text-sm font-bold text-gray-900">{farm.lat}</p>
                            </div>
                            <div className="flex-1 bg-gray-50 border border-gray-100 rounded-xl p-3 text-center">
                                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Longitude</p>
                                <p className="text-sm font-bold text-gray-900">{farm.lon}</p>
                            </div>
                        </div>
                        <p className="text-xs font-medium text-gray-500 mt-6 text-center bg-gray-50 p-2 rounded-xl">
                            Registered by <span className="font-bold text-gray-700">{farm.registered_by}</span>
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
                                4 Total Visits
                            </span>
                        </div>

                        <div className="space-y-6">
                            {/* Mock Visit Item */}
                            <div className="flex items-start group">
                                <div className="flex flex-col items-center mr-4">
                                    <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center text-green-600 group-hover:bg-gradient-to-r from-emerald-600 to-teal-600 group-hover:text-white transition-colors">
                                        <Leaf className="w-5 h-5" />
                                    </div>
                                    <div className="w-px h-full bg-gray-200 mt-2 group-last:hidden"></div>
                                </div>
                                <div className="flex-1 bg-gray-50 border border-gray-100 rounded-2xl p-5 shadow-sm group-hover:border-green-200 group-hover:shadow-md transition-all">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h4 className="font-bold text-gray-900">Routine Checkup</h4>
                                            <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mt-0.5">By Rajesh Kumar</p>
                                        </div>
                                        <span className="text-xs font-bold text-gray-500 flex items-center bg-white px-2 py-1 rounded-lg shadow-sm border border-gray-200">
                                            <Clock className="w-3 h-3 mr-1 text-green-400" /> Aug 10, 2026
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        Crop is progressing well. Recommended organic compost mixture to boost soil nitrogen levels. 
                                    </p>
                                </div>
                            </div>
                            
                            {/* Older Mock Visit Item */}
                            <div className="flex items-start group">
                                <div className="flex flex-col items-center mr-4">
                                    <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 group-hover:border-orange-300 group-hover:text-orange-500 transition-colors">
                                        <Leaf className="w-5 h-5" />
                                    </div>
                                    <div className="w-px h-full bg-gray-200 mt-2 group-last:hidden"></div>
                                </div>
                                <div className="flex-1 bg-gray-50 border border-gray-100 rounded-2xl p-5 shadow-sm opacity-70 group-hover:opacity-100 transition-opacity">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h4 className="font-bold text-gray-900">Initial Planting Verification</h4>
                                            <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mt-0.5">By Rajesh Kumar</p>
                                        </div>
                                        <span className="text-xs font-bold text-gray-500 flex items-center bg-white px-2 py-1 rounded-lg shadow-sm border border-gray-200">
                                            <Clock className="w-3 h-3 mr-1 text-gray-400" /> Jul 15, 2026
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        Verified planting bounds. Vetiver slips successfully planted across 4.5 acres.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
