<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\FarmerVisit;
use App\Models\AttendanceLog;
use Inertia\Inertia;
use Carbon\Carbon;

class PerformanceController extends Controller
{
    public function index()
    {
        $today     = Carbon::today();
        $monthStart = Carbon::now()->startOfMonth();
        $weekStart  = Carbon::now()->startOfWeek();

        $employees = User::where('role', 'employee')
            ->where('status', 'active')
            ->with('employeeDetail')
            ->orderBy('name')
            ->get()
            ->map(function ($user) use ($today, $monthStart, $weekStart) {
                $visitsThisMonth = FarmerVisit::where('employee_id', $user->id)
                    ->whereDate('created_at', '>=', $monthStart)
                    ->count();

                $visitsThisWeek = FarmerVisit::where('employee_id', $user->id)
                    ->whereDate('created_at', '>=', $weekStart)
                    ->count();

                $totalVisits = FarmerVisit::where('employee_id', $user->id)->count();

                $attendanceLogs = AttendanceLog::where('employee_id', $user->id)
                    ->whereDate('date', '>=', $monthStart)
                    ->whereNotNull('check_in_timestamp')
                    ->get();
                    
                $daysPresent = $attendanceLogs->count();
                $workingDaysSoFar = Carbon::now()->diffInWeekdays($monthStart) + 1;
                $attendanceRate = $workingDaysSoFar > 0
                    ? round(($daysPresent / $workingDaysSoFar) * 100)
                    : 0;

                // Calculate average hours worked per day (standard is 9 hours: 9AM - 6PM)
                $totalMinutes = 0;
                foreach ($attendanceLogs as $log) {
                    if ($log->check_out_timestamp) {
                        $in = Carbon::parse($log->check_in_timestamp);
                        $out = Carbon::parse($log->check_out_timestamp);
                        $totalMinutes += $in->diffInMinutes($out);
                    } else if (Carbon::parse($log->date)->isToday()) {
                        $in = Carbon::parse($log->check_in_timestamp);
                        $totalMinutes += $in->diffInMinutes(Carbon::now());
                    }
                }
                $avgHours = $daysPresent > 0 ? round(($totalMinutes / 60) / $daysPresent, 1) : 0;

                // Average rating from farmer reviews
                $avgRating = \App\Models\FarmerVisit::join('farmer_reviews', 'farmer_visits.id', '=', 'farmer_reviews.visit_id')
                    ->where('farmer_visits.employee_id', $user->id)
                    ->avg('farmer_reviews.rating');

                // Performance score: weighted
                $score = min(100, ($visitsThisMonth * 3) + ($attendanceRate * 0.4) + (($avgRating ?? 0) * 5));

                return [
                    'id'              => $user->id,
                    'name'            => $user->name,
                    'employee_code'   => $user->employeeDetail?->employee_code ?? 'N/A',
                    'region'          => $user->employeeDetail?->assigned_region ?? 'Unassigned',
                    'visits_month'    => $visitsThisMonth,
                    'visits_week'     => $visitsThisWeek,
                    'total_visits'    => $totalVisits,
                    'attendance_rate' => $attendanceRate,
                    'avg_rating'      => $avgRating ? round($avgRating, 1) : null,
                    'avg_hours'       => $avgHours,
                    'score'           => round($score),
                    'target_visits'   => 20, // monthly target
                ];
            })
            ->sortByDesc('score')
            ->values();

        return Inertia::render('Admin/EmployeePerformance', [
            'employees' => $employees,
            'period'    => Carbon::now()->format('F Y'),
        ]);
    }
}
