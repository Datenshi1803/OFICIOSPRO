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
        Schema::create('bid_credits', function (Blueprint $table) {
        $table->id(); // BIGINT UNSIGNED, PK, AUTO_INCREMENT
        $table->foreignId('technician_id')->constrained('users'); // FK -> users.id, NOT NULL
        $table->foreignId('package_id')->constrained('bid_credit_packages'); // FK -> bid_credit_packages.id, NOT NULL
        $table->integer('credits_added')->unsigned(); // INT UNSIGNED, NOT NULL
        $table->timestamp('purchased_at')->useCurrent(); // TIMESTAMP, NOT NULL
        $table->timestamps(); // created_at, updated_at
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('credits');
    }
};
