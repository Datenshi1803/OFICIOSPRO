<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TestController;
use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\User\UserController;
use App\Http\Controllers\Api\Job\JobController;
use App\Http\Controllers\Api\Bid\BidController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\WebhookController;

// ============================================================
// RUTAS PÚBLICAS — sin autenticación
// ============================================================

Route::get('/test', [TestController::class, 'index']);

Route::prefix('auth')->group(function () {
    Route::post('/login',    [AuthController::class, 'login'])
       ->middleware('throttle:login');

    Route::post('/register', [AuthController::class, 'register'])
       ->middleware('throttle:register');
});

// Webhook — PagueloFácil llama directamente, sin token
Route::post('/webhooks/paguelofacil', [WebhookController::class, 'paguelofacil'])
    ->middleware('throttle:30,1')
    ->name('webhooks.paguelofacil');

// Paquetes de créditos — público para que el frontend los muestre sin login
Route::get('/bid-credit-packages', [PaymentController::class, 'packages'])
    ->name('bid-credit-packages.index');

// ============================================================
// RUTAS PROTEGIDAS — auth:sanctum en todo
// ============================================================
Route::middleware('auth:sanctum', 'throttle:api')->group(function () {

    // ── Logout y perfil propio ────────────────────────────────────────────────
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    Route::get('/me', function (\Illuminate\Http\Request $request) {
        return response()->json([
            'success' => true,
            'data'    => $request->user()->only([
                'id', 'name', 'email', 'role', 'is_active',
            ]),
        ]);
    });

    // ── Pagos y cuota ─────────────────────────────────────────────────────────
    Route::get('/me/quota',              [PaymentController::class, 'quota'])->name('quota.show');
    Route::get('/me/payments',           [PaymentController::class, 'history'])->name('payments.history');
    Route::post('/payments/bid-credits', [PaymentController::class, 'initiate'])->name('payments.initiate');
    Route::post('/payments/confirm',     [PaymentController::class, 'confirm'])->name('payments.confirm');
    Route::post('/payments/create-link', [PaymentController::class, 'createLink'])->name('payments.createLink');

    // ── Cotización individual (ambos roles) ───────────────────────────────────
    Route::get('/cotizaciones/{bid}', [BidController::class, 'show']);

    // ─────────────────────────────────────────────────────────────────────────
    // CLIENTE
    // ─────────────────────────────────────────────────────────────────────────
    Route::prefix('client')->middleware('role:client')->group(function () {

        Route::get('/dashboard', fn() => response()->json([
            'success' => true,
            'message' => 'Dashboard de cliente',
        ]));

        Route::get('/profile', [AuthController::class, 'profile']);
        Route::put('/profile', [AuthController::class, 'updateProfile']);

        // Específicas ANTES que las genéricas
        Route::post('/trabajos/{job}/aceptar-cotizacion', [JobController::class, 'acceptBid']);
        Route::patch('/trabajos/{job}/completar',         [JobController::class, 'markCompleted']);
        Route::post('/trabajos',                          [JobController::class, 'store']);
        Route::get('/trabajos',                           [JobController::class, 'clientJobs']);
        Route::get('/trabajos/{job}/cotizaciones',        [BidController::class, 'index']);
    });

    // ─────────────────────────────────────────────────────────────────────────
    // TÉCNICO
    // ─────────────────────────────────────────────────────────────────────────
    Route::prefix('technician')->middleware('role:technician')->group(function () {

        Route::get('/dashboard', fn() => response()->json([
            'success' => true,
            'message' => 'Dashboard de técnico',
        ]));

        Route::get('/profile', [AuthController::class, 'profile']);
        Route::put('/profile', [AuthController::class, 'updateProfile']);

        Route::get('/trabajos-disponibles', [JobController::class, 'available']);
        Route::get('/mis-trabajos',         [JobController::class, 'myJobs']);

        Route::post('/cotizaciones',      [BidController::class, 'store']);
        Route::get('/mis-cotizaciones',   [BidController::class, 'myBids']);
        Route::put('/cotizaciones/{bid}', [BidController::class, 'update']);
    });

    // ─────────────────────────────────────────────────────────────────────────
    // ADMINISTRADOR
    // ─────────────────────────────────────────────────────────────────────────
    Route::prefix('admin')->middleware('role:admin')->group(function () {

        Route::get('/dashboard', fn() => response()->json([
            'success' => true,
            'message' => 'Dashboard de administrador',
        ]));

        Route::get('/usuarios',                      [UserController::class, 'index']);
        Route::get('/usuarios/{user}',               [UserController::class, 'show']);
        Route::put('/usuarios/{user}',               [UserController::class, 'update']);
        Route::delete('/usuarios/{user}',            [UserController::class, 'destroy']);
        Route::get('/usuarios/{user}/toggle-active', [UserController::class, 'toggleActive']);

        Route::post('/trabajos/{job}/republicar', [JobController::class, 'republish']);

        Route::get('/estadisticas', fn() => response()->json([
            'success' => true,
            'data'    => [
                'usuarios_por_rol'    => [],
                'trabajos_por_estado' => [],
            ],
        ]));
    });
});