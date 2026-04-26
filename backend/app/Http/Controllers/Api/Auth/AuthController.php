<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Google_Client;

class AuthController extends Controller
{
    // =========================
    // � LOGIN CON EMAIL/PASSWORD
    // =========================
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Credenciales inválidas'
            ], 401);
        }

        // Generar token simple (en producción usar Laravel Sanctum)
        $token = base64_encode($user->id . ':' . uniqid());

        return response()->json([
            'message' => 'Login exitoso',
            'user' => $user,
            'token' => $token
        ]);
    }

    // =========================
    // �📝 REGISTRO NORMAL
    // =========================
    public function register(Request $request)
    {
        // 🔥 VALIDACIÓN
        $request->validate([
            'name' => 'required|string|max:150',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
            'role' => 'required|in:client,technician',

            'phone' => 'nullable',

            // SOLO técnicos
            'cedula' => 'required_if:role,technician',
            'specialty' => 'required_if:role,technician',
            'experience_years' => 'required_if:role,technician|integer'
        ]);

        // 🔐 CREAR USUARIO
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'is_active' => true, // Por defecto activo
            'phone' => $request->phone,

            'provincia' => $request->provincia,
            'distrito' => $request->distrito,
            'corregimiento' => $request->corregimiento,

            'cedula' => $request->cedula,
            'specialty' => $request->specialty,
            'description' => $request->description,
            'experience_years' => $request->experience_years,
            'hourly_rate' => $request->hourly_rate,
        ]);

        return response()->json([
            'message' => 'Usuario registrado correctamente',
            'user' => $user
        ], 201);
    }

    // =========================
    // 🔐 LOGIN CON GOOGLE
    // =========================
    public function googleLogin(Request $request)
    {
        $request->validate([
            'token' => 'required'
        ]);

        $client = new Google_Client([
            'client_id' => env('GOOGLE_CLIENT_ID')
        ]);

        $payload = $client->verifyIdToken($request->token);

        if (!$payload) {
            return response()->json([
                'error' => 'Token inválido'
            ], 401);
        }

        $email = $payload['email'];
        $name = $payload['name'];
        $google_id = $payload['sub'];

        $user = User::where('email', $email)->first();

        if (!$user) {
            $user = User::create([
                'name' => $name,
                'email' => $email,
                'password' => Hash::make(uniqid()),
                'role' => 'client', // siempre cliente por defecto
                'phone' => null,
                'google_id' => $google_id,
                'email_verified_at' => now()
            ]);
        }

        return response()->json([
            'message' => 'Login con Google exitoso',
            'user' => $user
        ]);
    }

    // =========================
    // 👤 OBTENER PERFIL DEL USUARIO
    // =========================
    public function profile(Request $request)
    {
        $user = $request->user();
        
        return response()->json([
            'success' => true,
            'data' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'is_active' => $user->is_active,
                'phone' => $user->phone,
                'provincia' => $user->provincia,
                'distrito' => $user->distrito,
                'corregimiento' => $user->corregimiento,
                'cedula' => $user->cedula,
                'specialty' => $user->specialty,
                'description' => $user->description,
                'experience_years' => $user->experience_years,
                'hourly_rate' => $user->hourly_rate,
                'created_at' => $user->created_at,
            ]
        ]);
    }

    // =========================
    // ✏️ ACTUALIZAR PERFIL DEL USUARIO
    // =========================
    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => 'sometimes|string|max:150',
            'phone' => 'sometimes|string|max:20',
            'provincia' => 'sometimes|string|max:100',
            'distrito' => 'sometimes|string|max:100',
            'corregimiento' => 'sometimes|string|max:100',
            'description' => 'sometimes|string|max:1000',
            'hourly_rate' => 'sometimes|numeric|min:0',
        ]);

        // Solo técnicos pueden actualizar estos campos
        if ($user->role === 'technician') {
            $request->validate([
                'specialty' => 'sometimes|string|max:100',
                'experience_years' => 'sometimes|integer|min:0',
            ]);
            
            $validated['specialty'] = $request->specialty;
            $validated['experience_years'] = $request->experience_years;
        }

        $user->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Perfil actualizado correctamente',
            'data' => $user
        ]);
    }

    // =========================
    // 🚪 LOGOUT
    // =========================
    public function logout(Request $request)
    {
        // El token se invalida del lado del cliente eliminando el localStorage
        return response()->json([
            'success' => true,
            'message' => 'Sesión cerrada correctamente'
        ]);
    }
}
