<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BidCreditPackage extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'credits',
        'price',
        'subtitle',
        'badge_text',
        'description',
        'features',
        'payment_provider_id',
        'is_featured',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'price'       => 'float',
        'is_featured' => 'boolean',
        'is_active'   => 'boolean',
        'features'    => 'array',
    ];

    public function bidCredits()
    {
        return $this->hasMany(BidCredit::class, 'package_id');
    }
}