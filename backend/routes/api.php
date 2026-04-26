<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TestController;
use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\User\UserController;
use App\Http\Controllers\Api\Job\JobController;
use App\Http\Controllers\Api\Bid\BidController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::get('/test', [TestController::class, 'index']);

// ============================================================
// RUTAS PÚBLICAS (sin autenticación)
// ============================================================
Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
});

// ============================================================
// RUTAS PROTEGIDAS CON AUTH CUSTOM
// ============================================================
Route::middleware('auth')->group(function () {

    // -------------------------------------------------------
    // RUTAS EXCLUSIVAS PARA CLIENTES
    // -------------------------------------------------------
    Route::prefix('client')->middleware('role:client')->group(function () {
        Route::get('/dashboard', function () {
            return response()->json([
                'success' => true,
                'message' => 'Dashboard de cliente',
                'data' => [
                    'mis_trabajos' => [],
                    'tecnicos_favoritos' => [],
                    'notificaciones' => [],
                ]
            ]);
        });

        Route::get('/profile', [AuthController::class, 'profile']);
        Route::put('/profile', [AuthController::class, 'updateProfile']);
        Route::post('/trabajos', [JobController::class, 'store']);
        Route::get('/trabajos', [JobController::class, 'index']);
    });

    // -------------------------------------------------------
    // RUTAS EXCLUSIVAS PARA TÉCNICOS
    // -------------------------------------------------------
    Route::prefix('technician')->middleware('role:technician')->group(function () {
        Route::get('/dashboard', function () {
            return response()->json([
                'success' => true,
                'message' => 'Dashboard de técnico',
                'data' => [
                    'trabajos_disponibles' => [],
                    'mis_trabajos' => [],
                    'cotizaciones_pendientes' => [],
                    'ingresos' => [],
                ]
            ]);
        });

        Route::get('/profile', [AuthController::class, 'profile']);
        Route::put('/profile', [AuthController::class, 'updateProfile']);
        Route::get('/trabajos-disponibles', [JobController::class, 'available']);
        Route::post('/cotizaciones', [BidController::class, 'store']);
        Route::get('/mis-cotizaciones', [BidController::class, 'myBids']);
    });

    // -------------------------------------------------------
    // RUTAS EXCLUSIVAS PARA ADMINISTRADORES
    // -------------------------------------------------------
    Route::prefix('admin')->middleware('role:admin')->group(function () {
        Route::get('/dashboard', function () {
            return response()->json([
                'success' => true,
                'message' => 'Dashboard de administrador',
                'data' => [
                    'total_usuarios' => 0,
                    'total_tecnicos' => 0,
                    'total_clientes' => 0,
                    'trabajos_activos' => 0,
                ]
            ]);
        });

        Route::get('/usuarios', [UserController::class, 'index']);
        Route::get('/usuarios/{user}/toggle-active', [UserController::class, 'toggleActive']);
        Route::get('/estadisticas', function () {
            return response()->json([
                'success' => true,
                'data' => [
                    'usuarios_por_rol' => [],
                    'trabajos_por_estado' => [],
                ]
            ]);
        });
    });

    // -------------------------------------------------------
    // RUTAS COMUNES (cualquier usuario autenticado)
    // -------------------------------------------------------
    Route::get('/me', function (\Illuminate\Http\Request $request) {
        // El usuario ya fue adjuntado por el AuthMiddleware
        $user = $request->user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'No autenticado'
            ], 401);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'is_active' => $user->is_active,
            ]
        ]);
    });

    Route::post('/auth/logout', [AuthController::class, 'logout']);
});

// ============================================================
// RUTAS PÚBLICAS DE RECURSOS
// ============================================================
Route::apiResource('users', UserController::class);
Route::apiResource('jobs', JobController::class);
Route::apiResource('bids', BidController::class);
