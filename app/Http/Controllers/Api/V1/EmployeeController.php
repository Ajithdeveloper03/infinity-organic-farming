<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\AttendanceLog;
use App\Models\FarmerProfile;
use App\Models\FarmerVisit;
use App\Models\LocationLog;
use App\Models\User;
use App\Events\LocationUpdated;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;

class EmployeeController extends Controller
{
    /**
     * Mark attendance (check-in or check-out).
     * POST /api/v1/employee/attendance
     */
    public function attendance(Request $request)
    {
        $validated = $request->validate([
            'latitude'  => 'required|numeric',
            'longitude' => 'required|numeric',
            'action'    => 'required|in:check_in,check_out',
        ]);

        $employeeId = $request->user()->id;
        $today      = Carbon::today()->toDateString();

        $attendance = AttendanceLog::where('employee_id', $employeeId)
            ->where('date', $today)
            ->first();

        if ($validated['action'] === 'check_in') {
            if (!$attendance) {
                AttendanceLog::create([
                    'employee_id'         => $employeeId,
                    'check_in_timestamp'  => now(),
                    'check_in_latitude'   => $validated['latitude'],
                    'check_in_longitude'  => $validated['longitude'],
                    'date'                => $today,
                ]);
            }
        } elseif ($validated['action'] === 'check_out') {
            if ($attendance && !$attendance->check_out_timestamp) {
                $attendance->update([
                    'check_out_timestamp'  => now(),
                    'check_out_latitude'   => $validated['latitude'],
                    'check_out_longitude'  => $validated['longitude'],
                ]);
            }
        }

        return response()->json(['status' => 'success']);
    }

    /**
     * Record a live location ping from the mobile app.
     * POST /api/v1/employee/location-ping
     */
    public function locationPing(Request $request)
    {
        $validated = $request->validate([
            'latitude'       => 'required|numeric',
            'longitude'      => 'required|numeric',
            'is_gps_enabled' => 'required|boolean',
            'battery_level'  => 'required|integer',
        ]);

        $request->user()->locationLogs()->create([
            'latitude'       => $validated['latitude'],
            'longitude'      => $validated['longitude'],
            'is_gps_enabled' => $validated['is_gps_enabled'],
            'battery_level'  => $validated['battery_level'],
            'recorded_at'    => now(),
        ]);

        broadcast(new LocationUpdated(
            $request->user()->id,
            $validated['latitude'],
            $validated['longitude'],
            $validated['is_gps_enabled'],
            $validated['battery_level']
        ));

        // Alert conditions
        if (!$validated['is_gps_enabled'] || $validated['battery_level'] < 15) {
            return response()->json(['status' => 'critical_alert', 'message' => 'GPS off or battery critical.'], 200);
        }

        return response()->json(['status' => 'success']);
    }

    /**
     * Register a new farmer in the field.
     * POST /api/v1/employee/farmer/register
     */
    public function registerFarmer(Request $request)
    {
        $validated = $request->validate([
            'name'            => 'required|string',
            'phone'           => 'required|string|unique:users,phone',
            'land_size_acres' => 'nullable|numeric',
            'land_latitude'   => 'nullable|numeric',
            'land_longitude'  => 'nullable|numeric',
            'land_address'    => 'nullable|string',
            'village'         => 'nullable|string',
            'district'        => 'nullable|string',
            'state'             => 'nullable|string',
            'soil_type'         => 'nullable|string',
            'irrigation_type'   => 'nullable|string',
            'customer_category' => 'nullable|in:crop,fertilizer,both',
            'crop_types'        => 'nullable|array',
        ]);

        $farmerUser = User::create([
            'name'     => $validated['name'],
            'phone'    => $validated['phone'],
            'email'    => $validated['phone'] . '@farmer.inymart.com',
            'password' => Hash::make($validated['phone']), // default: phone as password
            'role'     => 'farmer',
            'status'   => 'pending_approval',
        ]);

        $district = $validated['district'] ?? '';
        $prefix = $district ? strtoupper(substr(preg_replace('/[^a-zA-Z]/', '', $district), 0, 3)) : 'XXX';

        $profile = FarmerProfile::create([
            'user_id'                => $farmerUser->id,
            'created_by_employee_id' => $request->user()->id,
            'approval_status'        => 'pending',
            'farmer_code'            => $prefix . '-FMR-' . str_pad($farmerUser->id, 3, '0', STR_PAD_LEFT),
            'land_size_acres'        => $validated['land_size_acres'] ?? null,
            'land_latitude'          => $validated['land_latitude'] ?? null,
            'land_longitude'         => $validated['land_longitude'] ?? null,
            'land_address'           => $validated['land_address'] ?? null,
            'mobile_number'          => $validated['phone'],
            'village'                => $validated['village'] ?? null,
            'district'               => $validated['district'] ?? null,
            'state'                  => $validated['state'] ?? null,
            'soil_type'              => $validated['soil_type'] ?? null,
            'irrigation_type'        => $validated['irrigation_type'] ?? null,
            'customer_category'      => $validated['customer_category'] ?? 'crop',
            'crop_types'             => $validated['crop_types'] ?? null,
            'kyc_status'             => 'pending',
        ]);

        return response()->json([
            'status'     => 'success',
            'farmer_id'  => $farmerUser->id,
            'farmer_code'=> $profile->farmer_code,
        ]);
    }

    /**
     * Submit/check-in to a farmer visit.
     * POST /api/v1/employee/visit/submit
     */
    public function submitVisit(Request $request)
    {
        $validated = $request->validate([
            'farmer_id'            => 'required|exists:users,id',
            'check_in_latitude'    => 'nullable|numeric',
            'check_in_longitude'   => 'nullable|numeric',
            'farm_condition_notes' => 'nullable|string',
            'recommendations'      => 'nullable|string',
        ]);

        $visit = FarmerVisit::create([
            'employee_id'          => $request->user()->id,
            'farmer_id'            => $validated['farmer_id'],
            'check_in_time'        => now(),
            'check_in_latitude'    => $validated['check_in_latitude'] ?? null,
            'check_in_longitude'   => $validated['check_in_longitude'] ?? null,
            'farm_condition_notes' => $validated['farm_condition_notes'] ?? null,
            'recommendations'      => $validated['recommendations'] ?? null,
        ]);

        return response()->json(['status' => 'success', 'visit_id' => $visit->id]);
    }

    /**
     * Check out of a farmer visit.
     * POST /api/v1/employee/visit/{id}/checkout
     */
    public function checkoutVisit(Request $request, $id)
    {
        $validated = $request->validate([
            'check_out_latitude'   => 'nullable|numeric',
            'check_out_longitude'  => 'nullable|numeric',
            'farm_condition_notes' => 'nullable|string',
            'recommendations'      => 'nullable|string',
        ]);

        $visit = FarmerVisit::where('id', $id)
            ->where('employee_id', $request->user()->id)
            ->firstOrFail();

        $visit->update([
            'check_out_time'       => now(),
            'check_out_latitude'   => $validated['check_out_latitude'] ?? null,
            'check_out_longitude'  => $validated['check_out_longitude'] ?? null,
            'farm_condition_notes' => $validated['farm_condition_notes'] ?? $visit->farm_condition_notes,
            'recommendations'      => $validated['recommendations'] ?? $visit->recommendations,
        ]);

        return response()->json(['status' => 'success']);
    }

    /**
     * Get today's dashboard stats for the logged-in employee.
     * GET /api/v1/employee/dashboard
     */
    public function dashboard(Request $request)
    {
        $user  = $request->user();
        $today = Carbon::today();

        $attendance = AttendanceLog::where('employee_id', $user->id)
            ->whereDate('date', $today)
            ->first();

        $visitsToday = FarmerVisit::where('employee_id', $user->id)
            ->whereDate('check_in_time', $today)
            ->count();

        $totalFarmers = FarmerProfile::where('created_by_employee_id', $user->id)->count();

        return response()->json([
            'status' => 'success',
            'data'   => [
                'employee'      => ['id' => $user->id, 'name' => $user->name],
                'attendance'    => $attendance ? [
                    'checked_in'  => true,
                    'check_in_at' => $attendance->check_in_timestamp?->format('h:i A'),
                    'checked_out' => !is_null($attendance->check_out_timestamp),
                ] : ['checked_in' => false],
                'visits_today'   => $visitsToday,
                'total_farmers'  => $totalFarmers,
            ],
        ]);
    }

    /**
     * List farmers registered by the logged-in employee.
     * GET /api/v1/employee/farmers
     */
    public function myFarmers(Request $request)
    {
        $farmers = FarmerProfile::where('created_by_employee_id', $request->user()->id)
            ->with('user')
            ->get()
            ->map(fn($fp) => [
                'id'           => $fp->user->id,
                'name'         => $fp->user->name,
                'phone'        => $fp->user->phone,
                'farmer_code'  => $fp->farmer_code,
                'land_address' => $fp->land_address,
                'kyc_status'   => $fp->kyc_status,
                'land_acres'   => $fp->land_size_acres,
            ]);

        return response()->json(['status' => 'success', 'farmers' => $farmers]);
    }
}
