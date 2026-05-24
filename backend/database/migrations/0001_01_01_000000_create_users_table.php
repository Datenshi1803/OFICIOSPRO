<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name', 150);
            $table->string('email', 255)->unique();
            $table->string('password', 255);
            $table->enum('role', ['admin', 'technician', 'client']);
            $table->boolean('is_active')->default(true);

            // Contacto y perfil
            $table->string('phone', 20)->nullable();
            $table->string('avatar_url', 500)->nullable();
            $table->text('bio')->nullable();

            // Ubicación
            $table->string('provincia', 100)->nullable();
            $table->string('distrito', 100)->nullable();
            $table->string('corregimiento', 100)->nullable();

            // Verificación
            $table->boolean('is_verified')->default(false);
            $table->string('verification_token', 100)->nullable();
            $table->timestamp('email_verified_at')->nullable();

            // Solo técnicos
            $table->string('cedula', 20)->nullable();
            $table->string('specialty', 255)->nullable();
            $table->text('description')->nullable();
            $table->unsignedInteger('experience_years')->nullable();
            $table->decimal('hourly_rate', 10, 2)->nullable();

            // Reputación
            $table->decimal('reputation_score', 3, 2)->default(0.00);
            $table->unsignedInteger('jobs_completed')->default(0);

            // Google OAuth
            $table->string('google_id', 100)->unique()->nullable();

            $table->timestamps();
            $table->softDeletes();
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

    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};