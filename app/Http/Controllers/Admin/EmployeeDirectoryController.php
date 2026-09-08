<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\EmployeeDetail;
use App\Models\AttendanceLog;
use App\Models\FarmerVisit;
use App\Models\LocationLog;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class EmployeeDirectoryController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search', '');
        $region = $request->query('region', '');

        $employees = User::where('role', 'employee')
            ->with(['employeeDetail', 'attendanceLogs' => fn($q) => $q->whereDate('date', Carbon::today())])
            ->when($search, fn($q) => $q->where(fn($sub) =>
                $sub->where('name', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%")
                    ->orWhereHas('employeeDetail', fn($ed) =>
                        $ed->where('employee_code', 'like', "%{$search}%")
                    )
            ))
            ->when($region, fn($q) => $q->whereHas('employeeDetail', fn($ed) =>
                $ed->where('assigned_region', 'like', "%{$region}%")
            ))
            ->orderBy('name')
            ->get()
            ->map(fn($user) => [
                'id'           => $user->id,
                'name'         => $user->name,
                'phone'        => $user->phone,
                'email'        => $user->email,
                'status'       => $user->status,
                'employee_code'=> $user->employeeDetail?->employee_code ?? 'N/A',
                'region'       => $user->employeeDetail?->assigned_region ?? 'Unassigned',
                'designation'  => $user->employeeDetail?->designation ?? 'field_officer',
                'reports_to'   => $user->employeeDetail?->reports_to,
                'manager_name' => $user->employeeDetail?->reports_to ? \App\Models\User::find($user->employeeDetail->reports_to)?->name : 'None',
                'emergency'    => $user->employeeDetail?->emergency_phone ?? 'N/A',
                'checked_in'   => $user->attendanceLogs->isNotEmpty(),
            ]);

        // Unique regions for filter dropdown
        $regions = EmployeeDetail::distinct()->pluck('assigned_region')->filter()->values();

        return Inertia::render('Admin/Profiles/EmployeeList', [
            'employees' => $employees,
            'regions'   => $regions,
            'filters'   => ['search' => $search, 'region' => $region],
        ]);
    }

    public function show($id)
    {
        $user = User::where('id', $id)->where('role', 'employee')
            ->with('employeeDetail')
            ->firstOrFail();

        $today     = Carbon::today();
        $weekStart = Carbon::now()->startOfWeek();

        $attendance = AttendanceLog::where('employee_id', $id)
            ->orderBy('date', 'desc')
            ->take(7)
            ->get()
            ->map(fn($a) => [
                'date'       => $a->date->format('M d, Y'),
                'check_in'   => $a->check_in_timestamp?->format('h:i A') ?? 'N/A',
                'check_out'  => $a->check_out_timestamp?->format('h:i A') ?? 'N/A',
                'status'     => $a->check_in_timestamp ? 'present' : 'absent',
            ]);

        $visitsThisWeek = FarmerVisit::where('employee_id', $id)
            ->whereDate('created_at', '>=', $weekStart)
            ->with('farmer:id,name')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(fn($v) => [
                'id'          => $v->id,
                'farmer_name' => $v->farmer?->name ?? 'Unknown',
                'check_in'    => $v->check_in_time ? Carbon::parse($v->check_in_time)->format('h:i A') : 'N/A',
                'check_out'   => $v->check_out_time ? Carbon::parse($v->check_out_time)->format('h:i A') : 'N/A',
                'date'        => Carbon::parse($v->created_at)->format('M d, Y'),
                'notes'       => $v->farm_condition_notes,
            ]);

        $lastLocation = LocationLog::where('employee_id', $id)
            ->orderBy('recorded_at', 'desc')
            ->first();

        return Inertia::render('Admin/Profiles/EmployeeDetail', [
            'employee' => [
                'id'            => $user->id,
                'name'          => $user->name,
                'phone'         => $user->phone,
                'email'         => $user->email,
                'status'        => $user->status,
                'employee_code' => $user->employeeDetail?->employee_code,
                'region'        => $user->employeeDetail?->assigned_region,
                'emergency'     => $user->employeeDetail?->emergency_phone,
                'joined'        => $user->created_at->format('M d, Y'),
                'last_latitude' => $lastLocation?->latitude,
                'last_longitude'=> $lastLocation?->longitude,
                'last_seen'     => $lastLocation ? Carbon::parse($lastLocation->recorded_at)->diffForHumans() : 'Never',
                'battery'       => $lastLocation?->battery_level ?? 0,
            ],
            'attendance'    => $attendance,
            'visitsThisWeek'=> $visitsThisWeek,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Profiles/EmployeeRegistrationForm');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'            => 'required|string|max:255',
            'phone'           => 'required|string|unique:users,phone|max:20',
            'emergency_phone' => 'nullable|string|max:20',
            'assigned_region' => 'nullable|string|max:255',
        ]);

        $password = Str::random(12);
        $email    = $validated['phone'] . '@infinityorganics.com';

        $user = User::create([
            'name'     => $validated['name'],
            'phone'    => $validated['phone'],
            'email'    => $email,
            'password' => Hash::make($password),
            'role'     => 'employee',
            'status'   => 'active',
        ]);

        $region = $validated['assigned_region'] ?? '';
        $prefix = $region ? strtoupper(substr(preg_replace('/[^a-zA-Z]/', '', $region), 0, 3)) : 'XXX';
        
        EmployeeDetail::create([
            'user_id'         => $user->id,
            'employee_code'   => $prefix . '-EMP-' . str_pad($user->id, 3, '0', STR_PAD_LEFT),
            'emergency_phone' => $validated['emergency_phone'] ?? null,
            'assigned_region' => $validated['assigned_region'] ?? null,
        ]);

        return redirect('/admin/employees')
            ->with('success', 'Employee created successfully.')
            ->with('generated_password', $password);
    }

    public function edit($id)
    {
        $user = User::where('id', $id)->where('role', 'employee')
            ->with('employeeDetail')
            ->firstOrFail();

        return Inertia::render('Admin/Profiles/EmployeeDetail', [
            'employee' => [
                'id'            => $user->id,
                'name'          => $user->name,
                'phone'         => $user->phone,
                'status'        => $user->status,
                'employee_code' => $user->employeeDetail?->employee_code,
                'region'        => $user->employeeDetail?->assigned_region,
                'emergency'     => $user->employeeDetail?->emergency_phone,
            ],
            'editing' => true,
        ]);
    }

    public function update(Request $request, $id)
    {
        $user = User::where('id', $id)->where('role', 'employee')->firstOrFail();

        $validated = $request->validate([
            'name'            => 'required|string|max:255',
            'assigned_region' => 'nullable|string|max:255',
            'emergency_phone' => 'nullable|string|max:20',
            'status'          => 'required|in:active,disabled',
        ]);

        $user->update(['name' => $validated['name'], 'status' => $validated['status']]);
        $user->employeeDetail?->update([
            'assigned_region' => $validated['assigned_region'],
            'emergency_phone' => $validated['emergency_phone'],
        ]);

        return redirect('/admin/employees/' . $id)->with('success', 'Employee updated.');
    }
}
