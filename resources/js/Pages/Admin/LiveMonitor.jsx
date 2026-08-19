import React, { useState, useMemo } from 'react';
import AdminLayout from './AdminLayout';
import { Head } from '@inertiajs/react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import {
    ShieldAlert, MapPin, Clock, Activity, Search,
    CheckCircle2, AlertTriangle, Wifi, WifiOff, Phone,
    Battery, Navigation, Calendar, ChevronDown, User,
    TrendingUp, Filter, RefreshCw, Eye, MessageSquare
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

const getStatusStyle = (status) => {
    if (status === 'active') return { badge: 'bg-slate-100 text-green-700', dot: 'bg-green-400' };
    if (status === 'idle') return { badge: 'bg-yellow-100 text-yellow-700', dot: 'bg-yellow-400' };
    return { badge: 'bg-gray-100 text-gray-500', dot: 'bg-gray-300' };
};

const getActivityStyle = (type) => {
    if (type === 'checkin') return 'text-slate-800 bg-slate-50';
    if (type === 'visit') return 'text-slate-800 bg-slate-50';
    if (type === 'form') return 'text-orange-600 bg-orange-50';
    return 'text-gray-500 bg-gray-50';
};

const getBatteryColor = (level) => {
    if (level > 50) return 'text-slate-800';
    if (level > 20) return 'text-yellow-600';
    return 'text-red-600';
};

const mapContainerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '2rem'
};

const midnightMapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#0F172A' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#1E293B' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#212a37' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9ca5b3' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#334155' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#0B1120' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#515c6d' }],
  },
];

export default function LiveMonitor({ employees = [] }) {
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [regionFilter, setRegionFilter] = useState('all');
    const [selectedEmployee, setSelectedEmployee] = useState(employees[0] || null);
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const [showRegionDropdown, setShowRegionDropdown] = useState(false);
    const [lastRefreshed, setLastRefreshed] = useState(new Date().toLocaleTimeString());

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
    });

    const regions = ['all', ...Array.from(new Set(employees.map(e => e.region)))];

    const filteredEmployees = useMemo(() => {
        return employees.filter(emp => {
            const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                emp.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
                emp.currentLocation.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter === 'all' || emp.status === statusFilter;
            const matchesRegion = regionFilter === 'all' || emp.region === regionFilter;
            return matchesSearch && matchesStatus && matchesRegion;
        });
    }, [searchQuery, statusFilter, regionFilter, employees]);

    const activeCount = employees.filter(e => e.status === 'active').length;
    const offlineCount = employees.filter(e => e.status === 'offline').length;
    const totalVisits = employees.reduce((sum, e) => sum + e.visitsDone, 0);

    const handleRefresh = () => {
        setLastRefreshed(new Date().toLocaleTimeString());
        // Since we are using Inertia, we could also do router.reload({ only: ['employees'] })
    };

    return (
        <AdminLayout>
            <Head title="Live Employee Monitor - Infinity Admin" />

            {/* Page Header */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <h1 className="text-3xl font-extrabold text-gray-900">{t('Live Employee Monitor')}</h1>
                        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-green-700 text-xs font-bold">
                            <span className="h-2 w-2 rounded-full bg-slate-800 animate-pulse"></span> LIVE
                        </span>
                    </div>
                    <p className="text-gray-500 font-medium">Real-time activity tracking for all field officers. Last refreshed: <strong>{lastRefreshed}</strong></p>
                </div>
                <button
                    onClick={handleRefresh}
                    className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-xl font-bold text-sm text-gray-700 hover:bg-gray-50 shadow-sm transition-colors"
                >
                    <RefreshCw className="w-4 h-4 mr-2" /> Refresh Data
                </button>
            </div>

            {/* Summary KPI Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-slate-900 rounded-2xl p-5 text-white shadow-lg">
                    <p className="text-green-200 text-xs font-bold uppercase tracking-wider">Active Officers</p>
                    <p className="text-4xl font-extrabold mt-1">{activeCount}<span className="text-green-300 text-lg font-bold">/{EMPLOYEES.length}</span></p>
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Offline / No GPS</p>
                    <div className="flex items-end gap-2 mt-1">
                        <p className="text-4xl font-extrabold text-gray-900">{offlineCount}</p>
                        {offlineCount > 0 && <AlertTriangle className="w-5 h-5 text-red-500 mb-1" />}
                    </div>
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Total Visits Today</p>
                    <p className="text-4xl font-extrabold text-gray-900 mt-1">{totalVisits}</p>
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Low Battery Alerts</p>
                    <div className="flex items-end gap-2 mt-1">
                        <p className="text-4xl font-extrabold text-red-600">{EMPLOYEES.filter(e => e.battery < 20).length}</p>
                        <Battery className="w-5 h-5 text-red-400 mb-1" />
                    </div>
                </div>
            </div>

            {/* Main Two-Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left: Employee List Panel */}
                <div className="lg:col-span-1 bg-white border border-gray-100 rounded-[2rem] shadow-sm overflow-hidden flex flex-col">
                    
                    {/* Search + Filters */}
                    <div className="p-4 border-b border-gray-100 space-y-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search officers or location..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                            />
                        </div>
                        <div className="flex gap-2">
                            {/* Status Filter Dropdown */}
                            <div className="relative flex-1">
                                <button
                                    onClick={() => { setShowStatusDropdown(!showStatusDropdown); setShowRegionDropdown(false); }}
                                    className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-100"
                                >
                                    <span className="flex items-center gap-1"><Filter className="w-3 h-3" /> {statusFilter === 'all' ? 'All Status' : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}</span>
                                    <ChevronDown className="w-3 h-3" />
                                </button>
                                {showStatusDropdown && (
                                    <div className="absolute top-full mt-1 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-30 overflow-hidden">
                                        {['all', 'active', 'idle', 'offline'].map(s => (
                                            <button key={s} onClick={() => { setStatusFilter(s); setShowStatusDropdown(false); }}
                                                className={`w-full text-left px-4 py-2 text-xs font-bold capitalize hover:bg-gray-50 transition-colors ${statusFilter === s ? 'text-slate-800' : 'text-gray-700'}`}>
                                                {s === 'all' ? 'All Status' : s.charAt(0).toUpperCase() + s.slice(1)}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {/* Region Filter Dropdown */}
                            <div className="relative flex-1">
                                <button
                                    onClick={() => { setShowRegionDropdown(!showRegionDropdown); setShowStatusDropdown(false); }}
                                    className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-100"
                                >
                                    <span>{regionFilter === 'all' ? 'All Regions' : regionFilter}</span>
                                    <ChevronDown className="w-3 h-3" />
                                </button>
                                {showRegionDropdown && (
                                    <div className="absolute top-full mt-1 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-30 overflow-hidden">
                                        {regions.map(r => (
                                            <button key={r} onClick={() => { setRegionFilter(r); setShowRegionDropdown(false); }}
                                                className={`w-full text-left px-4 py-2 text-xs font-bold capitalize hover:bg-gray-50 transition-colors ${regionFilter === r ? 'text-slate-800' : 'text-gray-700'}`}>
                                                {r === 'all' ? 'All Regions' : r}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Employee Card List */}
                    <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
                        {filteredEmployees.length === 0 && (
                            <div className="p-8 text-center text-gray-400 text-sm font-medium">No officers match your search.</div>
                        )}
                        {filteredEmployees.map(emp => {
                            const style = getStatusStyle(emp.status);
                            const isSelected = selectedEmployee?.id === emp.id;
                            return (
                                <button
                                    key={emp.id}
                                    onClick={() => setSelectedEmployee(emp)}
                                    className={`w-full text-left p-4 transition-colors ${isSelected ? 'bg-slate-50' : 'hover:bg-gray-50'}`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`relative w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-sm bg-gradient-to-br ${emp.status === 'active' ? 'bg-slate-800' : 'from-gray-400 to-gray-500'}`}>
                                            {emp.name.charAt(0)}
                                            <span className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white ${style.dot}`}></span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between">
                                                <p className="font-bold text-sm text-gray-900 truncate">{emp.name}</p>
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ml-1 flex-shrink-0 ${style.badge}`}>
                                                    {emp.status}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500 font-medium truncate">{emp.currentLocation}</p>
                                            <div className="flex items-center gap-3 mt-1.5">
                                                <span className="flex items-center text-[10px] font-bold text-gray-400">
                                                    <Clock className="w-3 h-3 mr-1" />{emp.lastSeen}
                                                </span>
                                                <span className={`flex items-center text-[10px] font-bold ${getBatteryColor(emp.battery)}`}>
                                                    <Battery className="w-3 h-3 mr-1" />{emp.battery}%
                                                </span>
                                                <span className="flex items-center text-[10px] font-bold text-gray-400">
                                                    {emp.gps === 'enabled' ? <Wifi className="w-3 h-3 mr-1 text-slate-700" /> : <WifiOff className="w-3 h-3 mr-1 text-red-500" />}
                                                    GPS
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Right: Employee Detail Panel */}
                {selectedEmployee && (
                    <div className="lg:col-span-2 space-y-6">

                        {/* Map View */}
                        <div className="bg-white border border-gray-100 rounded-[2rem] p-4 shadow-sm h-[400px]">
                            {isLoaded ? (
                                <GoogleMap
                                    mapContainerStyle={mapContainerStyle}
                                    center={{
                                        lat: parseFloat(selectedEmployee.latitude) || 12.9716,
                                        lng: parseFloat(selectedEmployee.longitude) || 77.5946
                                    }}
                                    zoom={14}
                                    options={{
                                        styles: midnightMapStyle,
                                        disableDefaultUI: true,
                                        zoomControl: true,
                                    }}
                                >
                                    {selectedEmployee.latitude && selectedEmployee.longitude && (
                                        <Marker
                                            position={{
                                                lat: parseFloat(selectedEmployee.latitude),
                                                lng: parseFloat(selectedEmployee.longitude)
                                            }}
                                            icon={{
                                                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent('<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="white"/><circle cx="12" cy="12" r="8" fill="#10B981"/></svg>'),
                                                scaledSize: { width: 32, height: 32, equals: () => false }
                                            }}
                                        />
                                    )}
                                </GoogleMap>
                            ) : (
                                <div className="w-full h-full bg-slate-900 rounded-[1.5rem] flex items-center justify-center">
                                    <p className="text-gray-400 font-medium">Loading Map...</p>
                                </div>
                            )}
                        </div>

                        {/* Profile Header */}
                        <div className="bg-white border border-gray-100 rounded-[2rem] p-6 shadow-sm">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                <div className={`w-16 h-16 rounded-2xl flex-shrink-0 flex items-center justify-center text-white font-extrabold text-xl bg-gradient-to-br ${selectedEmployee.status === 'active' ? 'bg-slate-800 shadow-lg shadow-slate-900/10' : 'from-gray-400 to-gray-500'}`}>
                                    {selectedEmployee.name.charAt(0)}
                                </div>
                                <div className="flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h2 className="text-xl font-extrabold text-gray-900">{selectedEmployee.name}</h2>
                                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${getStatusStyle(selectedEmployee.status).badge}`}>
                                            {selectedEmployee.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500 font-medium mt-0.5">{selectedEmployee.role} • {selectedEmployee.region}</p>
                                    <div className="flex flex-wrap gap-4 mt-2">
                                        <span className="flex items-center text-xs font-bold text-gray-500">
                                            <MapPin className="w-3.5 h-3.5 mr-1 text-green-400" /> {selectedEmployee.currentLocation}
                                        </span>
                                        <span className="flex items-center text-xs font-bold text-gray-500">
                                            <Clock className="w-3.5 h-3.5 mr-1 text-green-400" /> Check-in: {selectedEmployee.checkInTime}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex gap-2 flex-shrink-0">
                                    <button className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:text-slate-800 hover:bg-slate-50 transition-colors" title="Call">
                                        <Phone className="w-5 h-5" />
                                    </button>
                                    <button className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:text-orange-600 hover:bg-orange-50 transition-colors" title="Message">
                                        <MessageSquare className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>


                            {/* Progress Bar */}
                            <div className="mt-5 pt-5 border-t border-gray-100">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Today's Visit Progress</span>
                                    <span className="text-sm font-extrabold text-slate-800">{selectedEmployee.visitsDone} / {selectedEmployee.visitsTarget}</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                                    <div
                                        className="h-2.5 rounded-full bg-slate-800 transition-all duration-700"
                                        style={{ width: `${(selectedEmployee.visitsDone / selectedEmployee.visitsTarget) * 100}%` }}
                                    ></div>
                                </div>
                                <div className="flex items-center justify-between mt-1.5">
                                    <span className="text-[10px] text-gray-400 font-medium">{Math.round((selectedEmployee.visitsDone / selectedEmployee.visitsTarget) * 100)}% complete</span>
                                    <span className="text-[10px] text-gray-400 font-medium">{selectedEmployee.visitsTarget - selectedEmployee.visitsDone} remaining</span>
                                </div>
                            </div>
                        </div>

                        {/* Activity Timeline */}
                        <div className="bg-white border border-gray-100 rounded-[2rem] p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-5">
                                <h3 className="font-extrabold text-gray-900 flex items-center gap-2">
                                    <Activity className="w-5 h-5 text-slate-700" /> Today's Activity Log
                                </h3>
                                <span className="text-xs font-bold text-gray-400">{new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })}</span>
                            </div>

                            {selectedEmployee.activities.length === 0 ? (
                                <div className="py-12 text-center text-gray-400 text-sm font-medium flex flex-col items-center gap-2">
                                    <AlertTriangle className="w-10 h-10 text-gray-300" />
                                    No activity recorded today. This officer has not checked in.
                                </div>
                            ) : (
                                <div className="relative">
                                    <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-gray-100"></div>
                                    <div className="space-y-4">
                                        {selectedEmployee.activities.map((activity, idx) => (
                                            <div key={idx} className="flex items-start gap-4 relative">
                                                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center z-10 ${getActivityStyle(activity.type)}`}>
                                                    {activity.type === 'checkin' && <User className="w-4 h-4" />}
                                                    {activity.type === 'visit' && <MapPin className="w-4 h-4" />}
                                                    {activity.type === 'form' && <CheckCircle2 className="w-4 h-4" />}
                                                    {activity.type === 'break' && <Clock className="w-4 h-4" />}
                                                </div>
                                                <div className="flex-1 pb-1">
                                                    <div className="flex items-center justify-between">
                                                        <p className="font-bold text-sm text-gray-900">{activity.action}</p>
                                                        <span className="text-xs text-gray-400 font-bold">{activity.time}</span>
                                                    </div>
                                                    <p className="text-xs text-gray-500 font-medium mt-0.5">{activity.location}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
