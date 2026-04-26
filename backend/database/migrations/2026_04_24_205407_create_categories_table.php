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
    Schema::create('categories', function (Blueprint $table) {
        $table->id(); // BIGINT UNSIGNED, PK, AUTO_INCREMENT
        $table->string('name', 100)->unique(); // VARCHAR(100), UNIQUE, NOT NULL
        $table->string('slug', 100)->unique(); // VARCHAR(100), UNIQUE, NOT NULL
        $table->string('description', 300)->nullable(); // VARCHAR(300), NULLABLE
        $table->string('icon_url', 500)->nullable(); // VARCHAR(500), NULLABLE
        $table->boolean('is_active')->default(true); // BOOLEAN, DEFAULT true
        $table->tinyInteger('sort_order')->unsigned()->default(0); // TINYINT UNSIGNED, DEFAULT 0
        $table->timestamps(); // created_at, updated_at
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
