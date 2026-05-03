<?php

namespace App\Services;

use App\Models\BidCredit;
use App\Models\BidCreditPackage;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class PaymentService
{
    public function __construct(
        protected TechnicianQuotaService $quotaService
    ) {}

    /**
     * Paso 1 del flujo: crea el pago pendiente y retorna
     * los datos necesarios para inicializar PagueloFácil en el frontend.
     */
    public function initiateBidCreditPurchase(User $technician, int $packageId): array
    {
        $package = BidCreditPackage::where('id', $packageId)
            ->where('is_active', true)
            ->firstOrFail();

        // Crear el pago en estado pending
        $payment = Payment::create([
            'ulid'        => Str::ulid(),
            'user_id'     => $technician->id,
            'type'        => 'bid_credits',
            'amount'      => $package->price,
            'gateway'     => 'paguelofacil',
            'status'      => 'pending',
            'description' => "Paquete {$package->name} — {$package->credits} cotizaciones",
            'metadata'    => [
                'package_id'       => $package->id,
                'package_name'     => $package->name,
                'credits'          => $package->credits,
                'price_per_credit' => round($package->price / $package->credits, 2),
            ],
        ]);

        return [
            'payment_id'  => $payment->id,
            'payment_ulid'=> $payment->ulid,
            'amount'      => $payment->amount,
            'description' => $payment->description,
            'cclw'        => config('paguelofacil.cclw'),
            'package'     => [
                'id'      => $package->id,
                'name'    => $package->name,
                'credits' => $package->credits,
                'price'   => $package->price,
            ],
        ];
    }

    /**
     * Paso 2: confirma el pago usando el CodOper retornado por PagueloFácil.
     * Se llama desde el frontend después del pago exitoso.
     */
    public function confirmBidCreditPurchase(int $paymentId, string $codOper, User $technician): array
    {
        $payment = Payment::where('id', $paymentId)
            ->where('user_id', $technician->id)
            ->where('status', 'pending')
            ->firstOrFail();

        // Verificar el pago con PagueloFácil
        $verified = $this->verifyPaymentWithGateway($codOper, $payment->amount);

        if (!$verified) {
            $payment->update(['status' => 'failed']);
            throw new \Exception('El pago no pudo ser verificado con PagueloFácil.');
        }

        // Todo en una sola transacción de BD
        DB::transaction(function () use ($payment, $codOper, $technician) {
            $package = BidCreditPackage::find($payment->metadata['package_id']);

            // Actualizar payment
            $payment->update([
                'gateway_payment_id' => $codOper,
                'status'             => 'completed',
                'paid_at'            => now(),
            ]);

            // Registrar en bid_credits
            BidCredit::create([
                'technician_id'     => $technician->id,
                'package_id'        => $package->id,
                'payment_id'        => $payment->id,
                'credits_purchased' => $package->credits,
                'credits_used'      => 0,
            ]);

            // Sumar créditos al saldo del técnico
            $this->quotaService->addPaidCredits($technician, $package->credits);
        });

        $updatedQuota = $this->quotaService->getOrCreateQuota($technician);

        return [
            'message'             => 'Pago confirmado. Tus créditos están disponibles.',
            'credits_added'       => $payment->metadata['credits'],
            'paid_bids_remaining' => $updatedQuota->paid_bids_remaining,
        ];
    }

    /**
     * Maneja el webhook de PagueloFácil.
     * Mismo resultado que confirm pero activado por PagueloFácil directamente.
     */
    public function handleWebhook(array $payload): void
    {
        $codOper = $payload['CodOper'] ?? null;
        $amount  = $payload['amount']  ?? null;

        if (!$codOper) {
            Log::warning('Webhook PagueloFácil sin CodOper', $payload);
            return;
        }

        // Idempotencia — si ya procesamos este CodOper, ignorar
        $alreadyProcessed = Payment::where('gateway_payment_id', $codOper)
            ->where('status', 'completed')
            ->exists();

        if ($alreadyProcessed) {
            Log::info("Webhook duplicado ignorado: {$codOper}");
            return;
        }

        // Buscar el pago pendiente por monto
        $payment = Payment::where('status', 'pending')
            ->where('amount', $amount)
            ->where('gateway', 'paguelofacil')
            ->latest()
            ->first();

        if (!$payment) {
            Log::warning("Webhook PagueloFácil: no se encontró pago pendiente para CodOper {$codOper}");
            return;
        }

        $technician = User::find($payment->user_id);

        DB::transaction(function () use ($payment, $codOper, $technician) {
            $package = BidCreditPackage::find($payment->metadata['package_id']);

            $payment->update([
                'gateway_payment_id' => $codOper,
                'status'             => 'completed',
                'paid_at'            => now(),
            ]);

            BidCredit::create([
                'technician_id'     => $technician->id,
                'package_id'        => $package->id,
                'payment_id'        => $payment->id,
                'credits_purchased' => $package->credits,
                'credits_used'      => 0,
            ]);

            $this->quotaService->addPaidCredits($technician, $package->credits);
        });

        Log::info("Webhook PagueloFácil procesado: {$codOper} — créditos agregados al técnico {$technician->id}");
    }

    /**
     * Verifica el pago directamente con la API de PagueloFácil.
     */
    protected function verifyPaymentWithGateway(string $codOper, float $amount): bool
    {
        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . config('paguelofacil.api_key'),
                'Content-Type'  => 'application/json',
            ])->post(config('paguelofacil.base_url') . '/api/gateway/process/consulta', [
                'cclw'    => config('paguelofacil.cclw'),
                'codOper' => $codOper,
            ]);

            if (!$response->successful()) {
                Log::error('PagueloFácil verificación fallida', $response->json());
                return false;
            }

            $data = $response->json();

            // Verificar que el monto coincide
            return isset($data['data']['totalPagado']) &&
                   (float) $data['data']['totalPagado'] === (float) $amount;

        } catch (\Exception $e) {
            Log::error('Error verificando pago PagueloFácil: ' . $e->getMessage());
            return false;
        }
    }
}