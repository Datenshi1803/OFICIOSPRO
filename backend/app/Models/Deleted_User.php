<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DeletedUser extends Model
{
    protected $table = 'deleted_users';

    public $timestamps = false;

    protected $fillable = [
        'original_user_id',
        'ulid',
        'name',
        'email',
        'password',
        'role',
        'phone',
        'avatar_url',
        'zone',
        'is_verified',
        'cedula',
        'reputation_score',
        'jobs_completed',
        'email_verified_at',
        'google_id',
        'is_active',
        'deleted_at',
    ];

    protected $casts = [
        'is_verified' => 'boolean',
        'reputation_score' => 'decimal:2',
        'jobs_completed' => 'integer',
        'email_verified_at' => 'datetime',
        'is_active' => 'boolean',
        'deleted_at' => 'datetime',
    ];
}
