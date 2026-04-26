<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::select(['id', 'name', 'email', 'role', 'is_active', 'created_at'])
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return response()->json([
            'success' => true,
            'data' => $users
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::findOrFail($id);
        
        return response()->json([
            'success' => true,
            'data' => $user
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $id,
            'phone' => 'sometimes|string|max:20',
            'provincia' => 'sometimes|string|max:100',
            'distrito' => 'sometimes|string|max:100',
            'corregimiento' => 'sometimes|string|max:100',
            'cedula' => 'sometimes|string|max:20',
            'specialty' => 'sometimes|string|max:255',
            'description' => 'sometimes|string|max:1000',
            'experience_years' => 'sometimes|integer|min:0',
            'hourly_rate' => 'sometimes|numeric|min:0',
        ]);

        $user->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Usuario actualizado correctamente',
            'data' => $user
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::findOrFail($id);

        // No permitir eliminarse a sí mismo
        if ($user->id === Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'No puede eliminar su propia cuenta'
            ], 422);
        }

        $user->delete();

        return response()->json([
            'success' => true,
            'message' => 'Usuario eliminado correctamente'
        ]);
    }

    /**
     * Toggle user active status (Admin only)
     */
    public function toggleActive(string $id)
    {
        $user = User::findOrFail($id);
        
        // No permitir desactivarse a sí mismo
        if ($user->id === Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'No puede desactivar su propia cuenta'
            ], 422);
        }

        $user->is_active = !$user->is_active;
        $user->save();

        return response()->json([
            'success' => true,
            'message' => $user->is_active 
                ? 'Usuario activado correctamente' 
                : 'Usuario desactivado correctamente',
            'data' => [
                'id' => $user->id,
                'name' => $user->name,
                'is_active' => $user->is_active
            ]
        ]);
    }
}
