<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->ulid('ulid')->unique();
            $table->foreignId('user_id')
                  ->constrained('users')
                  ->restrictOnDelete();
            $table->enum('type', ['bid_credits', 'subscription']);
            $table->decimal('amount', 10, 2);
            $table->enum('gateway', ['paguelofacil', 'yappy', 'manual']);
            $table->string('gateway_payment_id', 255)->unique()->nullable();
            $table->enum('status', ['pending', 'completed', 'failed', 'refunded'])
                  ->default('pending');
            $table->string('description', 255)->nullable();
            $table->jsonb('metadata')->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};