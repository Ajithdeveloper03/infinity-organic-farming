<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FarmerController extends Controller
{
    public function pending()
    {
        $farmers = [];
        return Inertia::render('Admin/PendingFarmers', [
            'farmers' => $farmers
        ]);
    }
}
