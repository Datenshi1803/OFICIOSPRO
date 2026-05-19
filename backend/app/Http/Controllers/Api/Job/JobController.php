<?php

namespace App\Http\Controllers\Api\Job;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Job;

class JobController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Job::with(['client', 'category'])->get());
    }

    public function available()
    {
        $jobs = Job::with(['client', 'category']) 
            ->whereNull('technician_id')
            ->where('status', 'published')
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $jobs
        ], 200);
    }

    public function myJobs()
    {
        $jobs = Job::with(['client', 'category'])
            ->where('technician_id', auth()->id())
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $jobs
        ], 200);
    }

    public function clientJobs()
    {
        $jobs = Job::with(['client', 'category', 'technician'])
            ->withCount('bids')
            ->where('client_id', auth()->id())
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $jobs
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:100',
            'description' => 'required|string|max:1000',
            'category_id' => 'required|integer',
            'zone' => 'required|string',
            'urgency' => 'required|in:normal,urgent,emergency',
            'budget' => 'nullable|numeric|min:0',
        ]);

        $validated['client_id'] = auth()->id();
        $validated['status'] = 'published';
        $validated['ulid'] = (string) \Illuminate\Support\Str::ulid();
        
        // Generate a unique code (e.g. JOB-1234)
        $latestJob = Job::latest('id')->first();
        $nextId = $latestJob ? $latestJob->id + 1 : 1;
        $validated['code'] = 'JOB-' . str_pad($nextId, 4, '0', STR_PAD_LEFT);

        $job = Job::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Trabajo publicado exitosamente',
            'data' => $job
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    /**
 * POST /api/client/trabajos/{job}/aceptar-cotizacion
 * Cliente acepta una cotización — asigna el trabajo al técnico
 */
public function acceptBid(Request $request, Job $job)
{
    // Verificar que el trabajo pertenece al cliente autenticado
    if ($job->client_id !== auth()->id()) {
        return response()->json([
            'success' => false,
            'message' => 'No tienes permiso para modificar este trabajo.',
        ], 403);
    }

    // Verificar que el trabajo está en estado válido para aceptar
    if ($job->status !== 'published') {
        return response()->json([
            'success' => false,
            'message' => 'Este trabajo ya no acepta cotizaciones.',
        ], 422);
    }

    $validated = $request->validate([
        'bid_id' => 'required|integer|exists:bids,id',
    ]);

    // Verificar que la cotización pertenece a este trabajo
    $bid = \App\Models\Bid::where('id', $validated['bid_id'])
        ->where('job_id', $job->id)
        ->where('status', 'pending')
        ->first();

    if (!$bid) {
        return response()->json([
            'success' => false,
            'message' => 'Cotización no válida para este trabajo.',
        ], 404);
    }

    // Todo en una transacción
    \Illuminate\Support\Facades\DB::transaction(function () use ($job, $bid) {
        // Actualizar el trabajo
        $job->update([
            'status'          => 'in_progress',
            'technician_id'   => $bid->technician_id,
            'accepted_bid_id' => $bid->id,
        ]);

        // Marcar la cotización aceptada
        $bid->update(['status' => 'accepted']);

        // Rechazar todas las demás cotizaciones del mismo trabajo
        \App\Models\Bid::where('job_id', $job->id)
            ->where('id', '!=', $bid->id)
            ->update(['status' => 'rejected']);
    });

    // Cargar relaciones para la respuesta
    $job->load(['technician', 'category', 'bids.technician']);

    return response()->json([
        'success' => true,
        'message' => 'Cotización aceptada. El trabajo ha sido asignado al técnico.',
        'data'    => $job,
    ]);
}

/**
 * PATCH /api/client/trabajos/{job}/completar
 * Cliente confirma que el trabajo fue completado
 */
public function markCompleted(Request $request, Job $job)
{
    if ($job->client_id !== auth()->id()) {
        return response()->json([
            'success' => false,
            'message' => 'No tienes permiso para modificar este trabajo.',
        ], 403);
    }

    if ($job->status !== 'in_progress') {
        return response()->json([
            'success' => false,
            'message' => 'El trabajo no está en progreso.',
        ], 422);
    }

    $job->update([
        'status'       => 'completed',
        'completed_at' => now(),
    ]);

    return response()->json([
        'success' => true,
        'message' => 'Trabajo marcado como completado.',
        'data'    => $job,
    ]);
}
}