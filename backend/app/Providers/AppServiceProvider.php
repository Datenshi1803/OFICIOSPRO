<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        // ── Login: 5 intentos por email+IP cada 15 minutos ────────────────
        RateLimiter::for('login', function (Request $request) {
            return [
                // Por email — evita atacar una cuenta específica
                Limit::perMinutes(15, 5)
                    ->by('login_email:' . strtolower($request->input('email', '')))
                    ->response(fn() => response()->json([
                        'success' => false,
                        'message' => 'Demasiados intentos fallidos. Intenta nuevamente en 15 minutos.',
                    ], 429)),

                // Por IP — evita ataques desde una misma máquina
                Limit::perMinutes(15, 10)
                    ->by('login_ip:' . $request->ip())
                    ->response(fn() => response()->json([
                        'success' => false,
                        'message' => 'Demasiados intentos fallidos. Intenta nuevamente en 15 minutos.',
                    ], 429)),
            ];
        });

        // ── Registro: 3 registros por IP por hora ─────────────────────────
        RateLimiter::for('register', function (Request $request) {
            return Limit::perHour(3)
                ->by('register_ip:' . $request->ip())
                ->response(fn() => response()->json([
                    'success' => false,
                    'message' => 'Has creado demasiadas cuentas. Intenta nuevamente en una hora.',
                ], 429));
        });

        // ── API general: 60 peticiones por minuto por IP ──────────────────
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)
                ->by($request->user()?->id ?: $request->ip())
                ->response(fn() => response()->json([
                    'success' => false,
                    'message' => 'Demasiadas solicitudes. Intenta nuevamente en un momento.',
                ], 429));
        });
    }
}