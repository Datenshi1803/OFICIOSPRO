<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\InitiatePaymentRequest;
use App\Http\Requests\ConfirmPaymentRequest;
use App\Services\PaymentService;
use App\Services\TechnicianQuotaService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function __construct(
        protected PaymentService       $paymentService,
        protected TechnicianQuotaService $quotaService
    ) {}

    /**
     * GET /api/bid-credit-packages
     * Lista los paquetes disponibles para compra.
     */
    public function packages(): JsonResponse
    {
        $packages = \App\Models\BidCreditPackage::where('is_active', true)
            ->orderBy('sort_order')
            ->get();

        return response()->json(['data' => $packages]);
    }

    /**
     * GET /api/me/quota
     * Retorna la cuota actual del técnico autenticado.
     */
    public function quota(Request $request): JsonResponse
    {
        $quota = $this->quotaService->getOrCreateQuota($request->user());
        $availability = $this->quotaService->checkAvailability($request->user());

        return response()->json([
            'data' => [
                'free_bids_per_week'  => $quota->free_bids_per_week,
                'free_bids_used'      => $quota->free_bids_used,
                'free_bids_remaining' => $quota->free_bids_per_week - $quota->free_bids_used,
                'paid_bids_remaining' => $quota->paid_bids_remaining,
                'week_reset_at'       => $quota->week_reset_at,
                'can_bid'             => $availability !== 'none',
                'bid_type'            => $availability,
            ]
        ]);
    }

    /**
     * POST /api/payments/bid-credits
     * Inicia la compra de un paquete de créditos.
     */
    public function initiate(InitiatePaymentRequest $request): JsonResponse
    {
        $data = $this->paymentService->initiateBidCreditPurchase(
            $request->user(),
            $request->validated('package_id')
        );

        return response()->json(['data' => $data], 201);
    }

    /**
     * POST /api/payments/confirm
     * Confirma el pago con el CodOper retornado por PagueloFácil.
     */
    public function confirm(ConfirmPaymentRequest $request): JsonResponse
    {
        $result = $this->paymentService->confirmBidCreditPurchase(
            $request->validated('payment_id'),
            $request->validated('cod_oper'),
            $request->user()
        );

        return response()->json(['data' => $result]);
    }

    /**
     * GET /api/me/payments
     * Historial de pagos del técnico autenticado.
     */
    public function history(Request $request): JsonResponse
    {
        $payments = \App\Models\Payment::where('user_id', $request->user()->id)
            ->orderByDesc('created_at')
            ->get()
            ->map(fn($p) => [
                'ulid'        => $p->ulid,
                'type'        => $p->type,
                'amount'      => $p->amount,
                'status'      => $p->status,
                'description' => $p->description,
                'credits'     => $p->metadata['credits'] ?? null,
                'paid_at'     => $p->paid_at,
                'created_at'  => $p->created_at,
            ]);

        return response()->json(['data' => $payments]);
    }
}