<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FarmerVisit;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class VisitController extends Controller
{
    public function index(Request $request)
    {
        $search   = $request->query('search', '');
        $days     = $request->query('days', '30');
        $employeeId = $request->query('employee_id', '');

        $query = FarmerVisit::with(['employee:id,name', 'farmer:id,name'])
            ->orderBy('created_at', 'desc');

        if ($days !== 'all') {
            $query->whereDate('created_at', '>=', Carbon::now()->subDays((int)$days));
        }

        if ($employeeId) {
            $query->where('employee_id', $employeeId);
        }

        if ($search) {
            $query->whereHas('farmer', fn($q) => $q->where('name', 'like', "%{$search}%"))
                ->orWhereHas('employee', fn($q) => $q->where('name', 'like', "%{$search}%"));
        }

        $visits = $query->paginate(20)->through(fn($v) => [
            'id'       => $v->id,
            'farmer'   => ['user' => ['name' => $v->farmer?->name ?? 'Unknown Farmer']],
            'employee' => ['name' => $v->employee?->name ?? 'Unknown Employee'],
            'distance_from_previous_farmer_km' => $v->distance_from_previous_farmer_km ?? 0,
            'check_in_time'  => $v->check_in_time ? Carbon::parse($v->check_in_time)->format('h:i A') : 'N/A',
            'check_out_time' => $v->check_out_time ? Carbon::parse($v->check_out_time)->format('h:i A') : 'N/A',
            'date'           => $v->created_at->format('M d, Y'),
            'farm_condition_notes' => $v->farm_condition_notes ?? 'No notes provided.',
            'recommendations'      => $v->recommendations ?? 'No recommendations.',
            'media'          => [],
        ]);

        $employees = User::where('role', 'employee')->select('id', 'name')->orderBy('name')->get();

        return Inertia::render('Admin/Visits', [
            'visits'    => $visits,
            'employees' => $employees,
            'filters'   => ['search' => $search, 'days' => $days, 'employee_id' => $employeeId],
        ]);
    }
}
