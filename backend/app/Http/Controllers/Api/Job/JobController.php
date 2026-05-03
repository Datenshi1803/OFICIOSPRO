<?php
 
namespace App\Http\Controllers\Api\Job;
 
use App\Http\Controllers\Controller;
use App\Models\Job;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
 
class JobController extends Controller
{
    /**
     * GET /api/client/trabajos
     * Lista los trabajos del cliente autenticado.
     */
    public function index(Request $request): JsonResponse
    {
        $jobs = Job::with('category:id,name')
            ->where('client_id', $request->user()->id)
            ->orderByDesc('created_at')
            ->get();
 
        return response()->json([
            'success' => true,
            'data'    => $jobs,
        ]);
    }
 
    /**
     * POST /api/client/trabajos
     * Cliente publica un nuevo trabajo.
     */
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'category_id' => 'required|integer|exists:categories,id',
            'title'       => 'required|string|min:5|max:100',
            'description' => 'required|string|min:20|max:1000',
            'zone'        => 'required|string|max:100',
            'urgency'     => 'required|in:normal,urgent,emergency',
            'budget'      => 'nullable|numeric|min:1|max:99999.99',
        ], [
            'category_id.exists'  => 'La categoría seleccionada no existe.',
            'title.min'           => 'El título debe tener al menos 5 caracteres.',
            'description.min'     => 'La descripción debe tener al menos 20 caracteres.',
            'urgency.in'          => 'La urgencia debe ser: normal, urgent o emergency.',
        ]);
 
        // Generar código único OFP-2026-00001
        $lastJob = Job::orderByDesc('id')->first();
        $nextNumber = $lastJob ? $lastJob->id + 1 : 1;
        $code = 'OFP-' . date('Y') . '-' . str_pad($nextNumber, 5, '0', STR_PAD_LEFT);
 
        $job = Job::create([
            'ulid'        => Str::ulid(),
            'code'        => $code,
            'client_id'   => $request->user()->id,
            'category_id' => $data['category_id'],
            'title'       => $data['title'],
            'description' => $data['description'],
            'zone'        => $data['zone'],
            'urgency'     => $data['urgency'],
            'budget'      => $data['budget'] ?? null,
            'status'      => 'published',
        ]);
 
        return response()->json([
            'success' => true,
            'message' => 'Trabajo publicado correctamente.',
            'data'    => $job->load('category:id,name'),
        ], 201);
    }
 
    /**
     * GET /api/jobs/{job}
     * Ver detalle de un trabajo.
     */
    public function show(Job $job): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data'    => $job->load([
                'category:id,name',
                'client:id,name,avatar_url',
                'bids.technician:id,name,avatar_url,reputation_score,jobs_completed,is_verified',
            ]),
        ]);
    }
 
    /**
     * PUT /api/jobs/{job}
     * Cliente edita su trabajo (solo si está publicado).
     */
    public function update(Request $request, Job $job): JsonResponse
    {
        if ($request->user()->id !== $job->client_id) {
            return response()->json([
                'success' => false,
                'message' => 'No puedes editar un trabajo que no es tuyo.',
            ], 403);
        }
 
        if ($job->status !== 'published') {
            return response()->json([
                'success' => false,
                'message' => 'Solo puedes editar trabajos en estado publicado.',
            ], 422);
        }
 
        $data = $request->validate([
            'title'       => 'sometimes|string|min:5|max:100',
            'description' => 'sometimes|string|min:20|max:1000',
            'zone'        => 'sometimes|string|max:100',
            'urgency'     => 'sometimes|in:normal,urgent,emergency',
            'budget'      => 'nullable|numeric|min:1|max:99999.99',
        ]);
 
        $job->update($data);
 
        return response()->json([
            'success' => true,
            'message' => 'Trabajo actualizado correctamente.',
            'data'    => $job->fresh('category'),
        ]);
    }
 
    /**
     * DELETE /api/jobs/{job}
     * Cliente cancela su trabajo.
     */
    public function destroy(Request $request, Job $job): JsonResponse
    {
        if ($request->user()->id !== $job->client_id) {
            return response()->json([
                'success' => false,
                'message' => 'No puedes cancelar un trabajo que no es tuyo.',
            ], 403);
        }
 
        if (!in_array($job->status, ['published', 'bidding_closed'])) {
            return response()->json([
                'success' => false,
                'message' => 'No puedes cancelar un trabajo que ya está en progreso.',
            ], 422);
        }
 
        $job->update(['status' => 'cancelled']);
 
        return response()->json([
            'success' => true,
            'message' => 'Trabajo cancelado correctamente.',
        ]);
    }
 
    /**
     * GET /api/technician/trabajos-disponibles
     * Lista trabajos publicados disponibles para el técnico.
     */
    public function available(Request $request): JsonResponse
    {
        $jobs = Job::with('category:id,name')
            ->where('status', 'published')
            ->orderByDesc('created_at')
            ->get();
 
        return response()->json([
            'success' => true,
            'data'    => $jobs,
        ]);
    }
}