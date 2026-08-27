<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function index()
    {
        // Redirect already-authenticated admin to dashboard
        if (Auth::check() && Auth::user()->role === 'admin') {
            return redirect('/admin/dashboard');
        }
        return Inertia::render('Auth/Login');
    }

    public function store(Request $request)
    {
        $credentials = $request->validate([
            'email'    => 'required|email',
            'password' => 'required|string',
        ]);

        if (!Auth::attempt($credentials, $request->boolean('remember'))) {
            return back()->withErrors(['email' => 'Invalid credentials. Please try again.']);
        }

        if (Auth::user()->role !== 'admin') {
            Auth::logout();
            return back()->withErrors(['email' => 'Access denied. Admin privileges required.']);
        }

        $request->session()->regenerate();
        return redirect('/admin/dashboard');
    }

    public function destroy(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/admin/login');
    }
}
