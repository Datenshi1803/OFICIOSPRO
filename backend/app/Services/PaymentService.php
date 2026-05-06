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

    public function initiateBidCreditPurchase(User $technician, int $packageId): array
    {
        $package = BidCreditPackage::where('id', $packageId)
            ->where('is_active', true)
            ->firstOrFail();

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

        // Solo retorna los datos — sin construir URLs de PagueloFácil aquí
        // El frontend inicializa el widget con cclw + amount + description
        return [
            'payment_id'   => $payment->id,
            'payment_ulid' => $payment->ulid,
            'amount'       => $payment->amount,
            'description'  => $payment->description,
            'cclw'         => config('paguelofacil.cclw'),
            'package'      => [
                'id'      => $package->id,
                'name'    => $package->name,
                'credits' => $package->credits,
                'price'   => $package->price,
            ],
        ];
    }

    public function confirmBidCreditPurchase(int $paymentId, string $codOper, User $technician): array
    {
        $payment = Payment::where('id', $paymentId)
            ->where('user_id', $technician->id)
            ->where('status', 'pending')
            ->firstOrFail();

        // En sandbox saltamos la verificación — en producción la activamos
        $isSandbox = config('paguelofacil.env') === 'sandbox';

        if (!$isSandbox) {
            $verified = $this->verifyPaymentWithGateway($codOper, $payment->amount);
            if (!$verified) {
                $payment->update(['status' => 'failed']);
                throw new \Exception('El pago no pudo ser verificado con PagueloFácil.');
            }
        }

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

        $updatedQuota = $this->quotaService->getOrCreateQuota($technician);

        return [
            'message'             => 'Pago confirmado. Tus créditos están disponibles.',
            'credits_added'       => $payment->metadata['credits'],
            'paid_bids_remaining' => $updatedQuota->paid_bids_remaining,
        ];
    }

    public function handleWebhook(array $payload): void
    {
        Log::info('Webhook PagueloFácil recibido', $payload);

        // PagueloFácil puede enviar CodOper o Oper según el tipo de pago
        $codOper = $payload['CodOper'] ?? $payload['Oper'] ?? null;
        $amount  = $payload['TotalPagado'] ?? $payload['amount'] ?? null;

        if (!$codOper) {
            Log::warning('Webhook PagueloFácil sin CodOper', $payload);
            return;
        }

        // Idempotencia
        $alreadyProcessed = Payment::where('gateway_payment_id', $codOper)
            ->where('status', 'completed')
            ->exists();

        if ($alreadyProcessed) {
            Log::info("Webhook duplicado ignorado: {$codOper}");
            return;
        }

        $payment = Payment::where('status', 'pending')
            ->where('gateway', 'paguelofacil')
            ->latest()
            ->first();

        if (!$payment) {
            Log::warning("Webhook: no se encontró pago pendiente para CodOper {$codOper}");
            return;
        }

        $technician = User::find($payment->user_id);

        if (!$technician) {
            Log::error("Webhook: técnico no encontrado para payment {$payment->id}");
            return;
        }

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

        Log::info("Webhook procesado: {$codOper} — técnico {$technician->id}");
    }

    protected function verifyPaymentWithGateway(string $codOper, float $amount): bool
    {
        try {
            $baseUrl = config('paguelofacil.env') === 'sandbox'
                ? config('paguelofacil.base_url')
                : config('paguelofacil.prod_url');

            $response = Http::withHeaders([
                'Authorization' => config('paguelofacil.api_key'),
                'Content-Type'  => 'application/json',
            ])->post("{$baseUrl}/webservices/rest/processTx/CONSULT", [
                'cclw'    => config('paguelofacil.cclw'),
                'codOper' => $codOper,
            ]);

            Log::info('PagueloFácil verificación respuesta', $response->json());

            if (!$response->successful()) {
                Log::error('PagueloFácil verificación fallida', $response->json());
                return false;
            }

            $data = $response->json();

            // PagueloFácil retorna Estado: "Aprobada" en pagos exitosos
            $estado = $data['Estado'] ?? $data['data']['Estado'] ?? null;

            if ($estado !== 'Aprobada') {
                Log::warning("PagueloFácil estado inesperado: {$estado}");
                return false;
            }

            // Verificar que el monto coincide
            $totalPagado = (float) ($data['TotalPagado'] ?? $data['data']['TotalPagado'] ?? 0);

            return $totalPagado >= (float) $amount;

        } catch (\Exception $e) {
            Log::error('Error verificando pago PagueloFácil: ' . $e->getMessage());
            return false;
        }
    }
}