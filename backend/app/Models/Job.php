<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\JobImage;

class Job extends Model
{
    protected $fillable = [
        'ulid',
        'code',
        'client_id',
        'category_id',
        'technician_id',
        'title',
        'description',
        'zone',
        'urgency',
        'budget',
        'status',
        'accepted_bid_id',
        'completed_at',
    ];

    protected $casts = [
        'completed_at' => 'datetime',
    ];

    public function client() {
    return $this->belongsTo(User::class, 'client_id');
}

public function technician() {
    return $this->belongsTo(User::class, 'technician_id');
}

public function category() {
    return $this->belongsTo(Category::class);
}

public function bids() {
    return $this->hasMany(Bid::class);
}

public function review() {
    return $this->hasOne(Review::class);
}

public function acceptedBid() {
    return $this->belongsTo(Bid::class, 'accepted_bid_id');
}

 public function images()
{
    return $this->hasMany(JobImage::class)->orderBy('sort_order');
}   
}
