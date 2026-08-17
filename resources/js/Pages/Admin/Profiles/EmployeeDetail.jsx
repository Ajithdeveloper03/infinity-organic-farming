import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import AdminLayout from '../AdminLayout';
import { Link } from '@inertiajs/react';
import { ArrowLeft, MapPin, Navigation, Clock, Smartphone, ShieldCheck, Activity, Maximize, Minimize } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function EmployeeDetail({ id }) {
    const { t } = useTranslation();
    const [isMapFullscreen, setIsMapFullscreen] = useState(false);

    const emp = {
        id: id,
        name: 'Rajesh Kumar',
        role: 'Field Officer',
        region: 'Coimbatore South',
        phone: '+91 9876543210',
        joined: 'Jan 2025',
        img: '/images/logo.png'
    };

    const mapContent = (
        <div className={`bg-white overflow-hidden flex flex-col cursor-pointer group transition-all duration-300 ${isMapFullscreen ? 'fixed top-0 left-0 right-0 bottom-0 z-[99999] w-[100vw] h-[100vh] m-0 p-0 border-0 rounded-none' : 'rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md h-[700px] relative'}`}>
            
            <div className="p-5 border-b border-gray-100 bg-slate-50 flex justify-between items-center z-10 relative">
                <div>
                    <h2 className="text-xl font-heading font-bold text-gray-900 flex items-center">
                        <Activity className="w-5 h-5 text-red-500 mr-2 animate-pulse" /> Live Telemetry
                    </h2>
                    <p className="text-[10px] font-bold text-gray-500 mt-1 uppercase tracking-wider">Minute-by-minute GPS Canvas</p>
                </div>
                <div className="flex items-center space-x-4">
                    <span className="bg-slate-50 text-slate-800 text-[10px] font-bold px-3 py-1.5 rounded-md border border-slate-200 flex items-center uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-slate-800 animate-ping mr-2"></span> Tracking Active
                    </span>
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsMapFullscreen(!isMapFullscreen);
                        }}
                        className="p-2 bg-white border border-gray-200 rounded-xl shadow-sm hover:text-slate-800 hover:border-green-300 transition-colors z-50"
                    >
                        {isMapFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                    </button>
                </div>
            </div>
            
            <div className="flex-1 relative bg-gray-50 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] flex items-center justify-center overflow-hidden">
                
                {/* Decorative Map overlay elements */}
                <div className="absolute inset-0 opacity-40 group-hover:scale-105 transition-transform duration-1000">
                    <svg width="100%" height="100%">
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="1"/>
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>
                
                <div className="z-10 flex flex-col items-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md border-4 border-green-200 relative animate-bounce">
                        <img src={emp.img} className="w-full h-full rounded-full object-cover" alt="marker" />
                        <div className="absolute -bottom-2 -right-2 bg-slate-900 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center shadow-sm">
                            <Navigation className="w-3 h-3 text-white" />
                        </div>
                    </div>
                    <div className="mt-4 bg-white/90 backdrop-blur px-4 py-2 rounded-xl shadow-sm border border-gray-100 text-center text-sm">
                        <p className="font-bold text-gray-900">Moving • 45 km/h</p>
                        <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mt-0.5">Updated: Just now</p>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <AdminLayout>
            <div className="mb-6">
                <Link href="/admin/employees" className="cursor-pointer inline-flex items-center text-sm font-bold text-gray-500 hover:text-slate-800 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back to Directory
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Snapshot */}
                <div className={`col-span-1 space-y-8 ${isMapFullscreen ? 'hidden' : 'block'}`}>
                    <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm text-center relative overflow-hidden group hover:shadow-md transition-shadow">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -mr-8 -mt-8 pointer-events-none"></div>
                        
                        <div className="w-32 h-32 mx-auto rounded-[2rem] overflow-hidden border-4 border-white shadow-sm mb-6 relative group-hover:scale-105 transition-transform">
                            <img src={emp.img} alt={emp.name} className="w-full h-full object-cover" />
                            <div className="absolute bottom-0 right-0 w-6 h-6 bg-slate-800 border-2 border-white rounded-full shadow-sm"></div>
                        </div>
                        
                        <h1 className="text-2xl font-heading font-extrabold text-gray-900">{emp.name}</h1>
                        <p className="text-[10px] font-mono font-bold text-slate-700 mt-1 bg-slate-50 px-2 py-0.5 rounded-lg inline-block">{emp.id}</p>
                        
                        <div className="mt-6 flex flex-col space-y-3 text-left bg-gray-50 p-5 rounded-2xl border border-gray-100">
                            <div className="flex items-center text-sm font-medium text-gray-700">
                                <ShieldCheck className="w-4 h-4 text-slate-700 mr-3" /> {emp.role}
                            </div>
                            <div className="flex items-center text-sm font-medium text-gray-700">
                                <MapPin className="w-4 h-4 text-slate-700 mr-3" /> {emp.region}
                            </div>
                            <div className="flex items-center text-sm font-medium text-gray-700">
                                <Smartphone className="w-4 h-4 text-gray-400 mr-3" /> {emp.phone}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-100 pb-2">Today's Performance</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-colors">
                                <span className="text-sm font-medium text-gray-600 flex items-center"><Navigation className="w-4 h-4 mr-2 text-slate-700" /> Distance</span>
                                <span className="font-heading font-bold text-gray-900">42.5 km</span>
                            </div>
                            <div className="flex justify-between items-center cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-colors">
                                <span className="text-sm font-medium text-gray-600 flex items-center"><Clock className="w-4 h-4 mr-2 text-slate-700" /> Hours Logged</span>
                                <span className="font-heading font-bold text-gray-900">8h 15m</span>
                            </div>
                            <div className="flex justify-between items-center cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-colors">
                                <span className="text-sm font-medium text-gray-600 flex items-center"><MapPin className="w-4 h-4 mr-2 text-amber-500" /> Farm Visits</span>
                                <span className="font-heading font-bold text-gray-900">4 / 6</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Live Tracking Map Canvas */}
                <div className="col-span-1 lg:col-span-2">
                    {isMapFullscreen ? (
                        <>
                            <div className="h-[700px] w-full"></div>
                            {createPortal(mapContent, document.body)}
                        </>
                    ) : (
                        mapContent
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
