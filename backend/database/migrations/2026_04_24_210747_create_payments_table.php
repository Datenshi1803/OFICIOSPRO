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
        Schema::create('payments', function (Blueprint $table) {
        $table->id(); // BIGINT UNSIGNED, PK, AUTO_INCREMENT
        $table->foreignId('job_id')->constrained('jobs'); // FK -> jobs.id, NOT NULL
        $table->foreignId('client_id')->constrained('users'); // FK -> users.id, NOT NULL
        $table->foreignId('technician_id')->constrained('users'); // FK -> users.id, NOT NULL
        $table->decimal('amount', 10, 2); // DECIMAL(10,2), NOT NULL
        $table->string('transaction_id', 100)->unique(); // VARCHAR(100), UNIQUE, NOT NULL
        $table->enum('payment_method', ['card', 'bank_transfer', 'cash', 'other']); // ENUM, NOT NULL
        $table->enum('status', ['pending', 'completed', 'refunded', 'failed'])->default('pending'); // ENUM, DEFAULT 'pending'
        $table->timestamps(); // created_at, updated_at
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
