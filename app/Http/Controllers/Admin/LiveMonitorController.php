<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\LocationLog;
use App\Models\FarmerVisit;
use Carbon\Carbon;
use Inertia\Inertia;

class LiveMonitorController extends Controller
{
    public function index()
    {
        // Get employees with role 'employee' or similar, assuming we just get users for now
        // For demonstration, let's fetch users who have location logs today
        $employees = User::with(['locationLogs' => function ($query) {
            $query->orderBy('recorded_at', 'desc')->take(1);
        }])->get()->map(function ($user) {
            $latestLocation = $user->locationLogs->first();
            $visitsToday = FarmerVisit::where('employee_id', $user->id)
                ->whereDate('created_at', Carbon::today())
                ->count();
                
            return [
                'id' => $user->id,
                'name' => $user->name,
                'role' => $user->role ?? 'Field Officer', // Default if no role
                'region' => $user->region ?? 'Unknown',
                'status' => $latestLocation && $latestLocation->recorded_at > Carbon::now()->subMinutes(15) ? 'active' : 'offline',
                'gps' => $latestLocation && $latestLocation->is_gps_enabled ? 'enabled' : 'disabled',
                'battery' => $latestLocation->battery_level ?? 0,
                'lastSeen' => $latestLocation ? Carbon::parse($latestLocation->recorded_at)->diffForHumans() : 'Never',
                'visitsDone' => $visitsToday,
                'visitsTarget' => 5, // Default target
                'currentLocation' => $latestLocation ? "Lat: {$latestLocation->latitude}, Lng: {$latestLocation->longitude}" : 'Unknown',
                'latitude' => $latestLocation->latitude ?? null,
                'longitude' => $latestLocation->longitude ?? null,
                'checkInTime' => '08:30 AM', // Mock or fetch from attendance
                'activities' => [] // Mock or fetch from logs
            ];
        });

        return Inertia::render('Admin/LiveMonitor', [
            'employees' => $employees
        ]);
    }
}
