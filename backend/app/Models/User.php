<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
        protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'is_active',
        'phone',
        'provincia',
        'distrito',
        'corregimiento',
        'cedula',
        'specialty',
        'description',
        'experience_years',
        'hourly_rate',
        'google_id',
        'avatar_url',
        'bio',
        'is_verified',
        'verification_token',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
        public function jobsAsClient() {
        return $this->hasMany(Job::class, 'client_id');
    }

    public function jobsAsTechnician() {
        return $this->hasMany(Job::class, 'technician_id');
    }

    public function bids() {
        return $this->hasMany(Bid::class, 'technician_id');
    }
}
