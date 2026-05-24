<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, string $requiredRole): Response
    {
        $user = $request->user();

        // Sanctum ya validó el token — si no hay usuario, no está autenticado
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'No autenticado',
                'error'   => 'Debe iniciar sesión para acceder a este recurso',
            ], 401);
        }

        // Verificar que esté activo
        if (!$user->is_active) {
            return response()->json([
                'success' => false,
                'message' => 'Usuario inactivo',
                'error'   => 'Su cuenta ha sido desactivada. Contacte al administrador.',
            ], 403);
        }

        // Verificar rol exacto
        if ($user->role !== $requiredRole) {
            return response()->json([
                'success'      => false,
                'message'      => 'Acceso denegado',
                'error'        => 'No tiene permisos para acceder a este recurso',
                'required_role'=> $requiredRole,
                'current_role' => $user->role,
            ], 403);
        }

        return $next($request);
    }
}