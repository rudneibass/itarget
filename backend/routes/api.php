<?php

use Illuminate\Support\Facades\Route;

Route::get('/registration/list', 'App\AppModules\Api\Infra\Controllers\Registration\ListRegistrationController@index');

Route::get('/registration/{id}', 'App\AppModules\Api\Infra\Controllers\Registration\GetRegistrationController@index');

Route::post('/registration/create', 'App\AppModules\Api\Infra\Controllers\Registration\CreateRegistrationController@index');

Route::post('/registration/paginate', 'App\AppModules\Api\Infra\Controllers\Registration\PaginateRegistrationController@index');



/*
use App\AppModules\Api\Infra\Controllers\RegistrationController;
Route::prefix('registration')->group(function(){
    Route::controller(RegistrationController::class)->group(function(){
        # Default routes
        Route::get('/', 'list');
        Route::get('/doc', 'doc');
        Route::get('/list', 'list');
        Route::get('/id/{id}', 'getById');
        Route::get('/paginate/{itemsPerPage}', 'paginate');
        Route::get('/form/{formName}', 'getFormWithFields');
        Route::get('/edit/{formName}/{id}', 'getFormWithFieldsAndValues');
        
        Route::put('/update/{id}', 'update');
        Route::post('/create', 'create');
        Route::delete('/delete/{id}', 'delete');
        
        # Custom routes
        Route::get('/search', 'search');
    });
});
*/
