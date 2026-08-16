import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { ShieldCheck, Mail, Lock, ArrowRight } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        // Mock authentication delay
        setTimeout(() => {
            router.post('/admin/login', { email, password });
        }, 1000);
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center font-sans overflow-hidden bg-surface-primary">
            <Head title="Login - Infinity Admin" />
            
            {/* Full Screen Background Image with Lighter Elegant Overlay */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="https://images.unsplash.com/photo-1595914614210-908bc79e438e?auto=format&fit=crop&q=80&w=2000" 
                    alt="Agricultural Landscape" 
                    className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/80 to-brand-green/20 backdrop-blur-md"></div>
            </div>

            {/* Login Container */}
            <div className="relative z-10 w-full max-w-md px-6">
                
                {/* Centered Logo */}
                <div className="flex flex-col items-center mb-10">
                    <div className="w-32 h-32 bg-white rounded-full border border-border-subtle shadow-xl mb-6 flex items-center justify-center overflow-hidden p-2">
                        <img src="/images/logo.jpg" alt="Infinity Organic Farming" className="w-full h-full object-contain" />
                    </div>
                    <h1 className="text-4xl font-heading font-extrabold text-brand-green tracking-tight text-center drop-shadow-sm">
                        INFINITY
                    </h1>
                    <p className="text-sm font-bold text-brand-orange uppercase tracking-widest mt-2">
                        Admin Portal
                    </p>
                </div>

                {/* Elegant Form */}
                <div className="bg-white/80 backdrop-blur-xl border border-border-subtle rounded-3xl p-8 shadow-2xl">
                    <div className="mb-8 text-center">
                        <h2 className="text-2xl font-heading font-bold text-text-main mb-2">Welcome Back</h2>
                        <p className="text-sm font-medium text-text-muted">Enter your credentials to access the secure dashboard.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="group">
                            <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-text-muted group-focus-within:text-brand-green transition-colors" />
                                </div>
                                <input 
                                    type="email" 
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-11 pr-4 py-3.5 bg-white border border-border-subtle rounded-xl text-text-main placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all shadow-sm"
                                    placeholder="admin@infinity.com"
                                />
                            </div>
                        </div>

                        <div className="group">
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider">Password</label>
                                <a href="#" className="text-xs font-bold text-brand-orange hover:text-brand-green transition-colors">Forgot Password?</a>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-text-muted group-focus-within:text-brand-green transition-colors" />
                                </div>
                                <input 
                                    type="password" 
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-11 pr-4 py-3.5 bg-white border border-border-subtle rounded-xl text-text-main placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all shadow-sm"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-brand-green hover:bg-brand-light-green text-white py-4 rounded-xl font-bold flex items-center justify-center transition-all shadow-md shadow-brand-green/20 hover:shadow-lg disabled:opacity-70"
                        >
                            {loading ? (
                                <div className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Authenticating...
                                </div>
                            ) : (
                                <>
                                    <ShieldCheck className="w-5 h-5 mr-2" />
                                    Secure Login
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
                
                <div className="mt-8 text-center text-xs font-bold text-text-muted tracking-wider">
                    &copy; 2026 INFINITY ORGANIC FARMING. ALL RIGHTS RESERVED.
                </div>
            </div>
        </div>
    );
}
