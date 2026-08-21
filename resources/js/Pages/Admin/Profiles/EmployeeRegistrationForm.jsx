import React from 'react';
import AdminLayout from '../AdminLayout';
import { useForm, Link } from '@inertiajs/react';
import { Shield, User, Phone, MapPin, ChevronLeft, Save, AlertCircle } from 'lucide-react';

export default function EmployeeRegistrationForm() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        phone: '',
        emergency_phone: '',
        assigned_region: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/employees');
    };

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-4">
                        <Link href="/admin/employees" className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                            <ChevronLeft className="w-6 h-6 text-gray-600" />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-heading font-extrabold text-gray-900">Register Employee</h1>
                            <p className="text-gray-500 mt-1 font-medium text-sm">Add a new team member to the system.</p>
                        </div>
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-8">
                        <div className="space-y-8">
                            
                            {/* Personal Info */}
                            <div>
                                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                                    <User className="w-5 h-5 mr-2 text-green-600" />
                                    Personal Information
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Enter full name"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                                        />
                                        {errors.name && <p className="text-red-500 text-xs font-bold mt-1">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Mobile Number (Username)</label>
                                        <input
                                            type="text"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            placeholder="Enter 10-digit mobile number"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">This will be used for logging into the app.</p>
                                        {errors.phone && <p className="text-red-500 text-xs font-bold mt-1">{errors.phone}</p>}
                                    </div>
                                </div>
                            </div>

                            <hr className="border-gray-100" />

                            {/* Operational Info */}
                            <div>
                                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                                    <Shield className="w-5 h-5 mr-2 text-amber-500" />
                                    Operational Details
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Emergency Contact Number</label>
                                        <input
                                            type="text"
                                            value={data.emergency_phone}
                                            onChange={(e) => setData('emergency_phone', e.target.value)}
                                            placeholder="Emergency contact"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                                        />
                                        {errors.emergency_phone && <p className="text-red-500 text-xs font-bold mt-1">{errors.emergency_phone}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Assigned Region</label>
                                        <input
                                            type="text"
                                            value={data.assigned_region}
                                            onChange={(e) => setData('assigned_region', e.target.value)}
                                            placeholder="e.g. Coimbatore South"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                                        />
                                        {errors.assigned_region && <p className="text-red-500 text-xs font-bold mt-1">{errors.assigned_region}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Password Notice */}
                            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start">
                                <AlertCircle className="w-5 h-5 text-blue-500 mr-3 mt-0.5 shrink-0" />
                                <div>
                                    <h4 className="text-sm font-bold text-blue-900">Secure Password Generation</h4>
                                    <p className="text-sm text-blue-700 mt-1">A highly secure password will be automatically generated for this account. You will be able to view and copy it on the next screen after saving.</p>
                                </div>
                            </div>

                        </div>

                        {/* Submit Actions */}
                        <div className="flex justify-end mt-8 pt-6 border-t border-gray-100 gap-4">
                            <Link href="/admin/employees" className="px-6 py-3 text-sm font-bold text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors shadow-md shadow-green-600/20 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                <Save className="w-4 h-4 mr-2" />
                                {processing ? 'Registering...' : 'Register Employee'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
