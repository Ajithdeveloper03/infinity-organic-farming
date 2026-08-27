<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tracking_sessions', function (Blueprint $table) {
            $table->id();
            $table->string('session_id')->unique();
            $table->foreignId('employee_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('attendance_log_id')->nullable()->constrained('attendance_logs')->onDelete('set null');
            $table->enum('status', ['active', 'completed'])->default('active');
            $table->timestamp('start_time')->nullable();
            $table->timestamp('end_time')->nullable();
            $table->decimal('start_latitude', 10, 8)->nullable();
            $table->decimal('start_longitude', 11, 8)->nullable();
            $table->decimal('end_latitude', 10, 8)->nullable();
            $table->decimal('end_longitude', 11, 8)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tracking_sessions');
    }
};
