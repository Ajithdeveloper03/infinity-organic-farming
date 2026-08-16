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
        Schema::table('farmer_profiles', function (Blueprint $table) {
            $table->string('mobile_number')->nullable();
            $table->timestamp('otp_verified_at')->nullable();
            $table->string('aadhaar_number')->unique()->nullable();
            $table->string('aadhaar_image_path')->nullable();
            $table->string('farmer_photo_path')->nullable();
            $table->text('address')->nullable();
            $table->string('village')->nullable();
            $table->string('taluk')->nullable();
            $table->string('district')->nullable();
            $table->string('state')->nullable();
            $table->string('pincode')->nullable();
            $table->enum('kyc_status', ['pending', 'verified', 'rejected'])->default('pending');
            $table->decimal('total_land_owned', 8, 2)->nullable();
            $table->string('survey_number')->nullable();
            $table->string('irrigation_type')->nullable();
            $table->string('soil_type')->nullable();
            $table->integer('seed_bags_required')->nullable();
            $table->decimal('planned_investment', 12, 2)->nullable();
            $table->json('farm_photos')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('farmer_profiles', function (Blueprint $table) {
            $table->dropColumn([
                'mobile_number',
                'otp_verified_at',
                'aadhaar_number',
                'aadhaar_image_path',
                'farmer_photo_path',
                'address',
                'village',
                'taluk',
                'district',
                'state',
                'pincode',
                'kyc_status',
                'total_land_owned',
                'survey_number',
                'irrigation_type',
                'soil_type',
                'seed_bags_required',
                'planned_investment',
                'farm_photos'
            ]);
        });
    }
};
