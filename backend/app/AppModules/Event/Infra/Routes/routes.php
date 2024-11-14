<?php 

use Illuminate\Support\Facades\Route;

$registration = '/module-registration';
Route::post($registration.'/create', 'App\AppModules\Api\Infra\Controllers\Registration\CreateRegistrationController@index');
Route::put($registration.'/update/{id}', 'App\AppModules\Api\Infra\Controllers\Registration\UpdateRegistrationController@index');
Route::get($registration.'/paginate', 'App\AppModules\Api\Infra\Controllers\Registration\PaginateRegistrationController@index');
Route::get($registration.'/list', 'App\AppModules\Api\Infra\Controllers\Registration\ListRegistrationController@index');
Route::get($registration.'/get/{id}', 'App\AppModules\Api\Infra\Controllers\Registration\GetRegistrationController@index');
Route::get($registration.'/search', 'App\AppModules\Api\Infra\Controllers\Registration\PaginateRegistrationController@index');
Route::get($registration.'/form/create', 'App\AppModules\Api\Infra\Controllers\Registration\GetRegistrationFormController@index');
Route::get($registration.'/form/edit', 'App\AppModules\Api\Infra\Controllers\Registration\GetRegistrationFormEditController@index');
