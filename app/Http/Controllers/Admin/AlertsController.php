<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
class AlertsController extends Controller
{
    public function index()
    { 
        $alerts = [
            [
                'id' => 1,
                'type' => 'critical',
                'title' => 'GPS Disabled',
                'message' => 'Officer John Doe disabled GPS in Sector 4.',
                'timestamp' => now()->subMinutes(15)->toDateTimeString(),
                'resolved' => false,
            ],
            [
                'id' => 2,
                'type' => 'high',
                'title' => 'Stationary Alert',
                'message' => 'Officer Smith has been stationary for 45 minutes.',
                'timestamp' => now()->subMinutes(45)->toDateTimeString(),
                'resolved' => false,
            ],
            [
                'id' => 3,
                'type' => 'info',
                'title' => 'System Boot',
                'message' => 'System booted successfully.',
                'timestamp' => now()->subHours(2)->toDateTimeString(),
                'resolved' => true,
            ]
        ];

        return Inertia::render('Admin/Alerts', [
            'alerts' => $alerts,
        ]);
    }
}