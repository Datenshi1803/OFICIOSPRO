<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('technician_quotas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('technician_id')
                  ->unique()
                  ->constrained('users')
                  ->cascadeOnDelete();
            $table->unsignedTinyInteger('free_bids_per_week')->default(2);
            $table->unsignedTinyInteger('free_bids_used')->default(0);
            $table->unsignedSmallInteger('paid_bids_remaining')->default(0);
            $table->timestamp('week_reset_at');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('technician_quotas');
    }
};