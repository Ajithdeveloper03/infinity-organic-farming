<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AuthController extends Controller
{
    /**
     * Send OTP to a registered employee/farmer phone number.
     * POST /api/v1/auth/send-otp
     */
    public function sendOtp(Request $request)
    {
        $request->validate([
            'phone' => 'required|string',
        ]);

        $phone = $request->phone;

        // Check user exists
        $user = User::where('phone', $phone)
            ->whereIn('role', ['employee', 'farmer'])
            ->where('status', 'active')
            ->first();

        if (!$user) {
            return response()->json(['message' => 'Phone number not registered or account inactive.'], 404);
        }

        // Generate 6-digit OTP
        $otp = str_pad(random_int(100000, 999999), 6, '0', STR_PAD_LEFT);

        // Invalidate old OTPs
        DB::table('otp_verifications')
            ->where('phone', $phone)
            ->where('is_used', false)
            ->update(['is_used' => true]);

        // Save new OTP (expires in 5 minutes)
        DB::table('otp_verifications')->insert([
            'phone'      => $phone,
            'otp'        => $otp,
            'expires_at' => Carbon::now()->addMinutes(5),
            'is_used'    => false,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // In production: send via SMS gateway
        // For now, return OTP in response (dev mode)
        return response()->json([
            'status'  => 'success',
            'message' => 'OTP sent successfully.',
            'otp_dev' => config('app.debug') ? $otp : null, // Only expose in debug mode
        ]);
    }

    /**
     * Verify OTP and issue Sanctum token.
     * POST /api/v1/auth/login
     */
    public function login(Request $request)
    {
        $request->validate([
            'phone' => 'required|string',
            'otp'   => 'required|string|size:6',
        ]);

        $phone = $request->phone;
        $otp   = $request->otp;

        // Find valid OTP
        $record = DB::table('otp_verifications')
            ->where('phone', $phone)
            ->where('otp', $otp)
            ->where('is_used', false)
            ->where('expires_at', '>', Carbon::now())
            ->orderBy('created_at', 'desc')
            ->first();

        if (!$record) {
            return response()->json(['message' => 'Invalid or expired OTP.'], 401);
        }

        // Mark OTP as used
        DB::table('otp_verifications')
            ->where('id', $record->id)
            ->update(['is_used' => true]);

        // Find user
        $user = User::where('phone', $phone)
            ->whereIn('role', ['employee', 'farmer'])
            ->where('status', 'active')
            ->first();

        if (!$user) {
            return response()->json(['message' => 'User not found.'], 404);
        }

        // Revoke old tokens, issue new
        $user->tokens()->delete();
        $token = $user->createToken('mobile-app')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'token'  => $token,
            'user'   => [
                'id'   => $user->id,
                'name' => $user->name,
                'role' => $user->role,
                'phone'=> $user->phone,
            ],
        ]);
    }
}
