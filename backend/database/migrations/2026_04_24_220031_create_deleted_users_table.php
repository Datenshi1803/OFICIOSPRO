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
        Schema::create('deleted_users', function (Blueprint $table) {
    $table->id(); // ID único del histórico
    $table->unsignedBigInteger('original_user_id'); // Referencia al ID original
    $table->string('ulid', 26);
    $table->string('name', 150);
    $table->string('email', 255);
    $table->string('password', 255); // VARCHAR(255), NOT NULL
    $table->enum('role', ['admin', 'technician', 'client']); // Ajusta los roles según tu necesidad
    $table->string('phone', 20); // VARCHAR(20), NOT NULL
    $table->string('avatar_url', 500)->nullable(); // VARCHAR(500), NULLABLE
    $table->string('zone', 100)->nullable(); // VARCHAR(100), NULLABLE
    $table->boolean('is_verified')->default(false); // BOOLEAN, DEFAULT false
    $table->string('cedula', 20)->nullable(); // VARCHAR(20), NULLABLE
    $table->decimal('reputation_score', 3, 2)->default(0.00); // DECIMAL(3,2), DEFAULT 0.00
    $table->unsignedInteger('jobs_completed')->default(0); // INT UNSIGNED, DEFAULT 0
    $table->timestamp('email_verified_at')->nullable(); // TIMESTAMP, NULLABLE
    $table->string('google_id', 100)->unique()->nullable(); // VARCHAR(100), UNIQUE, NULLABLE
    $table->boolean('is_active')->default(false); // BOOLEAN, DEFAULT false
    $table->timestamp('deleted_at')->useCurrent(); // Cuándo se movió a esta tabla
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('deleted_users');
    }
};
