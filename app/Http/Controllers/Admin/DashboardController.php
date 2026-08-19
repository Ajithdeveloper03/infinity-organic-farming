<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\LocationLog;
use App\Models\FarmerVisit;
use Carbon\Carbon;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $today = Carbon::today();
        $totalVisits = FarmerVisit::count();
        $activeEmployees = User::whereHas('locationLogs', function($q) use ($today) {
            $q->whereDate('recorded_at', $today);
        })->count();
        $totalFarmers = User::where('role', 'farmer')->count() ?: 120; // Fallback for UI if empty
        
        $locationLogs = LocationLog::with('employee')->whereDate('recorded_at', $today)->get();
        
        return Inertia::render('Admin/Dashboard', [
            'locationLogs' => $locationLogs,
            'stats' => [
                'totalVisits' => $totalVisits,
                'activeEmployees' => $activeEmployees,
                'totalFarmers' => $totalFarmers,
            ]
        ]);
    }
}
