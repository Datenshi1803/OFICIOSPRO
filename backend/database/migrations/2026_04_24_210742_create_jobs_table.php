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
        Schema::create('jobs', function (Blueprint $table) {
    $table->id(); // BIGINT UNSIGNED, PK, AUTO_INCREMENT
    $table->char('ulid', 26)->unique(); // UNIQUE, NOT NULL
    $table->string('code', 20)->unique(); // UNIQUE, NOT NULL
    $table->foreignId('client_id')->constrained('users'); // FK -> users.id, NOT NULL
    $table->foreignId('category_id')->constrained(); // FK -> categories.id, NOT NULL
    $table->foreignId('technician_id')->nullable()->constrained('users'); // FK -> users.id, NULLABLE
    $table->string('title', 100); // NOT NULL
    $table->text('description'); // NOT NULL
    $table->string('zone', 100); // NOT NULL
    $table->enum('urgency', ['normal', 'urgent', 'emergency']); // NOT NULL
    $table->decimal('budget', 10, 2)->nullable(); // NULLABLE
    $table->enum('status', ['published', 'bidding_closed', 'in_progress', 'completed', 'reviewed', 'disputed', 'cancelled'])->default('published');
    $table->foreignId('accepted_bid_id')->nullable(); // FK -> bids.id, NULLABLE
    $table->timestamp('completed_at')->nullable();
    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jobs');
    }
};
