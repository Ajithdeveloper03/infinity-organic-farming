<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('farmer_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('created_by_employee_id')->nullable()->constrained('users')->onDelete('set null');
            $table->enum('approval_status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->string('farmer_code')->unique()->nullable();
            $table->decimal('land_size_acres', 8, 2)->nullable();
            $table->decimal('land_latitude', 10, 7)->nullable();
            $table->decimal('land_longitude', 10, 7)->nullable();
            $table->text('land_address')->nullable();
            $table->string('vetiver_crop_stage')->nullable();
            $table->date('planting_date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('farmer_profiles');
    }
};
