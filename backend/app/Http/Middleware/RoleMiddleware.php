<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\User;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * Verifica:
     * 1. Token válido en header Authorization
     * 2. Usuario existe y está activo (is_active = true)
     * 3. Rol exacto del usuario (consultado desde la base de datos)
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $requiredRole): Response
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

        // 2. Validar token y obtener usuario (consulta DESDE LA BASE DE DATOS)
        $user = $this->validateToken($token);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Token inválido',
                'error' => 'La sesión ha expirado. Inicie sesión nuevamente.'
            ], 401);
        }

        // 3. Refrescar usuario desde la base de datos para obtener el rol actual
        // Esto asegura que el rol se consulta directamente de la DB
        $user = User::where('id', $user->id)
            ->where('is_active', true)
            ->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Usuario no encontrado o inactivo',
                'error' => 'Su cuenta ha sido desactivada o eliminada. Contacte al administrador.'
            ], 403);
        }

        // 4. Validar que el rol sea EXACTAMENTE el requerido (consultado de la DB)
        if ($user->role !== $requiredRole) {
            return response()->json([
                'success' => false,
                'message' => 'Acceso denegado',
                'error' => 'No tiene permisos para acceder a este recurso',
                'required_role' => $requiredRole,
                'current_role' => $user->role
            ], 403);
        }

        // Adjuntar usuario a la request para uso posterior
        $request->setUserResolver(fn () => $user);

        return $next($request);
    }

    /**
     * Validar token y retornar usuario (sin verificar is_active aquí,
     * se verifica después para obtener el rol actual de la DB)
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

            // Solo verificar que existe el usuario
            return User::find($userId);
        } catch (\Exception $e) {
            return null;
        }
    }
}
