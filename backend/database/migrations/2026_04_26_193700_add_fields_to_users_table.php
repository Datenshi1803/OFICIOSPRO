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
        Schema::table('users', function (Blueprint $table) {
            $table->string('provincia', 100)->nullable()->after('phone');
            $table->string('distrito', 100)->nullable()->after('provincia');
            $table->string('corregimiento', 100)->nullable()->after('distrito');
            $table->string('specialty', 255)->nullable()->after('cedula');
            $table->text('description')->nullable()->after('specialty');
            $table->unsignedInteger('experience_years')->nullable()->after('description');
            $table->decimal('hourly_rate', 10, 2)->nullable()->after('experience_years');
            $table->text('bio')->nullable()->after('avatar_url');
            $table->string('verification_token', 100)->nullable()->after('is_verified');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'provincia',
                'distrito',
                'corregimiento',
                'specialty',
                'description',
                'experience_years',
                'hourly_rate',
                'bio',
                'verification_token',
            ]);
        });
    }
};