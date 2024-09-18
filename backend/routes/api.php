<?php

use Illuminate\Support\Facades\Route;

const REGISTRATION = '/registration';
Route::get(REGISTRATION.'/list', 'App\AppModules\Api\Infra\Controllers\Registration\ListRegistrationController@index');
Route::get(REGISTRATION.'/get/{id}', 'App\AppModules\Api\Infra\Controllers\Registration\GetRegistrationController@index');
Route::post(REGISTRATION.'/create', 'App\AppModules\Api\Infra\Controllers\Registration\CreateRegistrationController@index');
Route::post(REGISTRATION.'/paginate', 'App\AppModules\Api\Infra\Controllers\Registration\PaginateRegistrationController@index');
Route::get(REGISTRATION.'/search', 'App\AppModules\Api\Infra\Controllers\Registration\PaginateRegistrationController@index');
Route::get(REGISTRATION.'/form', 'App\AppModules\Api\Infra\Controllers\Registration\GetRegistrationFormController@index');
Route::get(REGISTRATION.'/form/edit/{id}', 'App\AppModules\Api\Infra\Controllers\Registration\GetRegistrationFormEditController@index');

const FORM = '/form';
Route::get(FORM.'/name/{name}', 'App\AppModules\Api\Infra\Controllers\Form\GetFormController@index');
