<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BidCredit extends Model
{
    protected $fillable = [
        'technician_id', 'package_id', 'payment_id',
        'credits_purchased', 'credits_used',
    ];

    public function technician()
    {
        return $this->belongsTo(User::class, 'technician_id');
    }

    public function package()
    {
        return $this->belongsTo(BidCreditPackage::class);
    }

    public function payment()
    {
        return $this->belongsTo(Payment::class);
    }
}