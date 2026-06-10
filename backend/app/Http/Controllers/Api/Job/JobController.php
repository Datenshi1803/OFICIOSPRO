<?php

namespace App\Http\Controllers\Api\Job;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Job;

class JobController extends Controller
{
    /**
     * GET /api/categories
     * Devuelve todas las categorías disponibles en la BD
     */
    public function categories()
    {
        try {
            $categories = \App\Models\Category::select('id', 'name')->orderBy('name')->get();

            return response()->json([
                'success' => true,
                'data'    => $categories,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'No se pudieron cargar las categorías.',
            ], 500);
        }
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Job::with(['client', 'category'])->get());
    }

    /**
     * GET /api/jobs/available
     * Trabajos publicados sin técnico asignado — visibles para técnicos.
     * Se exponen provincia y distrito como ubicación principal.
     */
    public function available()
    {
        $jobs = Job::with([
                'client:id,name,avatar_url,reputation_score,jobs_completed,provincia,distrito',
                'category:id,name',
                'images',
            ])
            ->whereNull('technician_id')
            ->where('status', 'published')
            ->latest()
            ->get()
            // Seleccionar sólo los campos que el técnico necesita ver
            ->map(fn ($job) => [
                'id'          => $job->id,
                'ulid'        => $job->ulid,
                'code'        => $job->code,
                'title'       => $job->title,
                'description' => $job->description,
                'provincia'   => $job->provincia,
                'distrito'    => $job->distrito,
                // Coordenadas sólo si existen (el técnico puede ver el área en mapa)
                'latitude'    => $job->latitude,
                'longitude'   => $job->longitude,
                'urgency'     => $job->urgency,
                'budget'      => $job->budget,
                'status'      => $job->status,
                'category'    => $job->category,
                'client'      => $job->client,
                'images'      => $job->images,
                'created_at'  => $job->created_at,
            ]);

        return response()->json([
            'success' => true,
            'data'    => $jobs,
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
            'data' => $jobs,
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
            'data' => $jobs,
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:100',
            'description' => 'required|string|max:1000',
            'category_id' => 'required|integer|exists:categories,id',
            'urgency'     => 'required|in:normal,urgent,emergency',
            'budget'      => 'nullable|numeric|min:0',
            // Ubicación estructurada (reemplaza "zone")
            'provincia'   => 'required|string|max:100',
            'distrito'    => 'required|string|max:100',
            // Coordenadas opcionales
            'latitude'    => 'nullable|numeric|between:-90,90',
            'longitude'   => 'nullable|numeric|between:-180,180',
            // Imágenes
            'image_urls'   => 'nullable|array|max:5',
            'image_urls.*' => 'url|max:500',
        ]);

        try {
            $validated['client_id'] = auth()->id();
            $validated['status']    = 'published';
            $validated['ulid']      = (string) \Illuminate\Support\Str::ulid();

            $latestJob         = Job::latest('id')->first();
            $nextId            = $latestJob ? $latestJob->id + 1 : 1;
            $validated['code'] = 'JOB-' . str_pad($nextId, 4, '0', STR_PAD_LEFT);

            $imageUrls = $validated['image_urls'] ?? [];
            unset($validated['image_urls']);

            $job = \Illuminate\Support\Facades\DB::transaction(function () use ($validated, $imageUrls) {
                $job = Job::create($validated);

                foreach ($imageUrls as $index => $url) {
                    \App\Models\JobImage::create([
                        'job_id'     => $job->id,
                        'url'        => $url,
                        'filename'   => basename(parse_url($url, PHP_URL_PATH)),
                        'sort_order' => $index,
                    ]);
                }

                return $job;
            });

            return response()->json([
                'success' => true,
                'message' => 'Trabajo publicado exitosamente',
                'data'    => $job->load('images'),
            ], 201);

        } catch (\Illuminate\Database\QueryException $e) {
            \Illuminate\Support\Facades\Log::error('JobController@store DB error: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'No se pudo guardar el trabajo. Verifica los datos e intenta nuevamente.',
                
            ], 500);

        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('JobController@store error: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Ocurrió un error inesperado. Intenta nuevamente.',
            ], 500);
        }
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
        if ($job->client_id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'No tienes permiso para modificar este trabajo.',
            ], 403);
        }

        if ($job->status !== 'published') {
            return response()->json([
                'success' => false,
                'message' => 'Este trabajo ya no acepta cotizaciones.',
            ], 422);
        }

        $validated = $request->validate([
            'bid_id' => 'required|integer|exists:bids,id',
        ]);

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

        \Illuminate\Support\Facades\DB::transaction(function () use ($job, $bid) {
            $job->update([
                'status'          => 'in_progress',
                'technician_id'   => $bid->technician_id,
                'accepted_bid_id' => $bid->id,
            ]);

            $bid->update(['status' => 'accepted']);

            \App\Models\Bid::where('job_id', $job->id)
                ->where('id', '!=', $bid->id)
                ->update(['status' => 'rejected']);
        });

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