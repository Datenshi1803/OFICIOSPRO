<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = [
        'ulid', 'user_id', 'type', 'amount',
        'gateway', 'gateway_payment_id', 'status',
        'description', 'metadata', 'paid_at',
    ];

    protected $casts = [
        'metadata' => 'array',
        'amount'   => 'float',
        'paid_at'  => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function bidCredits()
    {
        return $this->hasMany(BidCredit::class);
    }
}