<?php

namespace App\Services;

use App\Models\User;
use App\Models\TechnicianQuota;

class TechnicianQuotaService
{
    /**
     * Verifica si el técnico puede cotizar y con qué tipo de crédito.
     * Retorna: 'free' | 'paid' | 'none'
     */
    public function checkAvailability(User $technician): string
    {
        $quota = $this->getOrCreateQuota($technician);

        if ($quota->free_bids_used < $quota->free_bids_per_week) {
            return 'free';
        }

        if ($quota->paid_bids_remaining > 0) {
            return 'paid';
        }

        return 'none';
    }

    /**
     * Consume un crédito del técnico.
     * Retorna true si pudo consumir, false si no hay cuota.
     */
    public function consumeCredit(User $technician): bool
    {
        $quota = $this->getOrCreateQuota($technician);
        $type  = $this->checkAvailability($technician);

        if ($type === 'free') {
            $quota->increment('free_bids_used');
            return true;
        }

        if ($type === 'paid') {
            $quota->decrement('paid_bids_remaining');
            return true;
        }

        return false;
    }

    /**
     * Agrega créditos pagados al saldo del técnico.
     */
    public function addPaidCredits(User $technician, int $credits): void
    {
        $quota = $this->getOrCreateQuota($technician);
        $quota->increment('paid_bids_remaining', $credits);
    }

    /**
     * Obtiene o crea el registro de cuota del técnico.
     */
    public function getOrCreateQuota(User $technician): TechnicianQuota
    {
        return TechnicianQuota::firstOrCreate(
            ['technician_id' => $technician->id],
            [
                'free_bids_per_week'  => 2,
                'free_bids_used'      => 0,
                'paid_bids_remaining' => 0,
                'week_reset_at'       => now()->next('Monday')->startOfDay(),
            ]
        );
    }

    /**
     * Resetea las cuotas gratuitas de todos los técnicos.
     * Lo llama el Job programado cada lunes.
     */
    public function resetWeeklyFreeQuotas(): int
    {
        return TechnicianQuota::where('week_reset_at', '<=', now())
            ->update([
                'free_bids_used' => 0,
                'week_reset_at'  => now()->next('Monday')->startOfDay(),
            ]);
    }
}