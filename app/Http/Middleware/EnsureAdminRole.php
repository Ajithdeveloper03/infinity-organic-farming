<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class EnsureAdminRole
{
    /**
     * Handle an incoming request.
     * Redirect non-authenticated or non-admin users to the login page.
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!Auth::check()) {
            return redirect()->route('login')->with('error', 'Please log in to access the admin panel.');
        }

        if (Auth::user()->role !== 'admin') {
            Auth::logout();
            return redirect()->route('login')->with('error', 'Access denied. Admin privileges required.');
        }

        return $next($request);
    }
}
