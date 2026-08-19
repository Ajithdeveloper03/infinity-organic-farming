<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FarmerVisit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VisitController extends Controller
{
    public function index()
    {
        $visits = FarmerVisit::with(['employee', 'farmer'])->orderBy('created_at', 'desc')->get()->map(function($v) {
            return [
                'id' => $v->id,
                'farmer' => ['user' => ['name' => optional($v->farmer)->name ?? 'Unknown Farmer']],
                'employee' => ['name' => optional($v->employee)->name ?? 'Unknown Employee'],
                'distance_from_previous_farmer_km' => $v->distance_from_previous_farmer_km ?? 0,
                'check_in_time' => $v->check_in_time ? \Carbon\Carbon::parse($v->check_in_time)->format('h:i A') : 'N/A',
                'check_out_time' => $v->check_out_time ? \Carbon\Carbon::parse($v->check_out_time)->format('h:i A') : 'N/A',
                'date' => $v->created_at->format('M d, Y'),
                'farm_condition_notes' => $v->farm_condition_notes ?? 'No notes provided.',
                'recommendations' => $v->recommendations ?? 'No recommendations.',
                'media' => [] // Could fetch from media relation if it exists
            ];
        });
        return Inertia::render('Admin/Visits', [
            'visits' => $visits
        ]);
    }
}
