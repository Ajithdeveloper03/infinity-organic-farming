<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class DemoAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($phone = $request->header('X-Demo-Phone')) {
            $user = User::where('phone', $phone)->first();
            if ($user) {
                auth()->login($user);
            }
        }

        return $next($request);
    }
}
