import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
    LayoutDashboard, Users, FileCheck2, ShieldAlert, 
    Settings, MapPin, Search, Bell, PlusCircle, Globe, Briefcase,
    ChevronLeft, ChevronRight, Wallet, ClipboardList
} from 'lucide-react';
import { useAlert } from '../../Components/AlertSystem';
import { useTranslation } from 'react-i18next';

export default function AdminLayout({ children }) {
    const { url } = usePage();
    const { triggerCritical } = useAlert();
    const { t, i18n } = useTranslation();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const isActive = (path) => url.startsWith(path);

    const testAlert = () => {
        triggerCritical("OFFICER JOHN DOE - GPS DISABLED - SECTOR 4");
    };

    const toggleLanguage = () => {
        const nextLang = i18n.language === 'en' ? 'ta' : 'en';
        i18n.changeLanguage(nextLang);
    };

    return (
        <div className="flex h-screen bg-gray-50 text-gray-800 font-sans overflow-hidden">
            
            {/* Left Vertical Sidebar */}
            <aside className={`${isSidebarCollapsed ? 'w-20' : 'w-64'} bg-white border-r border-gray-100 flex flex-col z-20 shadow-sm transition-all duration-300 relative`}>
                
                {/* Toggle Button */}
                <button 
                    onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    className="absolute -right-3 top-8 bg-white border border-gray-200 rounded-full p-1 text-gray-500 hover:text-green-600 hover:border-green-200 shadow-sm transition-colors z-50 cursor-pointer"
                >
                    {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>

                <div className="h-24 flex items-center justify-center border-b border-gray-50/50 overflow-hidden">
                    <Link href="/admin/dashboard" className="flex items-center justify-center w-full px-4">
                        {isSidebarCollapsed ? (
                            <img src="/images/logo.png" alt="IO" className="h-10 w-10 object-cover drop-shadow-sm rounded-full" />
                        ) : (
                            <img src="/images/logo.png" alt="Infinity Organics" className="h-12 w-auto object-contain drop-shadow-sm" />
                        )}
                    </Link>
                </div>
                
                <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto overflow-x-hidden">
                    <div className={`px-2 pt-2 pb-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest ${isSidebarCollapsed ? 'text-center' : ''}`}>
                        {isSidebarCollapsed ? '•' : t('Main Menu')}
                    </div>
                    
                    <Link href="/admin/dashboard" className={`cursor-pointer flex items-center ${isSidebarCollapsed ? 'justify-center px-0' : 'px-4'} py-3 rounded-2xl transition-all duration-300 font-bold text-sm ${isActive('/admin/dashboard') ? 'bg-gray-900 text-white shadow-md shadow-gray-900/20' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
                        <LayoutDashboard className={`w-5 h-5 ${isSidebarCollapsed ? '' : 'mr-3'} ${isActive('/admin/dashboard') ? 'text-white' : 'text-gray-400'}`} />
                        {!isSidebarCollapsed && <span>{t('Dashboard')}</span>}
                    </Link>
                    
                    <Link href="/admin/visits" className={`cursor-pointer flex items-center ${isSidebarCollapsed ? 'justify-center px-0' : 'px-4'} py-3 rounded-2xl transition-all duration-300 font-bold text-sm ${isActive('/admin/visits') ? 'bg-gray-900 text-white shadow-md shadow-gray-900/20' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
                        <FileCheck2 className={`w-5 h-5 ${isSidebarCollapsed ? '' : 'mr-3'} ${isActive('/admin/visits') ? 'text-white' : 'text-gray-400'}`} />
                        {!isSidebarCollapsed && <span>{t('Analytics & Visits')}</span>}
                    </Link>
                    
                    {/* Live Monitor - highlighted with pulse indicator */}
                    <Link href="/admin/monitor" className={`cursor-pointer flex items-center ${isSidebarCollapsed ? 'justify-center px-0' : 'px-4'} py-3 rounded-2xl transition-all duration-300 font-bold text-sm relative ${isActive('/admin/monitor') ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md' : 'text-green-600 bg-green-50 hover:bg-green-100'}`}>
                        <span className={`absolute ${isSidebarCollapsed ? 'top-2 right-2' : 'right-3 top-3.5'} h-2 w-2 rounded-full bg-green-400 ring-2 ring-white animate-pulse`}></span>
                        <ShieldAlert className={`w-5 h-5 ${isSidebarCollapsed ? '' : 'mr-3'} ${isActive('/admin/monitor') ? 'text-white' : 'text-green-500'}`} />
                        {!isSidebarCollapsed && <span>{t('Live Monitor')}</span>}
                    </Link>

                    <div className={`px-2 pt-5 pb-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest ${isSidebarCollapsed ? 'text-center' : ''}`}>
                        {isSidebarCollapsed ? '•' : t('Features')}
                    </div>
                    
                    <Link href="/admin/employees" className={`cursor-pointer flex items-center ${isSidebarCollapsed ? 'justify-center px-0' : 'px-4'} py-3 rounded-2xl transition-all duration-300 font-bold text-sm ${isActive('/admin/employees') ? 'bg-gray-900 text-white shadow-md shadow-gray-900/20' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
                        <Briefcase className={`w-5 h-5 ${isSidebarCollapsed ? '' : 'mr-3'} ${isActive('/admin/employees') ? 'text-white' : 'text-gray-400'}`} />
                        {!isSidebarCollapsed && <span>{t('Employees')}</span>}
                    </Link>
                    
                    <Link href="/admin/farmers" className={`cursor-pointer flex items-center ${isSidebarCollapsed ? 'justify-center px-0' : 'px-4'} py-3 rounded-2xl transition-all duration-300 font-bold text-sm ${isActive('/admin/farmers') ? 'bg-gray-900 text-white shadow-md shadow-gray-900/20' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
                        <Users className={`w-5 h-5 ${isSidebarCollapsed ? '' : 'mr-3'} ${isActive('/admin/farmers') ? 'text-white' : 'text-gray-400'}`} />
                        {!isSidebarCollapsed && <span>{t('Farmers')}</span>}
                    </Link>
                    
                    <Link href="/admin/pending-farmers" className={`cursor-pointer flex items-center ${isSidebarCollapsed ? 'justify-center px-0' : 'justify-between px-4'} py-3 rounded-2xl transition-all duration-300 font-bold text-sm ${isActive('/admin/pending-farmers') ? 'bg-gray-900 text-white shadow-md shadow-gray-900/20' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'} relative`}>
                        <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center w-full' : ''}`}>
                            <PlusCircle className={`w-5 h-5 ${isSidebarCollapsed ? '' : 'mr-3'} ${isActive('/admin/pending-farmers') ? 'text-white' : 'text-gray-400'}`} />
                            {!isSidebarCollapsed && <span>{t('Pending Farmers')}</span>}
                        </div>
                        {!isSidebarCollapsed && <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isActive('/admin/pending-farmers') ? 'bg-white text-gray-900' : 'bg-red-100 text-red-600'}`}>12</span>}
                        {isSidebarCollapsed && <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>}
                    </Link>

                    <Link href="/admin/payments" className={`cursor-pointer flex items-center ${isSidebarCollapsed ? 'justify-center px-0' : 'px-4'} py-3 rounded-2xl transition-all duration-300 font-bold text-sm ${isActive('/admin/payments') ? 'bg-gray-900 text-white shadow-md shadow-gray-900/20' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
                        <Wallet className={`w-5 h-5 ${isSidebarCollapsed ? '' : 'mr-3'} ${isActive('/admin/payments') ? 'text-white' : 'text-gray-400'}`} />
                        {!isSidebarCollapsed && <span>{t('Payments')}</span>}
                    </Link>

                    <Link href="/admin/tasks" className={`cursor-pointer flex items-center ${isSidebarCollapsed ? 'justify-center px-0' : 'px-4'} py-3 rounded-2xl transition-all duration-300 font-bold text-sm ${isActive('/admin/tasks') ? 'bg-gray-900 text-white shadow-md shadow-gray-900/20' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
                        <ClipboardList className={`w-5 h-5 ${isSidebarCollapsed ? '' : 'mr-3'} ${isActive('/admin/tasks') ? 'text-white' : 'text-gray-400'}`} />
                        {!isSidebarCollapsed && <span>{t('Tasks & Schedule')}</span>}
                    </Link>
                    
                    <div className={`px-2 pt-5 pb-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest ${isSidebarCollapsed ? 'text-center' : ''}`}>
                        {isSidebarCollapsed ? '•' : t('General')}
                    </div>
                    
                    <Link href="/admin/settings" className={`cursor-pointer flex items-center ${isSidebarCollapsed ? 'justify-center px-0' : 'px-4'} py-3 rounded-2xl transition-all duration-300 font-bold text-sm ${isActive('/admin/settings') ? 'bg-gray-900 text-white shadow-md shadow-gray-900/20' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
                        <Settings className={`w-5 h-5 ${isSidebarCollapsed ? '' : 'mr-3'} ${isActive('/admin/settings') ? 'text-white' : 'text-gray-400'}`} />
                        {!isSidebarCollapsed && <span>{t('Settings')}</span>}
                    </Link>
                    
                    <Link href="/admin/performance" className={`cursor-pointer flex items-center ${isSidebarCollapsed ? 'justify-center px-0' : 'px-4'} py-3 rounded-2xl transition-all duration-300 font-bold text-sm ${isActive('/admin/performance') ? 'bg-gray-900 text-white shadow-md shadow-gray-900/20' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
                        <MapPin className={`w-5 h-5 ${isSidebarCollapsed ? '' : 'mr-3'} ${isActive('/admin/performance') ? 'text-white' : 'text-gray-400'}`} />
                        {!isSidebarCollapsed && <span>{t('Performance')}</span>}
                    </Link>
                </nav>
            </aside>
            
            {/* Main Canvas */}
            <main className="flex-1 flex flex-col min-w-0 bg-[#f9fafb] relative">
                {/* Top Navigation Bar */}
                <header className="h-20 bg-white/70 backdrop-blur-xl border-b border-gray-100 flex items-center justify-between px-8 z-10 sticky top-0">
                    {/* Left: Breadcrumb */}
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 text-sm font-bold text-gray-400">
                            <span>Admin</span>
                            <span className="text-gray-300">/</span>
                            <span className="text-gray-900 capitalize">{url.split('/').pop() || 'Dashboard'}</span>
                        </div>
                    </div>
                    
                    {/* Right: Search, Actions, Profile */}
                    <div className="flex items-center space-x-6">
                        <div className="relative group hidden md:block">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-gray-400" />
                            </div>
                            <input 
                                type="text" 
                                placeholder="Search..." 
                                className="block w-64 pl-10 pr-4 py-2 border border-gray-200 bg-gray-50 rounded-full text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all text-sm font-medium"
                            />
                            <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                                <span className="text-[10px] font-bold text-gray-400 border border-gray-200 px-1.5 py-0.5 rounded bg-white">⌘ K</span>
                            </div>
                        </div>

                        <button 
                            onClick={testAlert}
                            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition"
                            title="Test Emergency Alert"
                        >
                            <ShieldAlert className="w-5 h-5" />
                        </button>

                        <button 
                            onClick={toggleLanguage}
                            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-green-600 hover:border-green-200 hover:bg-green-50 transition"
                            title="Toggle Language"
                        >
                            <Globe className="w-5 h-5" />
                        </button>

                        <button className="relative w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                        </button>
                        
                        <div className="flex items-center pl-2 border-l border-gray-200 cursor-pointer group">
                            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-100 group-hover:border-green-500 transition-all bg-white p-0.5">
                                <img src="https://ui-avatars.com/api/?name=User&background=10b981&color=fff" alt="Profile" className="w-full h-full object-cover rounded-full" />
                            </div>
                            <div className="ml-3 hidden md:block">
                                <p className="text-sm font-bold text-gray-900 leading-tight">Super Admin</p>
                                <p className="text-xs font-semibold text-gray-500">HQ Operations</p>
                            </div>
                        </div>
                    </div>
                </header>
                
                {/* Dashboard / View Content */}
                <div className="flex-1 overflow-auto p-8 max-w-[1600px] mx-auto w-full z-10">
                    {children}
                </div>
            </main>
        </div>
    );
}