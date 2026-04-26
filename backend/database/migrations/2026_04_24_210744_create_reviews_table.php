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
        Schema::create('reviews', function (Blueprint $table) {
        $table->id(); // BIGINT UNSIGNED, PK, AUTO_INCREMENT
        $table->foreignId('job_id')->unique()->constrained('jobs'); // UNIQUE, FK -> jobs.id
        $table->foreignId('client_id')->constrained('users'); // FK -> users.id, NOT NULL
        $table->foreignId('technician_id')->constrained('users'); // FK -> users.id, NOT NULL
        $table->tinyInteger('rating')->unsigned(); // TINYINT UNSIGNED, NOT NULL (1-5)
        $table->string('comment', 300)->nullable(); // VARCHAR(300), NULLABLE
        $table->boolean('is_visible')->default(true); // BOOLEAN, DEFAULT true
        $table->timestamp('created_at')->useCurrent(); // TIMESTAMP, NOT NULL
        $table->timestamp('updated_at')->useCurrent(); // TIMESTAMP, NOT NULL
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
