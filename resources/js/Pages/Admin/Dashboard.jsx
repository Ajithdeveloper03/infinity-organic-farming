import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import AdminLayout from './AdminLayout';
import { 
    Users, Activity, MapPin, BatteryWarning, 
    TrendingUp, TrendingDown, Clock, ChevronRight, CheckCircle2, ShieldAlert, Maximize, Minimize,
    Wallet, PiggyBank, Briefcase, ArrowRight, MoreHorizontal, Filter, Search, FileText, PieChart, Activity as ActivityIcon
} from 'lucide-react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useTranslation } from 'react-i18next';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '1.5rem'
};

const midnightMapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#0F172A' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  // ... omitting all the styles for brevity as we already have it in LiveMonitor, or let's include a few basics
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0B1120' }] },
];

export default function Dashboard({ locationLogs = [], stats = {} }) {
    const [drawerOpen, setDrawerOpen] = useState(true);
    const [isMapFullscreen, setIsMapFullscreen] = useState(false);
    const { t } = useTranslation();

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
    });

    const mapContent = (
        <div className={`transition-all duration-300 ease-in-out bg-white overflow-hidden shadow-sm ${isMapFullscreen ? 'fixed top-0 left-0 right-0 bottom-0 z-[99999] w-[100vw] h-[100vh] m-0 p-0 rounded-none' : 'relative w-full h-full rounded-[2rem]'}`}>
            
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    setIsMapFullscreen(!isMapFullscreen);
                }}
                className="absolute top-4 right-4 z-50 bg-white/90 backdrop-blur-md border border-gray-200 p-2.5 rounded-xl shadow-sm hover:text-slate-800 transition-colors"
            >
                {isMapFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            </button>

            <div className="absolute inset-0 bg-gray-50 flex flex-col items-center justify-center">
                {isLoaded ? (
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        center={locationLogs.length > 0 ? { lat: parseFloat(locationLogs[0].latitude), lng: parseFloat(locationLogs[0].longitude) } : { lat: 12.9716, lng: 77.5946 }}
                        zoom={10}
                        options={{
                            styles: midnightMapStyle,
                            disableDefaultUI: true,
                            zoomControl: true,
                        }}
                    >
                        {locationLogs.map((log) => (
                            <Marker
                                key={log.id}
                                position={{ lat: parseFloat(log.latitude), lng: parseFloat(log.longitude) }}
                                title={log.employee?.name || 'Officer'}
                                icon={{
                                    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent('<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="white"/><circle cx="12" cy="12" r="8" fill="#10B981"/></svg>'),
                                    scaledSize: { width: 32, height: 32, equals: () => false }
                                }}
                            />
                        ))}
                    </GoogleMap>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-green-500/20 mb-4 animate-bounce">
                            <MapPin className="w-8 h-8 text-slate-800" />
                        </div>
                        <h2 className="text-xl font-heading font-bold text-gray-900 mb-2">{t('Loading Map...')}</h2>
                    </div>
                )}
            </div>
            
        </div>
    );

    return (
        <AdminLayout>

            <div className="relative rounded-[2.5rem] overflow-hidden mb-8 shadow-xl shadow-green-900/20">

                
                <img
                    src="/images/image1.jpg"
                    alt="Organic farm background"
                    className="absolute inset-0 w-full h-full object-cover object-center scale-105"
                    style={{ filter: 'brightness(0.90) saturate(1.3)' }}
                />

              
                <div className="absolute inset-0 bg-green-900/30"></div>

                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.15) 1px,transparent 1px)', backgroundSize: '40px 40px' }}></div>

                {/* Leaf watermarks */}
                {/* <div className="absolute top-6 right-32 opacity-20 text-white pointer-events-none">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor"><path d="M17 8C8 10 5.9 16.17 3.82 21L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2-5 8"/></svg>
                </div>
                <div className="absolute bottom-4 right-8 opacity-10 text-white pointer-events-none">
                    <svg width="140" height="140" viewBox="0 0 24 24" fill="currentColor"><path d="M17 8C8 10 5.9 16.17 3.82 21L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2-5 8"/></svg>
                </div> */}

                {/* Banner Content — above all absolute layers */}
                <div className="relative z-10 p-8 md:p-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        {/* Greeting */}
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/30 shadow-lg bg-white p-1">
                                    <img src="/images/logo.png" alt="Logo" className="w-full h-full object-contain" />
                                </div>
                                <span className="text-green-200 text-sm font-bold tracking-wide">{t('Good morning, Super Admin')}</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                                {t('Overview')}
                                <span className="block text-lg font-medium text-green-300 mt-1">{t('Here is the summary of overall data')}</span>
                            </h1>
                        </div>
                        {/* Quick actions */}
                        <div className="flex flex-wrap gap-3">
                            <button className="flex items-center px-5 py-2.5 bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl text-sm font-bold text-white hover:bg-white/20 transition-colors">
                                {t('This Month')} <ChevronRight className="w-4 h-4 ml-2 rotate-90" />
                            </button>
                            <button className="flex items-center px-5 py-2.5 bg-white text-green-900 rounded-2xl text-sm font-bold hover:bg-slate-50 transition-colors shadow-lg">
                                <Activity className="w-4 h-4 mr-2" /> {t('Export Report')}
                            </button>
                        </div>
                    </div>


                </div>
            </div>

            {/* ══════════ STAT CARDS ROW ══════════ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">

                {/* Card 1: Farmers */}
                <div className="group relative bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer">
                    <div className="flex flex-col mb-4">
                        <div className="w-10 h-10 bg-emerald-700 rounded-full flex items-center justify-center shadow-lg shadow-emerald-700/30 group-hover:scale-110 transition-transform mb-4">
                            <Users className="w-5 h-5 text-white" />
                        </div>
                        <p className="text-xl font-bold text-gray-900 tracking-tight">{t('Total Farmers')}</p>
                        <p className="text-sm font-medium text-gray-500 mt-1">Easily track and manage all registered farmers...</p>
                    </div>
                    
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-3xl font-extrabold text-gray-900 tracking-tight">{stats?.totalFarmers || 150}</p>
                        <span className="flex items-center text-xs font-bold text-emerald-700 bg-white border border-emerald-100 px-2.5 py-1 rounded-full shadow-sm">
                            <TrendingUp className="w-3 h-3 mr-1" /> +23%
                        </span>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100/50 flex items-center justify-between">
                        <div className="w-full bg-emerald-50 rounded-full h-1.5 overflow-hidden">
                            <div className="h-1.5 rounded-full bg-emerald-600" style={{ width: '72%' }}></div>
                        </div>
                        <span className="text-xs font-bold text-slate-800 ml-3 flex-shrink-0">72%</span>
                    </div>
                </div>

                {/* Card 2: Active Officers */}
                <div className="group relative bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer">
                    <div className="flex flex-col mb-4">
                        <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center shadow-lg shadow-slate-900/10 group-hover:scale-110 transition-transform mb-4">
                            <Briefcase className="w-5 h-5 text-white" />
                        </div>
                        <p className="text-xl font-bold text-gray-900 tracking-tight">{t('Active Officers')}</p>
                        <p className="text-sm font-medium text-gray-500 mt-1">Monitor currently active field officers directly...</p>
                    </div>
                    
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-3xl font-extrabold text-gray-900 tracking-tight">{stats?.activeEmployees || 45}</p>
                        <span className="flex items-center text-xs font-bold text-orange-600 bg-white border border-orange-100 px-2.5 py-1 rounded-full shadow-sm">
                            <TrendingUp className="w-3 h-3 mr-1" /> +15%
                        </span>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100/50 flex items-center justify-between">
                        <div className="w-full bg-orange-50 rounded-full h-1.5 overflow-hidden">
                            <div className="h-1.5 rounded-full bg-slate-700" style={{ width: '88%' }}></div>
                        </div>
                        <span className="text-xs font-bold text-slate-700 ml-3 flex-shrink-0">88%</span>
                    </div>
                </div>

                {/* Card 3: Visits Logged */}
                <div className="group relative bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer">
                    <div className="flex flex-col mb-4">
                        <div className="w-10 h-10 bg-sky-600 rounded-full flex items-center justify-center shadow-lg shadow-sky-600/30 group-hover:scale-110 transition-transform mb-4">
                            <MapPin className="w-5 h-5 text-white" />
                        </div>
                        <p className="text-xl font-bold text-gray-900 tracking-tight">{t('Visits Logged')}</p>
                        <p className="text-sm font-medium text-gray-500 mt-1">Review farm visits and officer activity records...</p>
                    </div>
                    
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-3xl font-extrabold text-gray-900 tracking-tight">{stats?.totalVisits || 320}</p>
                        <span className="flex items-center text-xs font-bold text-sky-700 bg-white border border-sky-100 px-2.5 py-1 rounded-full shadow-sm">
                            <TrendingUp className="w-3 h-3 mr-1" /> +3.2%
                        </span>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100/50 flex items-center justify-between">
                        <div className="w-full bg-sky-50 rounded-full h-1.5 overflow-hidden">
                            <div className="h-1.5 rounded-full bg-sky-600" style={{ width: '56%' }}></div>
                        </div>
                        <span className="text-xs font-bold text-sky-600 ml-3 flex-shrink-0">56%</span>
                    </div>
                </div>

            </div>

            {/* Middle Tier: Analytical Chart & Stream */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                
                {/* Interactive Map (Replaces Bar Chart) */}
                <div className="lg:col-span-2 shadow-sm border border-gray-100 flex flex-col relative rounded-[2rem] h-[500px]">
                    {isMapFullscreen ? (
                        createPortal(mapContent, document.body)
                    ) : (
                        mapContent
                    )}
                </div>

                {/* Event Stream Drawer Widget */}
                <div className={`bg-white rounded-[2rem] border border-gray-100 flex flex-col shadow-sm transition-all duration-300 ${!drawerOpen && !isMapFullscreen ? 'hidden' : 'flex'}`}>
                    <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                        <div className="flex items-center">
                            <span className="relative flex h-2 w-2 mr-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-600 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-700"></span>
                            </span>
                            <h2 className="text-lg font-bold text-gray-900 leading-none">{t('Live Logs')}</h2>
                        </div>
                        <MoreHorizontal className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-900 transition-colors" />
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                        {[
                            { time: '09:42 AM', user: 'Senthil Vel', event: t('Turned OFF GPS. Red Alert Triggered.'), type: 'critical', icon: ShieldAlert },
                            { time: '09:40 AM', user: 'Anitha R', event: t('Checked in at Farm #294 (Muthusamy)'), type: 'success', icon: CheckCircle2 },
                            { time: '09:39 AM', user: 'Anitha R', event: t('Travel Distance Logged: 12.4 km'), type: 'info', icon: MapPin },
                            { time: '09:35 AM', user: 'Karthikeyan', event: t('Marked Morning Attendance. GPS Started.'), type: 'info', icon: Clock },
                            { time: '09:30 AM', user: 'Palanisamy', event: t('System booted successfully.'), type: 'info', icon: ActivityIcon },
                        ].map((log, i) => (
                            <div key={i} className="flex items-start p-3 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer group">
                                <div className={`p-2.5 rounded-xl mr-3 shadow-sm ${log.type === 'success' ? 'bg-slate-50 text-slate-800' : log.type === 'critical' ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-500 border border-gray-100 group-hover:border-gray-200'}`}>
                                    <log.icon className="w-4 h-4" />
                                </div>
                                <div className="flex-1 pt-1">
                                    <div className="flex justify-between items-center mb-0.5">
                                        <p className="text-sm font-bold text-gray-900">{log.user}</p>
                                        <span className="text-[10px] font-bold text-gray-400">
                                            {log.time}
                                        </span>
                                    </div>
                                    <p className={`text-xs font-medium ${log.type === 'critical' ? 'text-red-500' : 'text-gray-500'}`}>{log.event}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Wagon Wheel & Advanced Analytics Tier */}
            <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 ${isMapFullscreen ? 'hidden' : ''}`}>
                
                {/* Wagon Wheel (Donut Chart) Analytics */}
                <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="font-bold text-lg text-gray-900 leading-tight">{t('Risk & Performance Analytics')}</h3>
                            <p className="text-gray-500 text-xs font-medium">{t('Identifies high-risk areas based on AI insights')}</p>
                        </div>
                        <PieChart className="w-5 h-5 text-gray-400" />
                    </div>
                    
                    <div className="flex-1 flex flex-col items-center justify-center relative my-4">
                        {/* CSS Conic Gradient Donut Chart */}
                        <div className="relative w-48 h-48 rounded-full flex items-center justify-center shadow-inner" style={{ background: 'conic-gradient(#ef4444 0% 15%, #f97316 15% 40%, #16a34a 40% 100%)' }}>
                            <div className="absolute inset-2 rounded-full bg-white flex flex-col items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.05)] z-10">
                                <span className="text-xs font-bold text-gray-400 mb-1">{t('AI Insight')}</span>
                                <span className="text-2xl font-heading font-extrabold text-gray-900">92%</span>
                                <span className="text-[10px] font-bold text-slate-700">{t('Confidence')}</span>
                            </div>
                            
                            {/* Decorative Wheel Spokes */}
                            <div className="absolute inset-0 border-[8px] border-white/20 rounded-full z-0 pointer-events-none"></div>
                        </div>
                    </div>
                    
                    <div className="space-y-3 mt-4">
                        <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
                            <div className="flex items-center">
                                <span className="w-3 h-3 rounded-full bg-red-500 mr-3 shadow-sm shadow-red-500/50"></span>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">12 {t('Farmers')}</p>
                                    <p className="text-[10px] font-bold text-gray-400">{t('High Risk / Alert')}</p>
                                </div>
                            </div>
                            <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded-md">+3%</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
                            <div className="flex items-center">
                                <span className="w-3 h-3 rounded-full bg-slate-700 mr-3 shadow-sm shadow-slate-900/10"></span>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">25 {t('Officers')}</p>
                                    <p className="text-[10px] font-bold text-gray-400">{t('Moderate Performance')}</p>
                                </div>
                            </div>
                            <span className="text-xs font-bold text-slate-700 bg-orange-50 px-2 py-1 rounded-md">-2</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
                            <div className="flex items-center">
                                <span className="w-3 h-3 rounded-full bg-slate-800 mr-3 shadow-sm shadow-slate-900/10"></span>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">78 {t('Visits')}</p>
                                    <p className="text-[10px] font-bold text-gray-400">{t('Low Risk / Healthy')}</p>
                                </div>
                            </div>
                            <span className="text-xs font-bold text-slate-700 bg-slate-50 px-2 py-1 rounded-md">+87%</span>
                        </div>
                    </div>
                </div>

                {/* Patient/Officer Statistics (Twin Bar Charts) */}
                <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 flex flex-col lg:col-span-1">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="font-bold text-lg text-gray-900 leading-tight">{t('Officer Statistics')}</h3>
                            <p className="text-gray-500 text-xs font-medium">{t('Figuring out stats for better choices')}</p>
                        </div>
                    </div>
                    
                    <div className="flex-1 flex items-end justify-around pb-4 pt-10">
                        {/* Bar 1 */}
                        <div className="flex flex-col items-center w-20">
                            <span className="text-2xl font-bold text-gray-900 mb-2">56%</span>
                            <div className="w-full h-48 bg-orange-50 rounded-xl relative overflow-hidden group cursor-pointer border border-orange-100">
                                <div className="absolute bottom-0 w-full bg-slate-600 rounded-xl transition-all duration-500 group-hover:bg-slate-700" style={{ height: '56%' }}></div>
                            </div>
                            <div className="mt-4 flex flex-col items-center">
                                <span className="text-[10px] font-bold bg-orange-50 text-slate-700 px-2 py-1 rounded mb-1">+37%</span>
                                <span className="text-xs font-bold text-gray-500 text-center">{t('New Registrations')}</span>
                            </div>
                        </div>
                        
                        {/* Bar 2 */}
                        <div className="flex flex-col items-center w-20">
                            <span className="text-2xl font-bold text-gray-900 mb-2">45%</span>
                            <div className="w-full h-48 bg-amber-50 rounded-xl relative overflow-hidden group cursor-pointer border border-amber-100">
                                <div className="absolute bottom-0 w-full bg-amber-500 rounded-xl transition-all duration-500 group-hover:bg-amber-600" style={{ height: '45%' }}></div>
                            </div>
                            <div className="mt-4 flex flex-col items-center">
                                <span className="text-[10px] font-bold bg-amber-50 text-amber-600 px-2 py-1 rounded mb-1">+15%</span>
                                <span className="text-xs font-bold text-gray-500 text-center">{t('Routine Audits')}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Visit Overview Calendar Lines */}
                <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="font-bold text-lg text-gray-900 leading-tight">{t('Visit Overview')}</h3>
                            <p className="text-gray-500 text-xs font-medium">{t('Smart timeline schedule')}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 rotate-45 cursor-pointer hover:text-gray-900" />
                    </div>
                    
                    <div className="grid grid-cols-4 gap-2 mb-6">
                        <div className="text-center">
                            <div className="text-lg font-bold text-gray-900">1025</div>
                            <div className="text-[10px] font-bold text-gray-400">{t('Total')}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-lg font-bold text-gray-900">780</div>
                            <div className="text-[10px] font-bold text-gray-400">{t('Completed')}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-lg font-bold text-gray-900">245</div>
                            <div className="text-[10px] font-bold text-gray-400">{t('Missed')}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-lg font-bold text-gray-900">17</div>
                            <div className="text-[10px] font-bold text-gray-400">{t('Canceled')}</div>
                        </div>
                    </div>
                    
                    <div className="flex-1 space-y-5 relative before:absolute before:inset-0 before:ml-[3.25rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                        
                        <div className="relative flex items-center justify-between">
                            <div className="text-xs font-bold text-gray-500 w-16 text-right mr-4 z-10 bg-white py-1">7:28 AM</div>
                            <div className="w-2 h-2 rounded-full bg-slate-800 z-10 absolute left-[3.25rem] -translate-x-1/2 outline outline-4 outline-white"></div>
                            <div className="flex-1 flex items-center ml-6 bg-white p-2 rounded-xl hover:bg-gray-50 cursor-pointer">
                                <div className="w-8 h-8 rounded-full overflow-hidden mr-3"><img src="/images/logo.png" alt="user" className="w-full h-full object-cover"/></div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Arumugam</p>
                                    <p className="text-[10px] font-bold text-gray-400">Farm Audit #201</p>
                                </div>
                            </div>
                            <div className="w-6 h-6 rounded bg-slate-50 text-slate-700 flex items-center justify-center z-10"><CheckCircle2 className="w-4 h-4"/></div>
                        </div>
                        
                        <div className="relative flex items-center justify-between">
                            <div className="text-xs font-bold text-gray-500 w-16 text-right mr-4 z-10 bg-white py-1">1:12 PM</div>
                            <div className="w-2 h-2 rounded-full bg-red-500 z-10 absolute left-[3.25rem] -translate-x-1/2 outline outline-4 outline-white"></div>
                            <div className="flex-1 flex items-center ml-6 bg-white p-2 rounded-xl hover:bg-gray-50 cursor-pointer shadow-[0_0_15px_rgba(239,68,68,0.1)] border border-red-100 relative group">
                                <div className="w-8 h-8 rounded-full overflow-hidden mr-3"><img src="/images/logo.png" alt="user" className="w-full h-full object-cover"/></div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Murugan</p>
                                    <p className="text-[10px] font-bold text-gray-400">Missed Check-in</p>
                                </div>
                                {/* Hover Tooltip */}
                                <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl p-3 border border-gray-100 hidden group-hover:block w-48 z-20">
                                    <p className="text-xs font-bold text-red-500 mb-1">Emergency Alert</p>
                                    <p className="text-xs text-gray-900 mb-2">Location tracking lost at 1:12 PM</p>
                                    <div className="flex items-center">
                                        <div className="w-6 h-6 rounded-full overflow-hidden mr-2"><img src="/images/logo.png" alt="user" className="w-full h-full object-cover"/></div>
                                        <p className="text-[10px] font-bold text-gray-500">Murugan</p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-6 h-6 rounded bg-red-50 text-red-500 flex items-center justify-center z-10"><Clock className="w-4 h-4"/></div>
                        </div>

                        <div className="relative flex items-center justify-between">
                            <div className="text-xs font-bold text-gray-500 w-16 text-right mr-4 z-10 bg-white py-1">6:11 PM</div>
                            <div className="w-2 h-2 rounded-full bg-blue-500 z-10 absolute left-[3.25rem] -translate-x-1/2 outline outline-4 outline-white"></div>
                            <div className="flex-1 flex items-center ml-6 bg-white p-2 rounded-xl hover:bg-gray-50 cursor-pointer">
                                <div className="w-8 h-8 rounded-full overflow-hidden mr-3 bg-gray-100"></div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Kannan</p>
                                    <p className="text-[10px] font-bold text-gray-400">Registration Review</p>
                                </div>
                            </div>
                            <div className="w-6 h-6 rounded bg-blue-50 text-blue-500 flex items-center justify-center z-10"><Clock className="w-4 h-4"/></div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Bottom Tier: Map & Recent Activities */}
            <div className={`flex flex-col lg:flex-row gap-6 ${isMapFullscreen ? 'h-0 overflow-hidden' : ''}`}>
                


                {/* Recent Activities Table Widget */}
                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm flex flex-col w-full">
                    <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-gray-900 leading-none">{t('Recent Activities')}</h2>
                        <div className="flex space-x-2">
                            <div className="relative hidden sm:block">
                                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input type="text" placeholder={t('Search')} className="pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-green-500/20" />
                            </div>
                            <button className="flex items-center px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-100 transition-colors">
                                <Filter className="w-3 h-3 mr-1" /> {t('Filter')}
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[500px]">
                            <thead>
                                <tr className="border-b border-gray-50">
                                    <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider">{t('Activity')}</th>
                                    <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider">{t('Order ID')}</th>
                                    <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider">{t('Date')}</th>
                                    <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider">{t('Status')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { act: 'Farm Visit Audit', id: 'VIS_001', date: '17 Apr, 2026', status: 'Completed', color: 'green' },
                                    { act: 'New Registration', id: 'REG_089', date: '16 Apr, 2026', status: 'Pending', color: 'orange' },
                                    { act: 'Issue Reported', id: 'ISS_042', date: '15 Apr, 2026', status: 'Active', color: 'red' },
                                    { act: 'Management Meeting', id: 'MET_011', date: '14 Apr, 2026', status: 'Completed', color: 'green' },
                                ].map((row, i) => (
                                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group cursor-pointer">
                                        <td className="py-4 px-6 text-sm font-bold text-gray-900 flex items-center">
                                            <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center mr-3 group-hover:bg-white transition-colors">
                                                <FileText className="w-4 h-4 text-gray-500" />
                                            </div>
                                            {row.act}
                                        </td>
                                        <td className="py-4 px-6 text-xs font-medium text-gray-500">{row.id}</td>
                                        <td className="py-4 px-6 text-xs font-medium text-gray-500">{row.date}</td>
                                        <td className="py-4 px-6">
                                            <span className={`flex items-center text-xs font-bold ${row.color === 'green' ? 'text-slate-800' : row.color === 'red' ? 'text-red-500' : 'text-slate-700'}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full mr-2 ${row.color === 'green' ? 'bg-slate-800' : row.color === 'red' ? 'bg-red-500' : 'bg-slate-700'}`}></span>
                                                {row.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
        </AdminLayout>
    );
}
