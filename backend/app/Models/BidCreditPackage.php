<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BidCreditPackage extends Model
{
    protected $fillable = [
        'name', 'credits', 'price',
        'is_featured', 'is_active', 'sort_order',
    ];

    protected $casts = [
        'price'       => 'float',
        'is_featured' => 'boolean',
        'is_active'   => 'boolean',
    ];
}