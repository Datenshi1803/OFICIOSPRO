<?php

namespace App\Http\Controllers\Api\Bid;

use App\Http\Controllers\Controller;
use App\Models\Bid;
use App\Models\Job;
use App\Services\TechnicianQuotaService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BidController extends Controller
{
    public function __construct(
        protected TechnicianQuotaService $quotaService
    ) {}

    /**
 * POST /api/technician/cotizaciones
 */
public function store(Request $request): JsonResponse
{
    $data = $request->validate([
        'job_id'            => 'required|integer|exists:jobs,id',
        'amount'            => 'required|numeric|min:1|max:99999.99|regex:/^\d+(\.\d{1,2})?$/',
        'estimated_days'    => 'required|integer|min:1|max:365',
        'proposal'          => 'required|string|min:20|max:500',
        'availability_date' => 'required|date|after_or_equal:today',
    ], [
        'job_id.exists'                    => 'El trabajo no existe.',
        'amount.regex'                     => 'El monto no puede tener más de 2 decimales.',
        'proposal.min'                     => 'La propuesta debe tener al menos 20 caracteres.',
        'availability_date.after_or_equal' => 'La fecha debe ser hoy o en el futuro.',
    ]);

    // Sanitizar proposal contra XSS
    $data['proposal'] = strip_tags($data['proposal']);

    $technician = $request->user();
    $job        = Job::findOrFail($data['job_id']);

    if ($technician->id === $job->client_id) {
        return response()->json(['success' => false, 'message' => 'No puedes cotizar en tu propio trabajo.'], 403);
    }

    if ($job->status !== 'published') {
        return response()->json(['success' => false, 'message' => 'Este trabajo ya no acepta cotizaciones.'], 422);
    }

    $yaCotico = Bid::where('job_id', $job->id)
        ->where('technician_id', $technician->id)
        ->exists();

    if ($yaCotico) {
        return response()->json(['success' => false, 'message' => 'Ya enviaste una cotización para este trabajo.'], 422);
    }

    // ── Fix Race Condition: todo dentro de una transacción con lock ──
    $bid = \Illuminate\Support\Facades\DB::transaction(function () use ($data, $technician, $job) {

        $availability = $this->quotaService->checkAvailabilityWithLock($technician);

        if ($availability === 'none') {
            throw new \Exception('No tienes cotizaciones disponibles. Compra créditos para continuar.');
        }

        $isPaidBid = $availability === 'paid';

        $this->quotaService->consumeCredit($technician);

        return Bid::create([
            'job_id'            => $job->id,
            'technician_id'     => $technician->id,
            'amount'            => $data['amount'],
            'estimated_days'    => $data['estimated_days'],
            'proposal'          => $data['proposal'],
            'availability_date' => $data['availability_date'],
            'is_paid_bid'       => $isPaidBid,
            'status'            => 'pending',
        ]);
    });

    return response()->json([
        'success' => true,
        'message' => 'Cotización enviada correctamente.',
        'data'    => $bid->load('technician:id,name,avatar_url,reputation_score,jobs_completed,is_verified'),
    ], 201);
}

    /**
     * GET /api/technician/mis-cotizaciones
     * Lista todas las cotizaciones enviadas por el técnico autenticado.
     */
    public function myBids(Request $request): JsonResponse
    {
        $bids = Bid::with('job:id,code,title,zone,status,urgency')
            ->where('technician_id', $request->user()->id)
            ->orderByDesc('created_at')
            ->get();

        return response()->json([
            'success' => true,
            'data'    => $bids,
        ]);
    }

    /**
     * GET /api/jobs/{job}/bids
     * Lista las cotizaciones de un trabajo (para el cliente dueño).
     * Orden por defecto: reputación desc. Query param ?sort=price|date|reputation
     */
    public function index(Request $request, Job $job): JsonResponse
    {
        $user = $request->user();

        // Solo el cliente dueño del trabajo puede ver todas las cotizaciones
        if ($user->id !== $job->client_id) {
            return response()->json([
                'success' => false,
                'message' => 'No tienes permiso para ver estas cotizaciones.',
            ], 403);
        }

        $query = Bid::with([
            'technician:id,name,avatar_url,reputation_score,jobs_completed,is_verified',
        ])->where('job_id', $job->id);

        $sort = $request->query('sort', 'reputation');

        $bids = match ($sort) {
            'price' => $query->orderBy('amount')->get(),
            'date'  => $query->orderByDesc('created_at')->get(),
            default => $query->defaultOrder()->get(),
        };

        $bids->each(function ($bid) {
            if ($bid->technician) {
                $bid->technician->reputation_label = $bid->technician->jobs_completed < 3
                    ? 'Nuevo'
                    : number_format($bid->technician->reputation_score, 1);
            }
        });

        return response()->json([
            'success' => true,
            'data'    => $bids,
        ]);
    }

    /**
     * PUT /api/bids/{bid}
     * Técnico edita su propia cotización (solo si el trabajo sigue publicado).
     */
    public function update(Request $request, Bid $bid): JsonResponse
    {
        $user = $request->user();

        if ($user->id !== $bid->technician_id) {
            return response()->json([
                'success' => false,
                'message' => 'No puedes editar una cotización que no es tuya.',
            ], 403);
        }

        if ($bid->job->status !== 'published') {
            return response()->json([
                'success' => false,
                'message' => 'No puedes editar la cotización, el trabajo ya no está publicado.',
            ], 422);
        }

        $data = $request->validate([
            'amount'            => 'sometimes|numeric|min:1|max:99999.99|regex:/^\d+(\.\d{1,2})?$/',
            'estimated_days'    => 'sometimes|integer|min:1|max:365',
            'proposal'          => 'sometimes|string|min:20|max:500',
            'availability_date' => 'sometimes|date|after_or_equal:today',
        ]);

        $bid->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Cotización actualizada correctamente.',
            'data'    => $bid->fresh('technician'),
        ]);
    }

    /**
     * GET /api/bids/{bid}
     */
    public function show(Request $request, Bid $bid): JsonResponse
    {
        $user = $request->user();

        // Solo el técnico dueño o el cliente del trabajo pueden ver la cotización
        if ($user->id !== $bid->technician_id && $user->id !== $bid->job->client_id) {
            return response()->json([
                'success' => false,
                'message' => 'No autorizado.',
            ], 403);
        }

        return response()->json([
            'success' => true,
            'data'    => $bid->load(
                'technician:id,name,avatar_url,reputation_score,jobs_completed,is_verified',
                'job:id,code,title,status'
            ),
        ]);
    }

    /**
     * DELETE /api/bids/{bid}
     * No aplica en el modelo de negocio — cotizaciones no se eliminan.
     */
    public function destroy(Bid $bid): JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => 'Las cotizaciones no pueden eliminarse.',
        ], 405);
    }
}