<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\EmployeeDetail;
use App\Models\FarmerProfile;
use App\Models\FarmerVisit;
use App\Models\AttendanceLog;
use App\Models\LocationLog;
use App\Models\Task;
use App\Models\Payment;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        // ─── 1. Admin User ───────────────────────────────────────────────────────
        $admin = User::firstOrCreate(
            ['email' => 'admin@infinityorganics.com'],
            [
                'name'     => 'Admin',
                'phone'    => '9000000000',
                'password' => Hash::make('Admin@1234'),
                'role'     => 'admin',
                'status'   => 'active',
            ]
        );

        // ─── 2. Employees ─────────────────────────────────────────────────────────
        $employeeData = [
            ['name' => 'Rajesh Kumar',  'phone' => '9111111111', 'email' => 'rajesh@infinityorganics.com',  'region' => 'Coimbatore South'],
            ['name' => 'Priya Nair',    'phone' => '9222222222', 'email' => 'priya@infinityorganics.com',   'region' => 'Pollachi'],
            ['name' => 'Suresh Menon',  'phone' => '9333333333', 'email' => 'suresh@infinityorganics.com',  'region' => 'Tirupur'],
        ];

        $employees = [];
        foreach ($employeeData as $i => $data) {
            $emp = User::firstOrCreate(
                ['email' => $data['email']],
                [
                    'name'     => $data['name'],
                    'phone'    => $data['phone'],
                    'password' => Hash::make('Employee@1234'),
                    'role'     => 'employee',
                    'status'   => 'active',
                ]
            );

            EmployeeDetail::firstOrCreate(
                ['user_id' => $emp->id],
                [
                    'employee_code'  => 'EMP-' . str_pad($emp->id, 3, '0', STR_PAD_LEFT),
                    'emergency_phone' => '9800000000',
                    'assigned_region' => $data['region'],
                ]
            );

            // Today's attendance check-in
            $checkInTime = Carbon::today()->setTime(8 + $i, 30, 0);
            AttendanceLog::firstOrCreate(
                ['employee_id' => $emp->id, 'date' => Carbon::today()->toDateString()],
                [
                    'check_in_timestamp'  => $checkInTime,
                    'check_in_latitude'   => 10.9900 + ($i * 0.05),
                    'check_in_longitude'  => 76.9500 + ($i * 0.05),
                ]
            );

            // Today's location pings (last 5)
            for ($p = 0; $p < 5; $p++) {
                LocationLog::create([
                    'employee_id'    => $emp->id,
                    'latitude'       => 10.9900 + ($i * 0.05) + ($p * 0.002),
                    'longitude'      => 76.9500 + ($i * 0.05) + ($p * 0.002),
                    'battery_level'  => 80 - ($p * 5),
                    'is_gps_enabled' => true,
                    'recorded_at'    => Carbon::now()->subMinutes($p * 8),
                ]);
            }

            $employees[] = $emp;
        }

        // ─── 3. Farmers ───────────────────────────────────────────────────────────
        $farmerData = [
            ['name' => 'Muthusamy',   'phone' => '9411111111', 'village' => 'Annur',     'district' => 'Coimbatore', 'acres' => 4.5, 'status' => 'active',           'kyc' => 'verified'],
            ['name' => 'Kandasamy',   'phone' => '9422222222', 'village' => 'Pollachi',  'district' => 'Coimbatore', 'acres' => 2.0, 'status' => 'active',           'kyc' => 'verified'],
            ['name' => 'Velusamy',    'phone' => '9433333333', 'village' => 'Palladam',  'district' => 'Tirupur',    'acres' => 6.2, 'status' => 'active',           'kyc' => 'verified'],
            ['name' => 'Lakshmi Devi','phone' => '9444444444', 'village' => 'Udumalpet', 'district' => 'Tirupur',    'acres' => 1.5, 'status' => 'pending_approval', 'kyc' => 'pending'],
            ['name' => 'Arumugam',    'phone' => '9455555555', 'village' => 'Mettupalayam','district' => 'Coimbatore','acres' => 3.0,'status' => 'pending_approval', 'kyc' => 'pending'],
        ];

        $farmers = [];
        foreach ($farmerData as $i => $data) {
            $email = $data['phone'] . '@farmer.inymart.com';
            $farmer = User::firstOrCreate(
                ['phone' => $data['phone']],
                [
                    'name'     => $data['name'],
                    'email'    => $email,
                    'password' => Hash::make('Farmer@1234'),
                    'role'     => 'farmer',
                    'status'   => $data['status'],
                ]
            );

            FarmerProfile::firstOrCreate(
                ['user_id' => $farmer->id],
                [
                    'created_by_employee_id' => $employees[$i % count($employees)]->id,
                    'approval_status'        => $data['status'] === 'active' ? 'approved' : 'pending',
                    'farmer_code'            => 'FAR-' . str_pad($farmer->id, 3, '0', STR_PAD_LEFT),
                    'land_size_acres'        => $data['acres'],
                    'land_latitude'          => 11.0168 + ($i * 0.03),
                    'land_longitude'         => 76.9558 + ($i * 0.03),
                    'land_address'           => $data['village'] . ', ' . $data['district'],
                    'vetiver_crop_stage'     => 'growing',
                    'planting_date'          => Carbon::now()->subMonths(3)->toDateString(),
                    'mobile_number'          => $data['phone'],
                    'address'                => $data['village'],
                    'village'                => $data['village'],
                    'district'               => $data['district'],
                    'state'                  => 'Tamil Nadu',
                    'pincode'                => '641' . str_pad($i + 1, 3, '0', STR_PAD_LEFT),
                    'kyc_status'             => $data['kyc'],
                    'total_land_owned'       => $data['acres'] + 0.5,
                    'soil_type'              => 'loamy',
                    'irrigation_type'        => 'drip',
                ]
            );

            $farmers[] = $farmer;
        }

        // ─── 4. Farmer Visits ─────────────────────────────────────────────────────
        $visitNotes = [
            'Vetiver crop showing excellent root propagation. Soil moisture is optimal.',
            'Minor pest activity noticed on south plot. Recommended neem oil spray.',
            'Crop looks healthy. Farmer has maintained watering schedule diligently.',
        ];
        $visitRecs = [
            'Apply organic compost in 2 weeks. Maintain current watering schedule.',
            'Apply neem oil spray every 3 days for 2 weeks.',
            'Continue current practices. Visit next in 14 days.',
        ];

        foreach ($employees as $ei => $emp) {
            foreach (array_slice($farmers, 0, 3) as $fi => $farmer) {
                FarmerVisit::firstOrCreate(
                    ['employee_id' => $emp->id, 'farmer_id' => $farmer->id, 'check_in_time' => Carbon::today()->setTime(10 + $fi, 0, 0)],
                    [
                        'check_in_time'      => Carbon::today()->setTime(10 + $fi, 0, 0),
                        'check_out_time'     => Carbon::today()->setTime(10 + $fi, 45, 0),
                        'check_in_latitude'  => 11.0168 + ($fi * 0.03),
                        'check_in_longitude' => 76.9558 + ($fi * 0.03),
                        'check_out_latitude' => 11.0168 + ($fi * 0.03),
                        'check_out_longitude'=> 76.9558 + ($fi * 0.03),
                        'distance_from_previous_farmer_km' => 5.5 + $fi,
                        'farm_condition_notes' => $visitNotes[$fi % count($visitNotes)],
                        'recommendations'    => $visitRecs[$fi % count($visitRecs)],
                    ]
                );
            }
        }

        // ─── 5. Tasks ─────────────────────────────────────────────────────────────
        $tasksData = [
            ['title' => 'Complete Q3 Farmer Registrations', 'priority' => 'high',   'status' => 'in_progress', 'assigned' => 0, 'due' => 5],
            ['title' => 'Submit Monthly Visit Reports',     'priority' => 'urgent',  'status' => 'pending',     'assigned' => 1, 'due' => 2],
            ['title' => 'GPS Equipment Check',              'priority' => 'medium',  'status' => 'done',        'assigned' => 2, 'due' => -1],
            ['title' => 'Train New Field Officers',         'priority' => 'medium',  'status' => 'pending',     'assigned' => 0, 'due' => 10],
            ['title' => 'Vetiver Quality Audit – Batch 3',  'priority' => 'high',    'status' => 'in_progress', 'assigned' => 1, 'due' => 7],
        ];

        foreach ($tasksData as $td) {
            Task::create([
                'title'       => $td['title'],
                'description' => 'Task auto-seeded for demo purposes.',
                'assigned_to' => $employees[$td['assigned']]->id,
                'created_by'  => $admin->id,
                'due_date'    => Carbon::today()->addDays($td['due'])->toDateString(),
                'priority'    => $td['priority'],
                'status'      => $td['status'],
            ]);
        }

        // ─── 6. Payments ──────────────────────────────────────────────────────────
        foreach ($employees as $i => $emp) {
            Payment::create([
                'employee_id'  => $emp->id,
                'amount'       => 18000 + ($i * 2000),
                'payment_type' => 'salary',
                'status'       => 'paid',
                'payment_date' => Carbon::now()->startOfMonth()->toDateString(),
                'month_year'   => Carbon::now()->format('F Y'),
                'notes'        => 'Monthly salary for ' . Carbon::now()->format('F Y'),
            ]);

            if ($i === 0) {
                $baseLat = 11.0168;
                $baseLng = 76.9558;

                LocationLog::create([
                    'employee_id'    => $emp->id,
                    'latitude'       => $baseLat,
                    'longitude'      => $baseLng,
                    'is_gps_enabled' => true,
                    'battery_level'  => rand(30, 90),
                    'recorded_at'    => Carbon::now()->subMinutes(10),
                ]);

                // Add realistic movement path (20 points over the last 2 hours)
                for ($j = 20; $j >= 1; $j--) {
                    LocationLog::create([
                        'employee_id'    => $emp->id,
                        'latitude'       => $baseLat + ($j * 0.001 * (rand(-1, 1) ?: 1)),
                        'longitude'      => $baseLng + ($j * 0.001 * (rand(-1, 1) ?: 1)),
                        'is_gps_enabled' => true,
                        'battery_level'  => rand(30, 90),
                        'recorded_at'    => Carbon::now()->subMinutes($j * 6),
                    ]);
                }

                Payment::create([
                    'employee_id'  => $emp->id,
                    'amount'       => 3000,
                    'payment_type' => 'bonus',
                    'status'       => 'pending',
                    'payment_date' => null,
                    'month_year'   => Carbon::now()->format('F Y'),
                    'notes'        => 'Performance bonus for exceeding visit targets.',
                ]);
            }
        }

        $this->command->info('✅ Database seeded successfully!');
        $this->command->info('   Admin: admin@infinityorganics.com / Admin@1234');
        $this->command->info('   Employees: rajesh@infinityorganics.com / Employee@1234');
    }
}
