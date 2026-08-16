<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\EmployeeController;
use App\Http\Controllers\Api\V1\FarmerController;
Route::prefix('v1')->group(function () {
    Route::post('/auth/send-otp', [AuthController::class, 'sendOtp']);
    Route::post('/auth/login', [AuthController::class, 'login']);
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/user', function (Request $request) {
            return $request->user();
        });
        Route::prefix('employee')->group(function () {
            Route::post('/attendance', [EmployeeController::class, 'attendance']);
            Route::post('/location-ping', [EmployeeController::class, 'locationPing']);
            Route::post('/farmer/register', [EmployeeController::class, 'registerFarmer']);
            Route::post('/visit/submit', [EmployeeController::class, 'submitVisit']);
        });
        Route::prefix('farmer')->group(function () {
            Route::get('/visits', [FarmerController::class, 'visits']);
            Route::post('/visit/{id}/rate', [FarmerController::class, 'rateVisit']);
        });
    });
});