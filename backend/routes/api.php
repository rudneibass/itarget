<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

#php artisan route:list

Route::apiResource('events', EventsController::class);

#Route::controller(EventsController::class)->group(function(){
#    Route::get('/events', 'index');
#    Route::get('/events/search/{search_param}', 'search');
#    Route::get('/events/show/{id}', 'show');
#    Route::post('/events/store', 'store');
#    Route::put('/events/update/{id}', 'update');
#    Route::delete('/events/destroy/{id}', 'destroy');
#});
