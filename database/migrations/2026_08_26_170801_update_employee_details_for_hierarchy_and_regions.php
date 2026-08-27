<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('employee_details', function (Blueprint $table) {
            $table->enum('designation', [
                'regional_officer', 
                'district_officer', 
                'taluk_officer', 
                'field_officer'
            ])->default('field_officer')->after('employee_code');
            
            $table->foreignId('reports_to')->nullable()->after('designation')->constrained('users')->onDelete('set null');
            
            // Assuming assigned_region was a string, we might just keep it string or change it. 
            // We'll leave it as string for now to avoid dropping columns, but the app will enforce:
            // salem_erode_region, delta_zone, raanipettai_region, central_zone
        });
    }

    public function down(): void
    {
        Schema::table('employee_details', function (Blueprint $table) {
            $table->dropForeign(['reports_to']);
            $table->dropColumn('reports_to');
            $table->dropColumn('designation');
        });
    }
};
