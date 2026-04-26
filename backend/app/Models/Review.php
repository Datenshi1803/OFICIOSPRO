<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $fillable = [
        'job_id',
        'client_id',
        'technician_id',
        'rating',
        'comment',
        'is_visible',
    ];

    protected $casts = [
        'rating' => 'integer',
        'is_visible' => 'boolean',
        'created_at' => 'datetime',
    ];

    public function job() {
        return $this->belongsTo(Job::class);
    }

    public function client() {
        return $this->belongsTo(User::class, 'client_id');
    }

    public function technician() {
        return $this->belongsTo(User::class, 'technician_id');
    }
}
