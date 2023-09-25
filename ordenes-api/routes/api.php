<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\V1\EmpresaController;
use App\Http\Controllers\V1\RolController;
use App\Http\Controllers\V1\UsuarioController as UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

/*Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});*/

Route::prefix('v1')->group(function () {
    // Configuracion
    Route::controller(EmpresaController::class)->group(function() {
        Route::get('empresas','index');
        Route::get('empresa/{id}','show');
        Route::put('empresa/{id}','update');
    });

    Route::controller(RolController::class)->group(function() {
        Route::get('roles/{empresa}','index');
        Route::get('rol/{empresa}/{id}','show');
        Route::post('rol/create','store');
        Route::put('rol/{empresa}/{id}','update');
        Route::delete('rol/{empresa}/{id}','destroy');
    });

    Route::controller(UserController::class)->group(function() {
        Route::get('users/{empresa}','index');
        Route::get('user/{empresa}/{id}','show');
        Route::post('users/create','store');
        Route::put('user/{empresa}/{id}','update');
        Route::delete('user/{empresa}/{id}','destroy');
    });
});