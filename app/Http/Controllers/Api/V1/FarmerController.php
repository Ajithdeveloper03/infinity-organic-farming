<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\FarmerVisit;
use App\Models\FarmerProfile;
use App\Models\FarmerReview;
use Carbon\Carbon;

class FarmerController extends Controller
{
    /**
     * Get farmer dashboard details.
     * GET /api/v1/farmer/dashboard
     */
    public function dashboard(Request $request)
    {
        $user = $request->user();
        $profile = FarmerProfile::where('user_id', $user->id)->first();

        $recentVisits = FarmerVisit::where('farmer_id', $user->id)
            ->with('employee')
            ->orderBy('id', 'desc')
            ->take(5)
            ->get()
            ->map(fn($v) => [
                'id'              => (string) $v->id,
                'officer_name'    => $v->employee?->name ?? 'Field Officer',
                'date'            => $v->check_in_time ? Carbon::parse($v->check_in_time)->format('M d, Y') : null,
                'recommendations' => $v->recommendations ?? 'Maintain watering schedule.',
                'status'          => $v->check_out_time ? 'completed' : 'scheduled',
            ]);

        return response()->json([
            'status' => 'success',
            'data'   => [
                'farmer' => [
                    'id'          => $user->id,
                    'name'        => $user->name,
                    'phone'       => $user->phone,
                    'farmer_code' => $profile?->farmer_code ?? 'FAR-' . str_pad($user->id, 3, '0', STR_PAD_LEFT),
                    'land_acres'  => $profile?->land_size_acres ?? 2.5,
                    'village'     => $profile?->village ?? 'Tamil Nadu',
                    'district'    => $profile?->district ?? 'Coimbatore',
                    'crop_stage'  => $profile?->vetiver_crop_stage ?? 'vegetative',
                    'soil_type'   => $profile?->soil_type ?? 'Red Loam',
                ],
                'recent_visits' => $recentVisits,
                'weather'       => [
                    'temperature' => '29°C',
                    'condition'   => 'Partly Cloudy',
                    'humidity'    => '65%',
                ],
            ],
        ]);
    }

    /**
     * List all visits for the logged-in farmer.
     * GET /api/v1/farmer/visits
     */
    public function visits(Request $request)
    {
        $visits = FarmerVisit::where('farmer_id', $request->user()->id)
            ->with('employee')
            ->orderBy('id', 'desc')
            ->get()
            ->map(fn($v) => [
                'id'              => (string) $v->id,
                'officer_name'    => $v->employee?->name ?? 'Field Officer',
                'officer_phone'   => $v->employee?->phone ?? '',
                'date'            => $v->check_in_time ? Carbon::parse($v->check_in_time)->format('M d, Y') : null,
                'time'            => $v->check_in_time ? Carbon::parse($v->check_in_time)->format('h:i A') : '10:00 AM',
                'recommendations' => $v->recommendations,
                'notes'           => $v->farm_condition_notes,
                'status'          => $v->check_out_time ? 'completed' : 'scheduled',
            ]);

        return response()->json(['status' => 'success', 'visits' => $visits]);
    }

    /**
     * Rate a visit.
     * POST /api/v1/farmer/visit/{id}/rate
     */
    public function rateVisit(Request $request, $id)
    {
        $validated = $request->validate([
            'rating'  => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string',
        ]);

        $visit = FarmerVisit::where('id', $id)
            ->where('farmer_id', $request->user()->id)
            ->firstOrFail();

        FarmerReview::create([
            'visit_id'  => $visit->id,
            'farmer_id' => $request->user()->id,
            'rating'    => $validated['rating'],
            'comment'   => $validated['comment'] ?? null,
        ]);

        return response()->json(['status' => 'success', 'message' => 'Review submitted successfully.']);
    }
}
