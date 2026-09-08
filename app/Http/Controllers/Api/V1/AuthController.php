<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class AuthController extends Controller
{
    /**
     * Clean and normalize Indian phone numbers to 10 digits
     */
    private function normalizePhone(?string $phone): string
    {
        if (!$phone) {
            return '';
        }
        // Strip everything except digits
        $digits = preg_replace('/\D/', '', $phone);
        // If 12 digits starting with 91, extract last 10
        if (strlen($digits) === 12 && str_starts_with($digits, '91')) {
            return substr($digits, 2);
        }
        // If 11 digits starting with 0, extract last 10
        if (strlen($digits) === 11 && str_starts_with($digits, '0')) {
            return substr($digits, 1);
        }
        return $digits;
    }

    /**
     * Send OTP to a registered employee/farmer phone number.
     * POST /api/v1/auth/send-otp
     */
    public function sendOtp(Request $request)
    {
        $request->validate([
            'phone' => 'required|string',
        ]);

        $phone = $this->normalizePhone($request->phone);

        // Check user exists
        $user = User::where('phone', $phone)
            ->whereIn('role', ['employee', 'farmer'])
            ->first();

        if (!$user) {
            return response()->json(['message' => "Phone number ($phone) is not registered."], 404);
        }

        // Generate 6-digit OTP
        $otp = '123456'; // Default demo OTP for seamless testing without SMS gateway costs

        // Invalidate old OTPs
        DB::table('otp_verifications')
            ->where('phone', $phone)
            ->where('is_used', false)
            ->update(['is_used' => true]);

        // Save new OTP (expires in 15 minutes)
        DB::table('otp_verifications')->insert([
            'phone'      => $phone,
            'otp'        => $otp,
            'expires_at' => Carbon::now()->addMinutes(15),
            'is_used'    => false,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json([
            'status'  => 'success',
            'message' => 'OTP sent successfully. Demo OTP is 123456.',
            'otp_dev' => $otp,
        ]);
    }

    /**
     * Verify credentials (Password OR OTP) and issue Sanctum token.
     * POST /api/v1/auth/login
     */
    public function login(Request $request)
    {
        $request->validate([
            'phone'    => 'required|string',
            'password' => 'nullable|string',
            'otp'      => 'nullable|string',
        ]);

        $phone = $this->normalizePhone($request->phone);

        // Find user by normalized phone or exact phone
        $user = User::with(['employeeDetail', 'farmerProfile'])
            ->where('phone', $phone)
            ->first();

        if (!$user) {
            return response()->json(['message' => 'User not found with this mobile number.'], 404);
        }

        // Check if disabled
        if ($user->status === 'disabled') {
            return response()->json(['message' => 'Your account has been deactivated.'], 403);
        }

        $authenticated = false;

        // Option 1: Authenticate with password
        if ($request->filled('password')) {
            $password = $request->password;
            if (Hash::check($password, $user->password) || $password === '123456' || $password === 'Employee@1234') {
                $authenticated = true;
            } else {
                return response()->json(['message' => 'Invalid password. Default is Employee@1234 or 123456.'], 401);
            }
        }
        // Option 2: Authenticate with OTP
        elseif ($request->filled('otp')) {
            $otp = $request->otp;
            if ($otp === '123456') {
                $authenticated = true;
            } else {
                $record = DB::table('otp_verifications')
                    ->where('phone', $phone)
                    ->where('otp', $otp)
                    ->where('is_used', false)
                    ->where('expires_at', '>', Carbon::now())
                    ->orderBy('created_at', 'desc')
                    ->first();

                if ($record) {
                    DB::table('otp_verifications')->where('id', $record->id)->update(['is_used' => true]);
                    $authenticated = true;
                } else {
                    return response()->json(['message' => 'Invalid or expired OTP. Use 123456 for demo.'], 401);
                }
            }
        } else {
            return response()->json(['message' => 'Password or OTP is required.'], 422);
        }

        if (!$authenticated) {
            return response()->json(['message' => 'Authentication failed.'], 401);
        }

        // Revoke old tokens, issue fresh token
        $user->tokens()->delete();
        $token = $user->createToken('mobile-app')->plainTextToken;

        $designation = $user->employeeDetail?->designation ?? null;
        $employeeCode = $user->employeeDetail?->employee_code ?? null;
        $region = $user->employeeDetail?->assigned_region ?? null;

        return response()->json([
            'status' => 'success',
            'token'  => $token,
            'user'   => [
                'id'            => $user->id,
                'name'          => $user->name,
                'role'          => $user->role,
                'phone'         => $user->phone,
                'email'         => $user->email,
                'status'        => $user->status,
                'designation'   => $designation,
                'employee_code' => $employeeCode,
                'region'        => $region,
            ],
        ]);
    }

    /**
     * Get current authenticated user.
     * GET /api/v1/auth/me
     */
    public function me(Request $request)
    {
        $user = $request->user()->load(['employeeDetail', 'farmerProfile']);

        return response()->json([
            'status' => 'success',
            'user'   => [
                'id'            => $user->id,
                'name'          => $user->name,
                'role'          => $user->role,
                'phone'         => $user->phone,
                'email'         => $user->email,
                'designation'   => $user->employeeDetail?->designation ?? null,
                'employee_code' => $user->employeeDetail?->employee_code ?? null,
                'region'        => $user->employeeDetail?->assigned_region ?? null,
            ],
        ]);
    }
}
