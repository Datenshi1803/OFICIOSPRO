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
        Schema::create('bids', function (Blueprint $table) {
        $table->id(); // BIGINT UNSIGNED, PK, AUTO_INCREMENT
        $table->foreignId('job_id')->constrained('jobs'); // FK -> jobs.id, NOT NULL
        $table->foreignId('technician_id')->constrained('users'); // FK -> users.id, NOT NULL
        $table->decimal('amount', 10, 2); // DECIMAL(10,2), NOT NULL
        $table->tinyInteger('estimated_days')->unsigned(); // TINYINT UNSIGNED, NOT NULL
        $table->text('proposal'); // TEXT, NOT NULL
        $table->date('availability_date'); // DATE, NOT NULL
        $table->boolean('is_paid_bid')->default(false); // BOOLEAN, DEFAULT false
        $table->enum('status', ['pending', 'accepted', 'rejected'])->default('pending'); // ENUM, NOT NULL, DEFAULT 'pending'
        $table->timestamps(); // created_at, updated_at
        
        // Restricción de integridad: Un técnico no puede enviar más de una cotización por trabajo
        $table->unique(['job_id', 'technician_id']);
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bids');
    }
};
