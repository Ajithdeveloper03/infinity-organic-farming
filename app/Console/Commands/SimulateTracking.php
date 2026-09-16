<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Events\LocationUpdated;
use App\Models\User;

class SimulateTracking extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:simulate-tracking {--employee= : The ID of the employee to simulate}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Simulate live mobile tracking events for the admin dashboard';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $employeeId = $this->option('employee');
        
        if (!$employeeId) {
            $employee = User::where('role', 'employee')->first();
            if (!$employee) {
                $this->error('No employee found in the database. Please create one.');
                return;
            }
            $employeeId = $employee->id;
        } else {
            $employee = User::find($employeeId);
            if (!$employee) {
                $this->error("Employee with ID {$employeeId} not found.");
                return;
            }
        }

        $this->info("Simulating tracking for employee: {$employee->name} (ID: {$employee->id})");
        $this->info("Press Ctrl+C to stop.");

        // Start coordinates (e.g., Coimbatore)
        $lat = 11.0168;
        $lng = 76.9558;
        $battery = 95;

        // Simulate movement loop
        while (true) {
            // Move slightly
            $lat += mt_rand(-50, 50) / 100000;
            $lng += mt_rand(-50, 50) / 100000;
            
            // Decrease battery slowly
            if (mt_rand(1, 10) === 1) {
                $battery = max(1, $battery - 1);
            }

            $this->info("Emitting LocationUpdated: Lat: {$lat}, Lng: {$lng}, Battery: {$battery}%");

            broadcast(new LocationUpdated(
                $employeeId,
                $lat,
                $lng,
                true, // isGpsEnabled
                $battery
            ));

            // Wait 3 seconds before next update
            sleep(3);
        }
    }
}
