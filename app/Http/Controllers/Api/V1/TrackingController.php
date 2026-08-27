<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TrackingSession;
use App\Models\LocationPoint;

class TrackingController extends Controller
{
    public function startSession(Request $request)
    {
        $validated = $request->validate([
            'session_id' => 'required|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
        ]);

        // Get employee ID (use first user for testing if unauthenticated)
        $employeeId = $request->user() ? $request->user()->id : \App\Models\User::first()->id;

        $session = TrackingSession::create([
            'session_id' => $validated['session_id'],
            'employee_id' => $employeeId,
            'start_time' => now(),
            'start_latitude' => $validated['latitude'] ?? null,
            'start_longitude' => $validated['longitude'] ?? null,
            'status' => 'active',
        ]);

        return response()->json([
            'status' => 'success',
            'session' => $session
        ]);
    }

    public function stopSession(Request $request)
    {
        $validated = $request->validate([
            'session_id' => 'required|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
        ]);

        $employeeId = $request->user() ? $request->user()->id : \App\Models\User::first()->id;

        $session = TrackingSession::where('session_id', $validated['session_id'])
            ->where('employee_id', $employeeId)
            ->firstOrFail();

        $session->update([
            'end_time' => now(),
            'end_latitude' => $validated['latitude'] ?? null,
            'end_longitude' => $validated['longitude'] ?? null,
            'status' => 'completed',
        ]);

        return response()->json([
            'status' => 'success',
            'session' => $session
        ]);
    }

    public function sync(Request $request)
    {
        $validated = $request->validate([
            'points' => 'required|array',
            'points.*.session_id' => 'required|string',
            'points.*.latitude' => 'required|numeric',
            'points.*.longitude' => 'required|numeric',
            'points.*.accuracy' => 'nullable|numeric',
            'points.*.speed' => 'nullable|numeric',
            'points.*.heading' => 'nullable|numeric',
            'points.*.timestamp' => 'required|numeric',
        ]);

        $pointsToInsert = [];
        $employeeId = $request->user() ? $request->user()->id : \App\Models\User::first()->id;

        // Group points by session_id to minimize queries
        $sessionIds = collect($validated['points'])->pluck('session_id')->unique();
        $sessions = TrackingSession::whereIn('session_id', $sessionIds)
            ->where('employee_id', $employeeId)
            ->get()
            ->keyBy('session_id');

        foreach ($validated['points'] as $point) {
            if ($sessions->has($point['session_id'])) {
                $pointsToInsert[] = [
                    'tracking_session_id' => $sessions[$point['session_id']]->id,
                    'employee_id' => $employeeId,
                    'latitude' => $point['latitude'],
                    'longitude' => $point['longitude'],
                    'accuracy' => $point['accuracy'] ?? null,
                    'speed' => $point['speed'] ?? null,
                    'heading' => $point['heading'] ?? null,
                    'timestamp' => $point['timestamp'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        if (count($pointsToInsert) > 0) {
            LocationPoint::insert($pointsToInsert);
        }

        return response()->json([
            'status' => 'success',
            'synced_count' => count($pointsToInsert)
        ]);
    }
}
