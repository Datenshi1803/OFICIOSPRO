<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\PaymentService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class WebhookController extends Controller
{
    public function __construct(
        protected PaymentService $paymentService
    ) {}

    public function paguelofacil(Request $request)
    {
        Log::info('Webhook PagueloFácil recibido', $request->all());

        try {
            $this->paymentService->handleWebhook($request->all());
        } catch (\Exception $e) {
            Log::error('Error procesando webhook PagueloFácil: ' . $e->getMessage());
            return response()->json(['error' => 'Error interno'], 500);
        }

        return response()->json(['ok' => true]);
    }
}