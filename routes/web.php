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

// Root redirect
Route::get('/', fn() => redirect('/admin/login'));

Route::prefix('admin')->group(function () {
    // ── Public: Auth ─────────────────────────────────────────────────────────
    Route::get('/login', [LoginController::class, 'index'])->name('login');
    Route::post('/login', [LoginController::class, 'store'])->name('login.store');
    Route::post('/logout', [LoginController::class, 'destroy'])->name('logout');

    // ── Protected: All admin routes require auth + admin role ─────────────────
    Route::middleware(['auth', 'admin'])->group(function () {

        // Dashboard
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');
        Route::get('/', fn() => redirect('/admin/dashboard'));

        // Employee Management
        Route::get('/employees', [EmployeeDirectoryController::class, 'index'])->name('employees.index');
        Route::get('/employees/create', [EmployeeDirectoryController::class, 'create'])->name('employees.create');
        Route::post('/employees', [EmployeeDirectoryController::class, 'store'])->name('employees.store');
        Route::get('/employees/{id}', [EmployeeDirectoryController::class, 'show'])->name('employees.show');
        Route::get('/employees/{id}/edit', [EmployeeDirectoryController::class, 'edit'])->name('employees.edit');
        Route::put('/employees/{id}', [EmployeeDirectoryController::class, 'update'])->name('employees.update');

        // Farmer Management
        Route::get('/farmers', [FarmerDirectoryController::class, 'index'])->name('farmers.index');
        Route::get('/farmers/register', fn() => inertia('Admin/Profiles/FarmerRegistrationForm'))->name('farmers.register');
        Route::post('/farmers', [FarmerDirectoryController::class, 'store'])->name('farmers.store');
        Route::get('/farmers/{id}', [FarmerDirectoryController::class, 'show'])->name('farmers.show');

        // Pending Farmer Approvals
        Route::get('/pending-farmers', [FarmerController::class, 'pending'])->name('farmers.pending');
        Route::post('/pending-farmers/{id}/approve', [FarmerController::class, 'approve'])->name('farmers.approve');
        Route::post('/pending-farmers/{id}/reject', [FarmerController::class, 'reject'])->name('farmers.reject');

        // Visit Audits
        Route::get('/visits', [VisitController::class, 'index'])->name('visits.index');

        // Performance Analytics
        Route::get('/performance', [PerformanceController::class, 'index'])->name('performance.index');

        // Settings
        Route::get('/settings', [SettingsController::class, 'index'])->name('settings.index');
        Route::put('/settings/profile', [SettingsController::class, 'updateProfile'])->name('settings.profile');
        Route::put('/settings/password', [SettingsController::class, 'updatePassword'])->name('settings.password');

        // Payments & Financials
        Route::get('/payments', [PaymentsController::class, 'index'])->name('payments.index');
        Route::post('/payments', [PaymentsController::class, 'store'])->name('payments.store');
        Route::post('/payments/{id}/mark-paid', [PaymentsController::class, 'markPaid'])->name('payments.markPaid');

        // Task Management
        Route::get('/tasks', [TasksController::class, 'index'])->name('tasks.index');
        Route::post('/tasks', [TasksController::class, 'store'])->name('tasks.store');
        Route::put('/tasks/{id}', [TasksController::class, 'update'])->name('tasks.update');
        Route::delete('/tasks/{id}', [TasksController::class, 'destroy'])->name('tasks.destroy');

        // Live Monitor (page + JSON polling endpoint)
        Route::get('/monitor', [LiveMonitorController::class, 'index'])->name('monitor.index');
        Route::get('/monitor/live', [LiveMonitorController::class, 'liveData'])->name('monitor.live');
    });
});
