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

    public function create()
    {
        return Inertia::render('Admin/Profiles/EmployeeRegistrationForm');
    }

    public function store(\Illuminate\Http\Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|unique:users,phone|max:20',
            'emergency_phone' => 'nullable|string|max:20',
            'assigned_region' => 'nullable|string|max:255',
        ]);

        $password = \Illuminate\Support\Str::random(12);

        // Generate dummy email as it is required in the DB
        $email = $validated['phone'] . '@infinityorganics.com';

        $user = \App\Models\User::create([
            'name' => $validated['name'],
            'phone' => $validated['phone'],
            'email' => $email,
            'password' => \Illuminate\Support\Facades\Hash::make($password),
            'role' => 'employee',
            'status' => 'active',
        ]);

        \App\Models\EmployeeDetail::create([
            'user_id' => $user->id,
            'employee_code' => 'EMP-' . str_pad($user->id, 3, '0', STR_PAD_LEFT),
            'emergency_phone' => $validated['emergency_phone'] ?? null,
            'assigned_region' => $validated['assigned_region'] ?? null,
        ]);

        return redirect('/admin/employees')->with('success', 'Employee created successfully.')->with('generated_password', $password);
    }
}
