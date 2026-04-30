<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Builder;

class Bid extends Model
{
    protected $fillable = [
        'job_id',
        'technician_id',
        'amount',
        'estimated_days',
        'proposal',
        'availability_date',
        'is_paid_bid',
        'status',
    ];

    protected $casts = [
        'amount'            => 'decimal:2',
        'estimated_days'    => 'integer',
        'availability_date' => 'date',
        'is_paid_bid'       => 'boolean',
    ];

    // ── Relaciones ────────────────────────────────────────────────────────────

    public function job(): BelongsTo
    {
        return $this->belongsTo(Job::class);
    }

    public function technician(): BelongsTo
    {
        return $this->belongsTo(User::class, 'technician_id');
    }

    // ── Scopes ────────────────────────────────────────────────────────────────

    /** Cotizaciones ordenadas por reputación desc (default RF-10) */
    public function scopeDefaultOrder(Builder $query): Builder
    {
        return $query
            ->join('users', 'users.id', '=', 'bids.technician_id')
            ->orderByDesc('users.reputation_score')
            ->orderBy('bids.amount')
            ->orderBy('bids.created_at')
            ->select('bids.*');
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    public function isPending(): bool
    {
        return $this->status === 'pending';
    }

    public function isAccepted(): bool
    {
        return $this->status === 'accepted';
    }
}
