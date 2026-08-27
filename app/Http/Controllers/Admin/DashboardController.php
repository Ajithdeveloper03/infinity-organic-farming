<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\FarmerVisit;
use App\Models\AttendanceLog;
use App\Models\LocationLog;
use App\Models\FarmerProfile;
use Carbon\Carbon;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $today     = Carbon::today();
        $weekStart = Carbon::now()->startOfWeek();

        $totalVisits     = FarmerVisit::count();
        $weeklyVisits    = FarmerVisit::whereDate('created_at', '>=', $weekStart)->count();
        $totalEmployees  = User::where('role', 'employee')->where('status', 'active')->count();
        $totalFarmers    = User::where('role', 'farmer')->count();
        $pendingFarmers  = FarmerProfile::where('approval_status', 'pending')->count()
                         + User::where('role', 'farmer')->where('status', 'pending_approval')->count();

        $activeEmployees = User::where('role', 'employee')
            ->whereHas('locationLogs', fn($q) => $q->whereDate('recorded_at', $today))
            ->count();

        $todayAttendance = AttendanceLog::whereDate('date', $today)->count();

        // Latest 20 location logs for map (one per employee — latest ping)
        $locationLogs = LocationLog::with('employee:id,name')
            ->whereDate('recorded_at', $today)
            ->orderBy('recorded_at', 'desc')
            ->get()
            ->unique('employee_id')
            ->take(20)
            ->values();

        // Recent 5 farmer visits for activity feed
        $recentVisits = FarmerVisit::with(['employee:id,name', 'farmer:id,name'])
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get()
            ->map(fn($v) => [
                'id'           => $v->id,
                'employee'     => $v->employee?->name ?? 'Unknown',
                'farmer'       => $v->farmer?->name ?? 'Unknown',
                'time'         => Carbon::parse($v->check_in_time)->diffForHumans(),
                'date'         => Carbon::parse($v->created_at)->format('M d, Y'),
            ]);

        return Inertia::render('Admin/Dashboard', [
            'locationLogs' => $locationLogs,
            'recentVisits' => $recentVisits,
            'stats'        => [
                'totalVisits'     => $totalVisits,
                'weeklyVisits'    => $weeklyVisits,
                'activeEmployees' => $activeEmployees,
                'totalEmployees'  => $totalEmployees,
                'totalFarmers'    => $totalFarmers,
                'pendingFarmers'  => $pendingFarmers,
                'todayAttendance' => $todayAttendance,
            ],
        ]);
    }
}
