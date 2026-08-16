<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Mocked or query to location_logs
        $locationLogs = [];
        return Inertia::render('Admin/Dashboard', [
            'locationLogs' => $locationLogs
        ]);
    }
}
