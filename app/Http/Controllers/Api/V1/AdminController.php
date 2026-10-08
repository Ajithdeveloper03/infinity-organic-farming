<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\FarmerProfile;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * Get list of pending farmer registrations.
     * GET /api/v1/admin/farmers/pending
     */
    public function pending()
    {
        $pendingFarmers = User::where('role', 'farmer')
            ->where('status', 'pending_approval')
            ->with('farmerProfile')
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'phone' => $user->phone,
                    'district' => $user->farmerProfile?->district,
                    'village' => $user->farmerProfile?->village,
                    'created_at' => $user->created_at,
                ];
            });

        return response()->json([
            'status' => 'success',
            'data' => $pendingFarmers,
        ]);
    }

    /**
     * Approve a farmer registration and generate their unique farmer_code.
     * POST /api/v1/admin/farmers/{id}/approve
     */
    public function approveFarmer(Request $request, $id)
    {
        $user = User::where('role', 'farmer')->findOrFail($id);
        $profile = FarmerProfile::where('user_id', $user->id)->firstOrFail();

        if ($profile->approval_status === 'approved' && $profile->farmer_code) {
            return response()->json([
                'status' => 'error',
                'message' => 'Farmer is already approved.',
                'farmer_code' => $profile->farmer_code,
            ], 400);
        }

        // Generate farmer_code
        $district = $profile->district ?? 'CBE';
        $prefix = strtoupper(substr(preg_replace('/[^a-zA-Z]/', '', $district), 0, 3));
        if (strlen($prefix) < 3) {
            $prefix = str_pad($prefix, 3, 'X');
        }
        $code = $prefix.'-FMR-'.str_pad($user->id, 3, '0', STR_PAD_LEFT);

        $user->update(['status' => 'active']);
        $profile->update([
            'approval_status' => 'approved',
            'farmer_code' => $code,
            'kyc_status' => 'verified', // Assuming approval also verifies KYC
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Farmer approved successfully.',
            'farmer_code' => $code,
        ]);
    }
}
