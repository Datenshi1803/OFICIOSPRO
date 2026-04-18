<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TestController;
use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\User\UserController;
use App\Http\Controllers\Api\Job\JobController;
use App\Http\Controllers\Api\Bid\BidController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::get('/test', [TestController::class, 'index']);

// Autenticación
Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

//  Usuarios
Route::apiResource('users', UserController::class);

//  Trabajos
Route::apiResource('jobs', JobController::class);

//  Cotizaciones
Route::apiResource('bids', BidController::class);