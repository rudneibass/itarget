<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegistrationController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('registrations')->group(function(){
    Route::controller(RegistrationController::class)->group(function(){
        Route::get('/list', 'list');
        Route::get('/get/{id}', 'get');
        Route::post('/search', 'findByParams');
        Route::post('/create', 'create');
        Route::put('/update/{id}', 'update');
        Route::delete('/delete/{id}', 'delete');
    });
});

