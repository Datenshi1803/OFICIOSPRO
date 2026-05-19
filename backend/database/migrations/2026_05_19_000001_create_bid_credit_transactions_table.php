<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bid_credit_transactions', function (Blueprint $table) {
            $table->id();

            $table->foreignId('technician_id')
                  ->constrained('users')
                  ->cascadeOnDelete();

            $table->enum('type', ['purchase', 'use', 'refund', 'bonus', 'expiry']);

            $table->smallInteger('amount');
            $table->unsignedSmallInteger('balance_after');

            $table->foreignId('bid_credit_id')
                  ->nullable()
                  ->constrained('bid_credits')
                  ->nullOnDelete();

            $table->foreignId('job_id')
                  ->nullable()
                  ->constrained('jobs')
                  ->nullOnDelete();

            $table->foreignId('payment_id')
                  ->nullable()
                  ->constrained('payments')
                  ->nullOnDelete();

            $table->string('description', 255)->nullable();
            $table->jsonb('metadata')->nullable();

            $table->timestamp('created_at')->useCurrent();

            $table->index(['technician_id', 'created_at']);
            $table->index(['technician_id', 'type']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bid_credit_transactions');
    }
};