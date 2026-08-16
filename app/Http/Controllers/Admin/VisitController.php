<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VisitController extends Controller
{
    public function index()
    {
        $visits = [];
        return Inertia::render('Admin/Visits', [
            'visits' => $visits
        ]);
    }
}
