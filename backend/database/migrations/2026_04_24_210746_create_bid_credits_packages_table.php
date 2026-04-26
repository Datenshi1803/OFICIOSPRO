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
        Schema::create('bid_credit_packages', function (Blueprint $table) {
        $table->id(); // BIGINT UNSIGNED, PK, AUTO_INCREMENT
        $table->string('name', 100); // VARCHAR(100), NOT NULL
        $table->integer('credits')->unsigned(); // INT UNSIGNED, NOT NULL
        $table->decimal('price', 10, 2); // DECIMAL(10,2), NOT NULL
        $table->boolean('is_active')->default(true); // BOOLEAN, DEFAULT true
        $table->timestamps(); // created_at, updated_at
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bid_credits_packages');
    }
};
