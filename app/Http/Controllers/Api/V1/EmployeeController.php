<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Jobs\TriggerEmergencyVoip;

class EmployeeController extends Controller
{
    public function attendance(Request $request) {
        return response()->json(['status' => 'success']);
    }
    
    public function locationPing(Request $request)
    {
        $validated = $request->validate([
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'is_gps_enabled' => 'required|boolean',
            'battery_level' => 'required|integer',
        ]);

        $request->user()->locationLogs()->create([
            'latitude' => $validated['latitude'],
            'longitude' => $validated['longitude'],
            'is_gps_enabled' => $validated['is_gps_enabled'],
            'battery_level' => $validated['battery_level'],
            'recorded_at' => now(),
        ]);

        if (!$validated['is_gps_enabled'] || $validated['battery_level'] < 15) {
            // Dispatch Critical Alert Job
            TriggerEmergencyVoip::dispatch($request->user());
            return response()->json(['status' => 'critical_alert_triggered'], 400);
        }

        // Placeholder for Geofence calculation logic (Haversine formula to be implemented)
        $distanceFromTarget = 50; // Mock 50 meters
        if ($distanceFromTarget > 100) {
            return response()->json(['status' => 'high_alert_geofence_deviation'], 400);
        }

        return response()->json(['status' => 'success']);
    }

    public function registerFarmer(Request $request) {
        return response()->json(['status' => 'success']);
    }

    public function submitVisit(Request $request) {
        return response()->json(['status' => 'success']);
    }
}
