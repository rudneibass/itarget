<?php

use Illuminate\Support\Facades\Route;

use App\Modules\Acl\Controllers\User\UserController;
Route::prefix('user')->group(function(){
    Route::controller(UserController::class)->group(function(){
        # Default routes
            Route::get('/', 'getAll');
            Route::get('/all', 'getAll');
            Route::get('/list', 'getAll');
            Route::get('/doc', 'getDoc');
            Route::get('/id/{id}', 'getById');
            Route::get('/paginate/{itemsPerPage}', 'paginate');
            Route::get('/all/paginate/{itemsPerPage}', 'paginate');
            Route::get('/form-create/{formName}', 'getFormCreate');
            Route::get('/form-edit/{formName}/{id}', 'getFormEdit');

            Route::put('/update/{id}', 'update');
            Route::post('/create', 'create');
            Route::delete('/delete/{id}', 'delete');
        
        # Custom routes
            Route::get('/search', 'search');
    });
});