<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TechnicianQuota extends Model
{
    protected $fillable = [
        'technician_id', 'free_bids_per_week',
        'free_bids_used', 'paid_bids_remaining', 'week_reset_at',
    ];

    protected $casts = [
        'week_reset_at' => 'datetime',
    ];

    public function technician()
    {
        return $this->belongsTo(User::class, 'technician_id');
    }
}