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
        Schema::create('visit_media', function (Blueprint $table) {
            $table->id();
            $table->foreignId('visit_id')->constrained('farmer_visits')->onDelete('cascade');
            $table->string('file_path');
            $table->enum('file_type', ['photo', 'video']);
            $table->decimal('captured_latitude', 10, 7)->nullable();
            $table->decimal('captured_longitude', 10, 7)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('visit_media');
    }
};
