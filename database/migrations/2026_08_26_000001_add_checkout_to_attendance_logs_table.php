<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('attendance_logs', function (Blueprint $table) {
            $table->timestamp('check_out_timestamp')->nullable()->after('check_in_timestamp');
            $table->decimal('check_out_latitude', 10, 7)->nullable()->after('check_out_timestamp');
            $table->decimal('check_out_longitude', 10, 7)->nullable()->after('check_out_latitude');
        });
    }

    public function down(): void
    {
        Schema::table('attendance_logs', function (Blueprint $table) {
            $table->dropColumn(['check_out_timestamp', 'check_out_latitude', 'check_out_longitude']);
        });
    }
};
