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
        Schema::create('users', function (Blueprint $table) {
            $table->id(); // BIGINT UNSIGNED, PK, AUTO_INCREMENT
            $table->char('ulid', 26)->unique(); // ULID UNIQUE, NOT NULL
            $table->string('name', 150); // VARCHAR(150), NOT NULL
            $table->string('email', 255)->unique(); // VARCHAR(255), UNIQUE, NOT NULL
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
            $table->boolean('is_active')->default(true); // BOOLEAN, DEFAULT true
            $table->timestamps(); // created_at, updated_at
            $table->softDeletes(); // Crea la columna 'deleted_at' (para el borrado lógico)
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
