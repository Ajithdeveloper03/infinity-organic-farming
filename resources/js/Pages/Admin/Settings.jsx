import React from 'react';
import AdminLayout from './AdminLayout';
import { 
    Settings2, BellRing, Map, Shield, Save
} from 'lucide-react';
import { useAlert } from '../../Components/AlertSystem';
import { useTranslation } from 'react-i18next';

export default function Settings() {
    const { triggerInfo } = useAlert();
    const { t } = useTranslation();

    const handleSave = () => {
        triggerInfo('System configuration updated successfully.');
    };

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-heading font-extrabold text-gray-900">{t('Settings')}</h1>
                        <p className="text-gray-500 mt-2 font-medium text-sm">Manage automations, geofencing, and RBAC.</p>
                    </div>
                    <button 
                        onClick={handleSave}
                        className="cursor-pointer bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-bold flex items-center transition-all shadow-md shadow-slate-900/10"
                    >
                        <Save className="w-4 h-4 mr-2" /> Save Changes
                    </button>
                </div>

                <div className="space-y-6">
                    {/* Geofence Config */}
                    <div className="cursor-pointer bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-shadow group">
                        <h2 className="text-xl font-heading font-bold text-gray-900 flex items-center mb-6 group-hover:text-slate-800 transition-colors">
                            <div className="p-2 bg-slate-50 border border-slate-200 rounded-xl mr-3 shadow-sm">
                                <Map className="w-5 h-5 text-slate-800" />
                            </div>
                            Geofence & Location Settings
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="cursor-pointer group/input">
                                <label className="cursor-pointer block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 group-hover/input:text-slate-800 transition-colors">Check-in Buffer Radius (Meters)</label>
                                <input type="number" defaultValue={100} className="cursor-pointer w-full bg-gray-50 border border-gray-200 rounded-xl text-gray-900 px-4 py-3 font-medium focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 focus:outline-none transition-shadow shadow-sm hover:border-green-300" />
                                <p className="text-xs font-medium text-gray-500 mt-2">Maximum distance allowed from farm coordinates to allow check-in.</p>
                            </div>
                            <div className="cursor-pointer group/input">
                                <label className="cursor-pointer block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 group-hover/input:text-slate-800 transition-colors">Stationary Alert Timeout (Minutes)</label>
                                <input type="number" defaultValue={45} className="cursor-pointer w-full bg-gray-50 border border-gray-200 rounded-xl text-gray-900 px-4 py-3 font-medium focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 focus:outline-none transition-shadow shadow-sm hover:border-green-300" />
                                <p className="text-xs font-medium text-gray-500 mt-2">Triggers High Alert if officer is stationary for too long.</p>
                            </div>
                        </div>
                    </div>

                    {/* Automation Config */}
                    <div className="cursor-pointer bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-shadow group">
                        <h2 className="text-xl font-heading font-bold text-gray-900 flex items-center mb-6 group-hover:text-orange-600 transition-colors">
                            <div className="p-2 bg-orange-50 border border-orange-100 rounded-xl mr-3 shadow-sm">
                                <BellRing className="w-5 h-5 text-orange-600" />
                            </div>
                            Smart Reminder Engine
                        </h2>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 border border-gray-100 p-5 rounded-2xl shadow-sm hover:border-orange-200 transition-colors gap-4">
                            <div>
                                <p className="font-bold text-gray-900">Daily Schedule Push Notification (Firebase)</p>
                                <p className="text-xs font-medium text-gray-500 mt-1">Automatically send daily visit schedules to officers.</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <input type="time" defaultValue="08:30" className="cursor-pointer bg-white border border-gray-200 rounded-lg font-bold text-gray-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-slate-1000 transition-shadow shadow-sm hover:border-orange-300" />
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600 shadow-inner"></div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* RBAC */}
                    <div className="cursor-pointer bg-gray-50 border border-gray-100 rounded-[2rem] p-8 shadow-inner opacity-80 hover:opacity-100 transition-opacity group">
                        <h2 className="text-xl font-heading font-bold text-gray-900 flex items-center mb-4 group-hover:text-gray-900 transition-colors">
                            <div className="p-2 bg-white rounded-xl mr-3 border border-gray-200 shadow-sm group-hover:border-gray-300">
                                <Shield className="w-5 h-5 text-gray-500" />
                            </div>
                            Role & Permission Management (RBAC)
                        </h2>
                        <p className="text-xs font-medium text-gray-500 ml-14">Settings for Super Admin, Regional Manager, and Auditor access controls will be configured here.</p>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
