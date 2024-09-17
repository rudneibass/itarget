<?php

use Illuminate\Support\Facades\Route;

Route::get('/registration/list', 'App\AppModules\Api\Infra\Controllers\Registration\ListRegistrationController@index');
Route::get('/registration/{id}', 'App\AppModules\Api\Infra\Controllers\Registration\GetRegistrationController@index');
Route::post('/registration/create', 'App\AppModules\Api\Infra\Controllers\Registration\CreateRegistrationController@index');
Route::post('/registration/paginate', 'App\AppModules\Api\Infra\Controllers\Registration\PaginateRegistrationController@index');
Route::get('/registration/get/form', 'App\AppModules\Api\Infra\Controllers\Registration\GetRegistrationFormController@index');

Route::get('/form/name/{name}', 'App\AppModules\Api\Infra\Controllers\Form\GetFormController@index');
