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
    Schema::table('jobs', function (Blueprint $table) {
    $table->unsignedBigInteger('accepted_bid_id')->nullable()->change();

    $table->foreign('accepted_bid_id', 'fk_jobs_accepted_bid')
          ->references('id')
          ->on('bids')
          ->onDelete('set null');
});
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('jobs', function (Blueprint $table) {
            //
        });
    }
};
