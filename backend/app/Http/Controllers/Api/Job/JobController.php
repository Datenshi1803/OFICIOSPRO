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
}