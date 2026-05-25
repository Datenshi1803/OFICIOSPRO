<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\TechnicianQuota;
use App\Models\User;
use App\Rules\TurnstileValid;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    // =========================================================
    // LOGIN CON EMAIL Y PASSWORD
    // =========================================================
    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', strtolower(trim($request->email)))->first();

        // Respuesta genérica — no revela si el email existe o no
        if (!$user || !Hash::check($request->password, $user->password)) {
            Log::warning('Login fallido', [
                'email'      => $request->email,
                'ip'         => $request->ip(),
                'user_agent' => $request->userAgent(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Credenciales incorrectas.',
            ], 401);
        }

        // Cuenta suspendida
        if (!$user->is_active) {
            return response()->json([
                'success' => false,
                'message' => 'Tu cuenta ha sido suspendida. Contacta al soporte.',
            ], 403);
        }

        // Revocar tokens anteriores — evita sesiones infinitas acumuladas
        $user->tokens()->where('name', 'auth_token')->delete();

        // Crear token con Sanctum
        $token = $user->createToken('auth_token')->plainTextToken;

        Log::info('Login exitoso', [
            'user_id' => $user->id,
            'email'   => $user->email,
            'ip'      => $request->ip(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Login exitoso',
            'user'    => $user,
            'token'   => $token,
        ]);
    }

    public function register(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'captchaToken'     => ['required', new TurnstileValid],  // Verificación Cloudflare Turnstile
                'name'             => 'required|string|max:150',
                'email'            => 'required|email|unique:users,email',
                'password'         => 'required|string|min:8|regex:/^(?=.*[A-Z])(?=.*\d).+$/',
                'role'             => 'required|in:client,technician',
                'phone'            => 'nullable|string|max:20',
                'avatar_url'       => 'nullable|url|max:500',
                'bio'              => 'nullable|string|max:500',
                'provincia'        => 'nullable|string|max:100',
                'distrito'         => 'nullable|string|max:100',
                'corregimiento'    => 'nullable|string|max:100',

                // Solo técnicos
                'cedula'           => 'required_if:role,technician|string|max:20',
                'specialty'        => 'required_if:role,technician|string|max:100',
                'experience_years' => 'required_if:role,technician|integer|min:0|max:50',
                'description'      => 'nullable|string|max:1000',
                'hourly_rate'      => 'nullable|numeric|min:0',
            ], [
                'captchaToken.required'        => 'La verificación de seguridad es obligatoria.',
                'email.unique'                 => 'Este correo ya está registrado.',
                'password.regex'               => 'La contraseña debe tener al menos una mayúscula y un número.',
                'cedula.required_if'           => 'La cédula es obligatoria para técnicos.',
                'specialty.required_if'        => 'La especialidad es obligatoria para técnicos.',
                'experience_years.required_if' => 'Los años de experiencia son obligatorios para técnicos.',
            ]);

            // Verificar manualmente si el email ya existe (por si acaso)
            $existingUser = User::where('email', strtolower(trim($request->email)))->first();
            if ($existingUser) {
                return response()->json([
                    'success' => false,
                    'message' => 'Este correo ya está registrado.',
                ], 422);
            }

            $user = User::create([
                'name'             => strip_tags($request->name),
                'email'            => strtolower(trim($request->email)),
                'password'         => Hash::make($request->password),
                'role'             => strip_tags($request->role),
                'is_active'        => true,
                'phone'            => preg_replace('/[^0-9+\-\s]/', '', $request->phone),
                'avatar_url'       => $request->avatar_url,
                'bio'              => strip_tags($request->bio),
                'provincia'        => strip_tags($request->provincia),
                'distrito'         => strip_tags($request->distrito),
                'corregimiento'    => strip_tags($request->corregimiento),
                'cedula'           => strip_tags($request->cedula),
                'specialty'        => strip_tags($request->specialty),
                'description'      => strip_tags($request->description),
                'experience_years' => $request->experience_years,
                'hourly_rate'      => $request->hourly_rate,
            ]);

            // Crear cuota semanal automáticamente para técnicos
            if ($user->role === 'technician') {
                TechnicianQuota::create([
                    'technician_id'       => $user->id,
                    'free_bids_per_week'  => 2,
                    'free_bids_used'      => 0,
                    'paid_bids_remaining' => 0,
                    'week_reset_at'       => now()->next('Monday')->startOfDay(),
                ]);
            }

            // Login automático tras registro — retorna token directamente
            $token = $user->createToken('auth_token')->plainTextToken;

            Log::info('Registro exitoso', [
                'user_id' => $user->id,
                'email'   => $user->email,
                'role'    => $user->role,
                'ip'      => $request->ip(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Usuario registrado correctamente.',
                'user'    => $user,
                'token'   => $token,
            ], 201);
        } catch (\Illuminate\Database\QueryException $e) {
            // Capturar errores de BD específicos
            if (str_contains($e->getMessage(), 'unique') || str_contains($e->getMessage(), 'users_email_unique')) {
                Log::warning('Registro duplicado', ['email' => $request->email, 'ip' => $request->ip()]);
                return response()->json([
                    'success' => false,
                    'message' => 'Este correo ya está registrado.',
                ], 422);
            }

            Log::error('Error en registro', ['error' => $e->getMessage(), 'ip' => $request->ip()]);
            return response()->json([
                'success' => false,
                'message' => 'Error al registrar usuario. Por favor intenta más tarde.',
            ], 500);
        } catch (\Exception $e) {
            Log::error('Error general en registro', ['error' => $e->getMessage(), 'ip' => $request->ip()]);
            return response()->json([
                'success' => false,
                'message' => 'Error al registrar usuario.',
            ], 500);
        }
    }

    // =========================================================
    // LOGIN CON GOOGLE
    // =========================================================
    public function googleLogin(Request $request): JsonResponse
    {
        $request->validate([
            'token' => 'required|string',
        ]);

        try {
            $client = new \Google_Client(['client_id' => env('GOOGLE_CLIENT_ID')]);
            $payload = $client->verifyIdToken($request->token);
        } catch (\Exception $e) {
            Log::warning('Google login error', ['error' => $e->getMessage(), 'ip' => $request->ip()]);
            return response()->json([
                'success' => false,
                'message' => 'Token de Google inválido.',
            ], 401);
        }

        if (!$payload) {
            return response()->json([
                'success' => false,
                'message' => 'Token de Google inválido.',
            ], 401);
        }

        $user = User::where('email', $payload['email'])
            ->orWhere('google_id', $payload['sub'])
            ->first();

        if (!$user) {
            $user = User::create([
                'name'              => $payload['name'],
                'email'             => strtolower($payload['email']),
                'password'          => Hash::make(\Illuminate\Support\Str::random(32)),
                'role'              => 'client',
                'google_id'         => $payload['sub'],
                'avatar_url'        => $payload['picture'] ?? null,
                'email_verified_at' => now(),
                'is_active'         => true,
            ]);
        }

        if (!$user->is_active) {
            return response()->json([
                'success' => false,
                'message' => 'Tu cuenta ha sido suspendida.',
            ], 403);
        }

        // Actualizar google_id si no lo tenía
        if (!$user->google_id) {
            $user->update(['google_id' => $payload['sub']]);
        }

        $user->tokens()->where('name', 'auth_token')->delete();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Login con Google exitoso.',
            'user'    => $user,
            'token'   => $token,
        ]);
    }

    // =========================================================
    // PERFIL
    // =========================================================
    public function profile(Request $request): JsonResponse
    {
        $user = $request->user();

        return response()->json([
            'success' => true,
            'data'    => [
                'id'               => $user->id,
                'name'             => $user->name,
                'email'            => $user->email,
                'role'             => $user->role,
                'is_active'        => $user->is_active,
                'is_verified'      => $user->is_verified,
                'phone'            => $user->phone,
                'avatar_url'       => $user->avatar_url,
                'bio'              => $user->bio,
                'provincia'        => $user->provincia,
                'distrito'         => $user->distrito,
                'corregimiento'    => $user->corregimiento,
                'cedula'           => $user->cedula,
                'specialty'        => $user->specialty,
                'description'      => $user->description,
                'experience_years' => $user->experience_years,
                'hourly_rate'      => $user->hourly_rate,
                'reputation_score' => $user->reputation_score,
                'jobs_completed'   => $user->jobs_completed,
                'created_at'       => $user->created_at,
            ],
        ]);
    }

    // =========================================================
    // ACTUALIZAR PERFIL
    // =========================================================
    public function updateProfile(Request $request): JsonResponse
    {
        $user = $request->user();

        $validated = $request->validate([
            'name'          => 'sometimes|string|max:150',
            'phone'         => 'sometimes|string|max:20',
            'avatar_url'    => 'sometimes|url|max:500',
            'bio'           => 'sometimes|string|max:500',
            'provincia'     => 'sometimes|string|max:100',
            'distrito'      => 'sometimes|string|max:100',
            'corregimiento' => 'sometimes|string|max:100',
            'description'   => 'sometimes|string|max:1000',
            'hourly_rate'   => 'sometimes|numeric|min:0',
        ]);

        if ($user->role === 'technician') {
            $techValidated = $request->validate([
                'specialty'        => 'sometimes|string|max:100',
                'experience_years' => 'sometimes|integer|min:0|max:50',
            ]);
            $validated = array_merge($validated, $techValidated);
        }

        $user->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Perfil actualizado correctamente.',
            'data'    => $user->fresh(),
        ]);
    }

    // =========================================================
    // LOGOUT
    // =========================================================
    public function logout(Request $request): JsonResponse
    {
        // Revocar el token actual en la BD
        $request->user()->currentAccessToken()->delete();

        Log::info('Logout', [
            'user_id' => $request->user()->id,
            'ip'      => $request->ip(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Sesión cerrada correctamente.',
        ]);
    }
}