<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\FarmerVisit;
use App\Models\AttendanceLog;
use App\Models\LocationPoint;
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
            ->whereHas('locationPoints', fn($q) => $q->whereDate('created_at', $today))
            ->count();

        $todayAttendance = AttendanceLog::whereDate('date', $today)->count();

        // Latest 20 location points for map (one per employee — latest ping)
        $locationLogs = LocationPoint::with('employee:id,name')
            ->whereDate('created_at', $today)
            ->orderBy('timestamp', 'desc')
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

        $recentFarmers = FarmerProfile::with('user:id,name')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get()
            ->map(fn($f) => [
                'id' => $f->user_id,
                'name' => $f->user?->name ?? 'Unknown',
                'farmer_code' => $f->farmer_code,
                'crop' => $f->crop_types ? implode(', ', $f->crop_types) : 'Vetiver',
                'acres' => $f->land_size_acres,
                'photo' => $f->farmer_photo_path ? \Illuminate\Support\Facades\Storage::url($f->farmer_photo_path) : null,
                'status' => $f->approval_status,
                'date' => $f->created_at->diffForHumans()
            ]);
            
        $pendingApprovals = FarmerProfile::with('user:id,name')
            ->where('approval_status', 'pending')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get()
            ->map(fn($f) => [
                'id' => $f->user_id,
                'name' => $f->user?->name ?? 'Unknown',
                'farmer_code' => $f->farmer_code,
                'district' => $f->district,
                'date' => $f->created_at->diffForHumans()
            ]);

        $agriStats = [
            'total_seed_bags' => FarmerProfile::sum('seed_bags_required'),
            'total_investment' => FarmerProfile::sum('planned_investment'),
            'total_land_acres' => FarmerProfile::sum('land_size_acres')
        ];

        return Inertia::render('Admin/Dashboard', [
            'locationLogs' => $locationLogs,
            'recentVisits' => $recentVisits,
            'recentFarmers' => $recentFarmers,
            'pendingApprovals' => $pendingApprovals,
            'agriStats' => $agriStats,
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
