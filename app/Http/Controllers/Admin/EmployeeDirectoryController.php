<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class EmployeeDirectoryController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Profiles/EmployeeList');
    }

    public function show($id)
    {
        return Inertia::render('Admin/Profiles/EmployeeDetail', [
            'id' => $id
        ]);
    }
}
