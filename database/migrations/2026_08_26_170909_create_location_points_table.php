<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('location_points', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tracking_session_id')->constrained('tracking_sessions')->onDelete('cascade');
            $table->foreignId('employee_id')->constrained('users')->onDelete('cascade');
            $table->decimal('latitude', 10, 8);
            $table->decimal('longitude', 11, 8);
            $table->float('accuracy')->nullable();
            $table->float('speed')->nullable();
            $table->float('heading')->nullable();
            $table->bigInteger('timestamp');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('location_points');
    }
};
