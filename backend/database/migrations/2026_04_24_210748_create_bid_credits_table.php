<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bid_credits', function (Blueprint $table) {
            $table->id();
            $table->foreignId('technician_id')
                  ->constrained('users')
                  ->cascadeOnDelete();
            $table->foreignId('package_id')
                  ->constrained('bid_credit_packages')
                  ->restrictOnDelete();
            $table->foreignId('payment_id')
                  ->constrained('payments')
                  ->restrictOnDelete();
            $table->unsignedTinyInteger('credits_purchased');
            $table->unsignedTinyInteger('credits_used')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bid_credits');
    }
};