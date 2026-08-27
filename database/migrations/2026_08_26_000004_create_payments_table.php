<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained('users')->onDelete('cascade');
            $table->decimal('amount', 12, 2);
            $table->enum('payment_type', ['salary', 'bonus', 'reimbursement', 'advance'])->default('salary');
            $table->enum('status', ['pending', 'paid', 'cancelled'])->default('pending');
            $table->date('payment_date')->nullable();
            $table->string('month_year')->nullable(); // e.g. "August 2026"
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->index(['employee_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
