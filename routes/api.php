<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\EmployeeController;
use App\Http\Controllers\Api\V1\FarmerController;
use App\Http\Controllers\Api\V1\TranslationController;
use App\Http\Controllers\Api\V1\TrackingController;
use App\Http\Controllers\Api\V1\OrderController;
use App\Http\Controllers\Api\V1\ProductController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::prefix('v1')->group(function () {
    // ── Public: Auth ─────────────────────────────────────────────────────────
    Route::post('/auth/send-otp', [AuthController::class, 'sendOtp']);
    Route::post('/auth/login', [AuthController::class, 'login']);
    
    // Translation Route for Mobile App
    Route::get('/translations', [TranslationController::class, 'index']);

    // ── Protected: Sanctum token required ────────────────────────────────────
    Route::middleware('auth:sanctum')->group(function () {

        // Current user info
        Route::get('/user', fn(Request $request) => $request->user());

        // Employee endpoints
        Route::prefix('employee')->group(function () {
            Route::get('/dashboard', [EmployeeController::class, 'dashboard']);
            Route::get('/farmers', [EmployeeController::class, 'myFarmers']);
            Route::get('/visits', [EmployeeController::class, 'visits']);
            Route::post('/attendance', [EmployeeController::class, 'attendance']);
            Route::post('/location-ping', [EmployeeController::class, 'locationPing']);
            Route::post('/farmer/register', [EmployeeController::class, 'registerFarmer']);
            Route::post('/visit/submit', [EmployeeController::class, 'submitVisit']);
            Route::post('/visit/{id}/checkout', [EmployeeController::class, 'checkoutVisit']);

            // Tracking endpoints (Moved below, out of Sanctum for testing)
        });

        // Farmer endpoints
        Route::prefix('farmer')->group(function () {
            Route::get('/dashboard', [FarmerController::class, 'dashboard']);
            Route::get('/visits', [FarmerController::class, 'visits']);
            Route::post('/visit/{id}/rate', [FarmerController::class, 'rateVisit']);
            Route::get('/orders', [OrderController::class, 'index']);
            Route::get('/products', [ProductController::class, 'index']);
        });
    });

    // Tracking & field registration endpoints (accessible with or without token for testing/demo)
    Route::post('/employee/farmer/register', [EmployeeController::class, 'registerFarmer']);
    Route::prefix('employee/tracking')->group(function () {
        Route::post('/session/start', [TrackingController::class, 'startSession']);
        Route::post('/session/stop', [TrackingController::class, 'stopSession']);
        Route::post('/sync', [TrackingController::class, 'sync']);
    });
});