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
        Schema::create('technician_quotas', function (Blueprint $table) {
        $table->id(); // BIGINT UNSIGNED, PK, AUTO_INCREMENT
        $table->foreignId('technician_id')->unique()->constrained('users'); // FK -> users.id, UNIQUE, NOT NULL
        $table->integer('remaining_quotes')->unsigned(); // INT UNSIGNED, NOT NULL
        $table->timestamp('expires_at')->nullable(); // TIMESTAMP, NULLABLE
        $table->timestamps(); // created_at, updated_at
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('technician_quotas');
    }
};
