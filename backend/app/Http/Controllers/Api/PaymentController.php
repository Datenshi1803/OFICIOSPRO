<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\InitiatePaymentRequest;
use App\Http\Requests\ConfirmPaymentRequest;
use App\Services\PaymentService;
use App\Services\TechnicianQuotaService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PaymentController extends Controller
{
    public function __construct(
        protected PaymentService       $paymentService,
        protected TechnicianQuotaService $quotaService
    ) {}

    /**
     * GET /api/bid-credit-packages
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
     * Inicia la compra — crea el Payment en BD y devuelve los datos al frontend.
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
     * POST /api/payments/create-link
     * Llama a PagueloFácil para obtener la URL de checkout de un solo uso.
     * El frontend redirige al usuario a esa URL.
     */
    public function createLink(Request $request): JsonResponse
    {
        $request->validate(['payment_id' => 'required|integer']);

        $payment = \App\Models\Payment::where('id', $request->payment_id)
            ->where('user_id', $request->user()->id)
            ->where('status', 'pending')
            ->firstOrFail();

        $isSandbox = config('services.paguelofacil.env') === 'sandbox';

        $endpoint = $isSandbox
            ? 'https://sandbox.paguelofacil.com/LinkDeamon.cfm'
            : 'https://secure.paguelofacil.com/LinkDeamon.cfm';

        // RETURN_URL debe ir codificada en hexadecimal (requisito de PagueloFácil)
        $returnUrl    = config('app.frontend_url') . '/dashboard/tecnico/creditos/retorno';
        $returnUrlHex = bin2hex($returnUrl);

        $response = Http::asForm()->post($endpoint, [
            'CCLW'       => config('services.paguelofacil.cclw'),
            'CMTN'       => number_format($payment->amount, 2, '.', ''),
            'CDSC'       => $payment->description,
            'RETURN_URL' => $returnUrlHex,
            'PARM_1'     => $payment->id,   // lo devuelve PF en el retorno para trazabilidad
        ]);

        $body = $response->json();

        if (! $response->successful() || empty($body['data']['url'])) {
            \Log::error('PagueloFácil createLink falló', [
                'status' => $response->status(),
                'body'   => $body,
            ]);
            return response()->json([
                'success' => false,
                'message' => 'No se pudo generar el enlace de pago. Intenta nuevamente.',
            ], 502);
        }

        return response()->json([
            'success' => true,
            'data'    => ['url' => $body['data']['url']],
        ]);
    }

    /**
     * POST /api/payments/confirm
     * Confirma el pago con el Oper retornado por PagueloFácil.
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