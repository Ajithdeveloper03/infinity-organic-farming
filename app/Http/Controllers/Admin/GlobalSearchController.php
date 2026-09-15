<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\FarmerProfile;

class GlobalSearchController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->input('q', '');
        
        if (strlen($query) < 2) {
            return response()->json([]);
        }

        $results = [];

        // Search Employees
        $employees = User::where('role', 'employee')
            ->where(function($q) use ($query) {
                $q->where('name', 'like', "%{$query}%")
                  ->orWhere('phone', 'like', "%{$query}%");
            })
            ->take(5)
            ->get();

        foreach ($employees as $employee) {
            $results[] = [
                'id' => $employee->id,
                'name' => $employee->name,
                'type' => 'Employee',
                'url' => "/admin/employees/{$employee->id}"
            ];
        }

        // Search Farmers
        $farmers = FarmerProfile::whereHas('user', function($q) use ($query) {
                $q->where('name', 'like', "%{$query}%")
                  ->orWhere('phone', 'like', "%{$query}%");
            })
            ->orWhere('farmer_code', 'like', "%{$query}%")
            ->with('user')
            ->take(5)
            ->get();

        foreach ($farmers as $farmer) {
            $results[] = [
                'id' => $farmer->user_id ?? $farmer->id,
                'name' => $farmer->user->name ?? 'Unknown Farmer',
                'type' => 'Farmer',
                'url' => "/admin/farmers/{$farmer->user_id ?? $farmer->id}"
            ];
        }

        return response()->json($results);
    }
}
