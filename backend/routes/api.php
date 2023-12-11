<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventsController;
use App\Http\Controllers\RegistrationsController;

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

#run `php artisan route:list` to show full routes
Route::apiResource('events', EventsController::class);

Route::get('registrations/search/{name}', [RegistrationsController::class, 'search']);
Route::apiResource('registrations', RegistrationsController::class);

#Route::controller(EventsController::class)->group(function(){
#    Route::get('/events', 'index');
#    Route::get('/events/search/{search_param}', 'search');
#    Route::get('/events/show/{id}', 'show');
#    Route::post('/events/store', 'store');
#    Route::put('/events/update/{id}', 'update');
#    Route::delete('/events/destroy/{id}', 'destroy');
#});
