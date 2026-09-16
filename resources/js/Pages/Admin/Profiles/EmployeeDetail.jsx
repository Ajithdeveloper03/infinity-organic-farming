import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import AdminLayout from '../AdminLayout';
import { Link } from '@inertiajs/react';
import { ArrowLeft, MapPin, Navigation, Clock, Smartphone, ShieldCheck, Activity, Maximize, Minimize, Star, Users, Map } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet's default icon path issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Component to dynamically update map center when location changes
function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

export default function EmployeeDetail({ employee = {}, attendance = [], visitsThisWeek = [], assignedFarmers = [], recentReviews = [] }) {
    const { t } = useTranslation();
    const [isMapFullscreen, setIsMapFullscreen] = useState(false);

    const [liveLocation, setLiveLocation] = useState({
        lat: parseFloat(employee.last_latitude) || null,
        lng: parseFloat(employee.last_longitude) || null,
        last_seen: employee.last_seen || 'Never',
    });
    const [path, setPath] = useState(
        employee.recentPath ? employee.recentPath.map(p => [parseFloat(p.lat), parseFloat(p.lng)]) : []
    );

    useEffect(() => {
        if (window.Echo && employee.id) {
            window.Echo.channel('live-tracking')
                .listen('.LocationUpdated', (e) => {
                    if (e.employeeId === employee.id) {
                        setLiveLocation({
                            lat: parseFloat(e.latitude),
                            lng: parseFloat(e.longitude),
                            last_seen: 'Just now',
                        });
                        setPath(prev => [[parseFloat(e.latitude), parseFloat(e.longitude)], ...prev]);
                    }
                });
        }
        return () => {
            if (window.Echo) {
                window.Echo.leaveChannel('live-tracking');
            }
        };
    }, [employee.id]);

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
            
            <div className="flex-1 relative bg-gray-50 flex items-center justify-center overflow-hidden">
                {liveLocation.lat && liveLocation.lng ? (
                    <MapContainer
                        center={[liveLocation.lat, liveLocation.lng]}
                        zoom={15}
                        style={{ width: '100%', height: '100%', zIndex: 0 }}
                    >
                        <ChangeView center={[liveLocation.lat, liveLocation.lng]} zoom={15} />
                        <TileLayer
                            attribution='&copy; Google Maps'
                            url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                        />
                        {path.length > 1 && (
                            <Polyline 
                                positions={path} 
                                color="#1e293b" 
                                weight={5} 
                                opacity={0.8}
                                lineCap="round"
                                lineJoin="round"
                            />
                        )}
                        <Marker 
                            position={[liveLocation.lat, liveLocation.lng]}
                            icon={L.divIcon({
                                className: 'custom-icon',
                                html: `
                                    <div style="width: 48px; height: 48px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border: 2px solid #4ade80; position: relative; font-size: 1.25rem; font-weight: bold; color: #1e293b;">
                                        ${employee.name?.[0] || 'E'}
                                        <div style="position: absolute; bottom: -4px; right: -4px; background: #0f172a; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; display: flex; align-items: center; justify-content: center;">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
                                        </div>
                                    </div>
                                `,
                                iconSize: [48, 48],
                                iconAnchor: [24, 24],
                            })}
                        />
                    </MapContainer>
                ) : (
                    <div className="text-gray-400 font-bold text-sm">No GPS Location Available</div>
                )}
                
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
                    <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-xl shadow-sm border border-gray-100 text-center text-sm">
                        <p className="font-bold text-gray-900">GPS Status</p>
                        <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mt-0.5">Updated: {liveLocation.last_seen}</p>
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
                    <div className="bg-white border border-gray-100 rounded-[2rem] shadow-sm text-center relative overflow-hidden group hover:shadow-md transition-shadow">
                        {/* Cover Image */}
                        <div className="h-32 bg-slate-800 relative">
                            <img src={`/images/image${(employee.id % 12) + 1}.jpg`} alt="Cover" className="w-full h-full object-cover opacity-60 mix-blend-overlay" />
                        </div>
                        
                        <div className="w-24 h-24 mx-auto rounded-[2rem] bg-white flex items-center justify-center border-4 border-white shadow-lg -mt-12 relative z-10 overflow-hidden group-hover:-translate-y-1 transition-transform">
                            <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(employee.name || 'Emp')}&background=random`} alt={employee.name} className="w-full h-full object-cover" />
                            <div className="absolute bottom-0 right-0 w-6 h-6 bg-slate-800 border-2 border-white rounded-full flex items-center justify-center">
                                <span className={`w-3 h-3 rounded-full ${employee.status === 'active' ? 'bg-green-400' : 'bg-gray-400'}`}></span>
                            </div>
                        </div>
                        
                        <div className="px-6 pb-6 pt-3">
                            <h1 className="text-2xl font-heading font-extrabold text-gray-900">{employee.name}</h1>
                            <p className="text-[10px] font-mono font-bold text-slate-700 mt-1 bg-slate-50 px-2 py-0.5 rounded-lg inline-block shadow-sm border border-slate-100">{employee.employee_code || 'N/A'}</p>
                            
                            <div className="mt-6 flex flex-col space-y-3 text-left bg-gray-50 p-5 rounded-2xl border border-gray-100 shadow-inner">
                                <div className="flex items-center text-sm font-medium text-gray-700">
                                    <ShieldCheck className="w-4 h-4 text-slate-700 mr-3" /> Field Officer
                                </div>
                                <div className="flex items-center text-sm font-medium text-gray-700">
                                    <MapPin className="w-4 h-4 text-slate-700 mr-3" /> {employee.region || 'Unassigned'}
                                </div>
                                <div className="flex items-center text-sm font-medium text-gray-700">
                                    <Smartphone className="w-4 h-4 text-gray-400 mr-3" /> {employee.phone}
                                </div>
                                {employee.emergency && (
                                    <div className="flex items-center text-sm font-medium text-red-600">
                                        <Activity className="w-4 h-4 mr-3" /> Emg: {employee.emergency}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-100 pb-2">Weekly Activity</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-colors">
                                <span className="text-sm font-medium text-gray-600 flex items-center"><MapPin className="w-4 h-4 mr-2 text-amber-500" /> Farm Visits</span>
                                <span className="font-heading font-bold text-gray-900">{visitsThisWeek.length}</span>
                            </div>
                            <div className="flex justify-between items-center cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-colors">
                                <span className="text-sm font-medium text-gray-600 flex items-center"><Clock className="w-4 h-4 mr-2 text-slate-700" /> Days Present</span>
                                <span className="font-heading font-bold text-gray-900">{attendance.filter(a => a.status === 'present').length}</span>
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

            {/* Sub-Tier: Assigned Farmers & Performance Reviews */}
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8 ${isMapFullscreen ? 'hidden' : 'block'}`}>
                {/* Assigned Farmers */}
                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm flex flex-col p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center">
                            <Users className="w-5 h-5 text-emerald-600 mr-2" /> Assigned Farmers
                        </h3>
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                            {assignedFarmers.length} Total
                        </span>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 max-h-[400px] space-y-3">
                        {assignedFarmers.length > 0 ? (
                            assignedFarmers.map((farmer, i) => (
                                <div key={i} className="flex items-center p-3 rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-sm transition-all cursor-pointer">
                                    <div className="w-12 h-12 rounded-xl bg-slate-100 mr-4 overflow-hidden flex-shrink-0 border border-gray-200">
                                        <img 
                                            src={farmer.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(farmer.name)}&background=random`} 
                                            onError={(e) => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(farmer.name)}&background=random`; }}
                                            alt={farmer.name} 
                                            className="w-full h-full object-cover" 
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-gray-900 truncate">{farmer.name}</p>
                                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{farmer.farmer_code}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${farmer.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'} uppercase tracking-wider block mb-1`}>
                                            {farmer.status}
                                        </span>
                                        <p className="text-xs font-medium text-gray-500 flex items-center justify-end">
                                            <Map className="w-3 h-3 mr-1" /> {farmer.acres} Acres
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-400 text-sm py-10">No assigned farmers found.</div>
                        )}
                    </div>
                </div>

                {/* Ratings and Reviews */}
                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm flex flex-col p-6">
                    <div className="flex justify-between items-center mb-6 border-b border-gray-50 pb-4">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center">
                            <Star className="w-5 h-5 text-amber-500 mr-2" /> Farmer Reviews
                        </h3>
                        <div className="flex items-center">
                            <span className="text-3xl font-black text-gray-900 mr-2">{employee.avg_rating || 'N/A'}</span>
                            <div className="flex text-amber-400">
                                {[1,2,3,4,5].map(star => (
                                    <Star key={star} className={`w-4 h-4 ${star <= (employee.avg_rating || 0) ? 'fill-current' : 'text-gray-200 fill-gray-200'}`} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 max-h-[400px] space-y-4">
                        {recentReviews.length > 0 ? (
                            recentReviews.map((review, i) => (
                                <div key={i} className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                                    <div className="flex justify-between items-start mb-2">
                                        <p className="text-sm font-bold text-gray-900">{review.farmer_name}</p>
                                        <span className="text-[10px] font-medium text-gray-400">{review.date}</span>
                                    </div>
                                    <div className="flex text-amber-400 mb-2">
                                        {[1,2,3,4,5].map(star => (
                                            <Star key={star} className={`w-3 h-3 ${star <= review.rating ? 'fill-current' : 'text-gray-200 fill-gray-200'}`} />
                                        ))}
                                    </div>
                                    <p className="text-sm text-gray-600 italic">"{review.comment || 'No comment provided.'}"</p>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-400 text-sm py-10">No reviews recorded yet.</div>
                        )}
                    </div>
                </div>
            </div>

        </AdminLayout>
    );
}
