<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;

class TranslationController extends Controller
{
    public function index()
    {
        return response()->json([
            'en' => [
                'Dashboard' => 'Dashboard',
                'Farmers' => 'Farmers',
                'Monitor' => 'Monitor',
                'Tasks' => 'Tasks',
                'Main Menu' => 'Main Menu',
                'Live Monitor' => 'Live Monitor',
                'Analytics & Visits' => 'Analytics & Visits',
            ],
            'ta' => [
                'Dashboard' => 'கட்டுப்பாட்டு அறை',
                'Farmers' => 'விவசாயிகள்',
                'Monitor' => 'கண்காணிப்பு',
                'Tasks' => 'பணிகள்',
                'Main Menu' => 'முதன்மை மெனு',
                'Live Monitor' => 'நேரடி கண்காணிப்பு',
                'Analytics & Visits' => 'பகுப்பாய்வு மற்றும் பார்வைகள்',
            ]
        ]);
    }
}
