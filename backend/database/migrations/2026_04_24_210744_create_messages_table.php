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
        Schema::create('messages', function (Blueprint $table) {
        $table->id(); // BIGINT UNSIGNED, PK, AUTO_INCREMENT
        $table->foreignId('job_id')->constrained('jobs'); // FK -> jobs.id, NOT NULL
        $table->foreignId('sender_id')->constrained('users'); // FK -> users.id, NOT NULL
        $table->text('message'); // TEXT, NOT NULL
        $table->boolean('is_read')->default(false); // BOOLEAN, DEFAULT false
        $table->timestamps(); // created_at, updated_at
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
