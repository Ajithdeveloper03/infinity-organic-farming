<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\FarmerProfile;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FarmerController extends Controller
{
    public function pending()
    {
        $farmers = FarmerProfile::where('approval_status', 'pending')
            ->orWhere('kyc_status', 'pending')
            ->with(['user', 'createdBy:id,name'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(fn($fp) => [
                'id'              => $fp->user?->id,
                'name'            => $fp->user?->name ?? 'Unknown',
                'phone'           => $fp->user?->phone ?? 'N/A',
                'farmer_code'     => $fp->farmer_code,
                'village'         => $fp->village,
                'district'        => $fp->district,
                'land_acres'      => $fp->land_size_acres,
                'kyc_status'      => $fp->kyc_status ?? 'pending',
                'approval_status' => $fp->approval_status ?? 'pending',
                'registered_by'   => $fp->createdBy?->name ?? 'Admin',
                'submitted_on'    => $fp->created_at->format('M d, Y'),
                'farmer_photo'    => $fp->farmer_photo_path ? \Illuminate\Support\Facades\Storage::url($fp->farmer_photo_path) : null,
                'aadhaar_number'  => $fp->aadhaar_number ? '**' . substr($fp->aadhaar_number, -4) : 'Not provided',
            ]);

        return Inertia::render('Admin/PendingFarmers', [
            'farmers' => $farmers,
        ]);
    }

    public function showPending($id)
    {
        $farmer = User::where('id', $id)
            ->where('role', 'farmer')
            ->firstOrFail();

        $profile = FarmerProfile::where('user_id', $id)
            ->with('createdBy:id,name')
            ->firstOrFail();

        return Inertia::render('Admin/Profiles/PendingFarmerDetail', [
            'farmer' => array_merge($farmer->toArray(), $profile->toArray(), [
                'registered_by' => $profile->createdBy?->name ?? 'Admin',
                'farmer_photo_url' => $profile->farmer_photo_path ? \Illuminate\Support\Facades\Storage::url($profile->farmer_photo_path) : null,
            ]),
        ]);
    }

    public function approve(Request $request, $id)
    {
        $user = User::where('id', $id)->where('role', 'farmer')->firstOrFail();
        $user->update(['status' => 'active']);

        $fp = FarmerProfile::where('user_id', $id)->firstOrFail();
        $fp->update([
            'approval_status' => 'approved',
            'kyc_status'      => 'verified',
        ]);

        return redirect('/admin/pending-farmers')->with('success', "Farmer {$user->name} approved.");
    }

    public function reject(Request $request, $id)
    {
        $request->validate(['reason' => 'nullable|string|max:500']);

        $user = User::where('id', $id)->where('role', 'farmer')->firstOrFail();
        $user->update(['status' => 'disabled']);

        $fp = FarmerProfile::where('user_id', $id)->firstOrFail();
        $fp->update([
            'approval_status' => 'rejected',
            'kyc_status'      => 'rejected',
        ]);

        return redirect('/admin/pending-farmers')->with('success', "Farmer {$user->name} rejected.");
    }
}
