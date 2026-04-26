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
            $table->enum('role', ['client', 'technician'])->default('client')->after('email');
            $table->string('phone')->nullable()->after('role');
            $table->string('provincia')->nullable()->after('phone');
            $table->string('distrito')->nullable()->after('provincia');
            $table->string('corregimiento')->nullable()->after('distrito');
            $table->string('cedula')->nullable()->after('corregimiento');
            $table->string('specialty')->nullable()->after('cedula');
            $table->text('description')->nullable()->after('specialty');
            $table->integer('experience_years')->nullable()->after('description');
            $table->decimal('hourly_rate', 10, 2)->nullable()->after('experience_years');
            $table->string('google_id')->nullable()->after('hourly_rate');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'role',
                'phone',
                'provincia',
                'distrito',
                'corregimiento',
                'cedula',
                'specialty',
                'description',
                'experience_years',
                'hourly_rate',
                'google_id',
            ]);
        });
    }
};
