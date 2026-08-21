<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\FarmerController;
use App\Http\Controllers\Admin\VisitController;
use App\Http\Controllers\Admin\PerformanceController;
use App\Http\Controllers\Admin\SettingsController;
use App\Http\Controllers\Admin\EmployeeDirectoryController;
use App\Http\Controllers\Admin\FarmerDirectoryController;
use App\Http\Controllers\Admin\PaymentsController;
use App\Http\Controllers\Admin\TasksController;
use App\Http\Controllers\Admin\LiveMonitorController;
use App\Http\Controllers\Auth\LoginController;

Route::get('/', function () {
    return redirect('/admin/login');
});

Route::prefix('admin')->group(function () {
    Route::get('/', function () {
        return redirect('/admin/login');
    });

    // Auth
    Route::get('/login', [LoginController::class, 'index'])->name('login');
    Route::post('/login', [LoginController::class, 'store']);

    // Core
    Route::get('/dashboard', [DashboardController::class, 'index']);

    // Employee Management
    Route::get('/employees', [EmployeeDirectoryController::class, 'index']);
    Route::get('/employees/create', [EmployeeDirectoryController::class, 'create'])->name('employees.create');
    Route::post('/employees', [EmployeeDirectoryController::class, 'store'])->name('employees.store');
    Route::get('/employees/{id}', [EmployeeDirectoryController::class, 'show']);

    // Farmer Management
    Route::get('/farmers', [FarmerDirectoryController::class, 'index']);
    Route::get('/farmers/register', function() {
        return inertia('Admin/Profiles/FarmerRegistrationForm');
    })->name('farmers.register');
    Route::get('/farmers/{id}', [FarmerDirectoryController::class, 'show']);

    // Pending Approvals
    Route::get('/pending-farmers', [FarmerController::class, 'pending']);

    // Analytics & Visits
    Route::get('/visits', [VisitController::class, 'index']);

    // Performance Logs
    Route::get('/performance', [PerformanceController::class, 'index']);

    // Settings
    Route::get('/settings', [SettingsController::class, 'index']);

    // Payments & Financials
    Route::get('/payments', [PaymentsController::class, 'index']);

    // Tasks & Schedule Management
    Route::get('/tasks', [TasksController::class, 'index']);

    // Live Employee Monitor
    Route::get('/monitor', [LiveMonitorController::class, 'index']);
});

