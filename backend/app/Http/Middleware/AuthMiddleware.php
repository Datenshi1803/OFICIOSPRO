<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\User;

class AuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * Verifica:
     * 1. Token válido en header Authorization
     * 2. Usuario existe y está activo
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // 1. Obtener token del header Authorization
        $token = $request->bearerToken();
        
        if (!$token) {
            return response()->json([
                'success' => false,
                'message' => 'No autenticado',
                'error' => 'Debe iniciar sesión para acceder a este recurso'
            ], 401);
        }

        // 2. Validar token y obtener usuario
        $user = $this->validateToken($token);
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Token inválido',
                'error' => 'La sesión ha expirado. Inicie sesión nuevamente.'
            ], 401);
        }

        // 3. Verificar que el usuario esté activo
        if (!$user->is_active) {
            return response()->json([
                'success' => false,
                'message' => 'Usuario deshabilitado',
                'error' => 'Su cuenta ha sido desactivada. Contacte al administrador.'
            ], 403);
        }

        // Adjuntar usuario a la request
        $request->setUserResolver(fn () => $user);
        
        return $next($request);
    }

    /**
     * Validar token y retornar usuario
     */
    private function validateToken(string $token): ?User
    {
        try {
            // El token es: base64_encode($user->id . ':' . uniqid())
            $decoded = base64_decode($token);
            
            if (!$decoded || strpos($decoded, ':') === false) {
                return null;
            }

            $parts = explode(':', $decoded);
            $userId = $parts[0];

            if (!is_numeric($userId)) {
                return null;
            }

            $user = User::find($userId);
            
            return $user;
        } catch (\Exception $e) {
            return null;
        }
    }
}