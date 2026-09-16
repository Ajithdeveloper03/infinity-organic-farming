<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class DemoAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($phone = $request->header('X-Demo-Phone')) {
            $user = \App\Models\User::where('phone', $phone)->first();
            if ($user) {
                auth()->login($user);
            }
        }
        return $next($request);
    }
}
