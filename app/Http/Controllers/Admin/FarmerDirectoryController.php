<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class FarmerDirectoryController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Profiles/FarmerList');
    }

    public function show($id)
    {
        return Inertia::render('Admin/Profiles/FarmerDetail', [
            'id' => $id
        ]);
    }
}
