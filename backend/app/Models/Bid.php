<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bid extends Model
{
    protected $fillable = [
        'job_id',
        'technician_id',
        'amount',
        'estimated_days',
        'proposal',
        'availability_date',
        'is_paid_bid',
        'status',
    ];

    protected $casts = [
        'availability_date' => 'date',
        'is_paid_bid' => 'boolean',
    ];

    public function job() {
    return $this->belongsTo(Job::class);
}

    public function technician() {
        return $this->belongsTo(User::class, 'technician_id');
    }
}
