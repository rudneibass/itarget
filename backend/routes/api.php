<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

use App\Http\Controllers\Api\RegistrationController;
Route::prefix('registration')->group(function(){
    Route::controller(RegistrationController::class)->group(function(){
        # Default routes
        Route::get('/', 'list');
        Route::get('/list', 'list');
        Route::get('/paginate/{itemsPerPage}', 'paginate');
        Route::get('/get/{id}', 'get');
        Route::get('/doc', 'doc');
        Route::get('/metadata/{id}', 'getMetadata');
        Route::put('/update/{id}', 'update');
        Route::post('/create', 'create');
        Route::delete('/delete/{id}', 'delete');
        
        # Custom routes
        Route::post('/search', 'search');
    });
});

use App\Http\Controllers\Api\EventController;
Route::prefix('event')->group(function(){
    Route::controller(EventController::class)->group(function(){
        # Default routes
        Route::get('/', 'list');
        Route::get('/list', 'list');
        Route::get('/paginate/{itemsPerPage}', 'paginate');
        Route::get('/get/{id}', 'get');
        Route::get('/doc', 'doc');
        Route::get('/metadata/{id}', 'getMetadata');
        Route::put('/update/{id}', 'update');
        Route::post('/create', 'create');
        Route::delete('/delete/{id}', 'delete');

         # Custom routes
         Route::post('/search', 'search');
    });
});


use App\Http\Controllers\Api\FormController;
Route::prefix('form')->group(function(){
    Route::controller(FormController::class)->group(function(){
        # Default routes
        Route::get('/', 'list');
        Route::get('/list', 'list');
        Route::get('/paginate/{itemsPerPage}', 'paginate');
        Route::get('/get/{id}', 'get');
        Route::get('/doc', 'doc');
        Route::get('/metadata/{id}', 'getMetadata');
        Route::put('/update/{id}', 'update');
        Route::post('/create', 'create');
        Route::delete('/delete/{id}', 'delete');

        # Custom routes
    });
});


