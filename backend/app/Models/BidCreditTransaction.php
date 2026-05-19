<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BidCreditTransaction extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'technician_id',
        'type',
        'amount',
        'balance_after',
        'bid_credit_id',
        'job_id',
        'payment_id',
        'description',
        'metadata',
    ];

    protected $casts = [
        'metadata'   => 'array',
        'created_at' => 'datetime',
    ];

    public function technician()
    {
        return $this->belongsTo(User::class, 'technician_id');
    }

    public function bidCredit()
    {
        return $this->belongsTo(BidCredit::class);
    }

    public function job()
    {
        return $this->belongsTo(Job::class);
    }

    public function payment()
    {
        return $this->belongsTo(Payment::class);
    }
}