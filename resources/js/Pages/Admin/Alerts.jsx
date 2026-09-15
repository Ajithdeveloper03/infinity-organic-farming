import React from 'react';
import AdminLayout from './AdminLayout';
import { useTranslation } from 'react-i18next';
import { AlertCircle, TriangleAlert, Info, Bell, CheckCircle } from 'lucide-react';

export default function Alerts({ alerts = [] }) {
    const { t } = useTranslation();

    const getAlertIcon = (type) => {
        switch (type) {
            case 'critical':
                return <AlertCircle className="w-5 h-5 text-red-500" />;
            case 'high':
                return <TriangleAlert className="w-5 h-5 text-amber-500" />;
            case 'info':
                return <Info className="w-5 h-5 text-blue-500" />;
            default:
                return <Bell className="w-5 h-5 text-gray-500" />;
        }
    };

    const getAlertBg = (type) => {
        switch (type) {
            case 'critical':
                return 'bg-red-50 border-red-100';
            case 'high':
                return 'bg-amber-50 border-amber-100';
            case 'info':
                return 'bg-blue-50 border-blue-100';
            default:
                return 'bg-gray-50 border-gray-100';
        }
    };

    return (
        <AdminLayout>
            <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-heading font-extrabold text-gray-900">{t('Alerts & Notifications')}</h1>
                    <p className="text-gray-500 mt-1 font-medium text-sm">
                        {t('System logs and emergency alerts history')}
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100">
                <div className="space-y-4">
                    {alerts.length === 0 ? (
                        <div className="text-center py-10 text-gray-500">
                            <CheckCircle className="w-10 h-10 mx-auto text-gray-300 mb-2" />
                            <p className="font-semibold">{t('No alerts available')}</p>
                        </div>
                    ) : (
                        alerts.map(alert => (
                            <div key={alert.id} className={`flex items-start p-4 rounded-xl border ${getAlertBg(alert.type)}`}>
                                <div className="p-2 bg-white rounded-full shadow-sm mr-4">
                                    {getAlertIcon(alert.type)}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-bold text-gray-900">{t(alert.title)}</h3>
                                        <span className="text-xs font-medium text-gray-500">{alert.timestamp}</span>
                                    </div>
                                    <p className="text-sm text-gray-700">{t(alert.message)}</p>
                                    {alert.resolved && (
                                        <span className="inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-green-100 text-green-700">
                                            {t('Resolved')}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
