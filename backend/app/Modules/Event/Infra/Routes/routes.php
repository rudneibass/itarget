<?php 

use Illuminate\Support\Facades\Route;

$registration = '/module-registration';
Route::post($registration.'/create', 'App\Modules\Api\Infra\Controllers\Registration\CreateRegistrationController@index');
Route::put($registration.'/update/{id}', 'App\Modules\Api\Infra\Controllers\Registration\UpdateRegistrationController@index');
Route::get($registration.'/paginate', 'App\Modules\Api\Infra\Controllers\Registration\PaginateRegistrationController@index');
Route::get($registration.'/list', 'App\Modules\Api\Infra\Controllers\Registration\ListRegistrationController@index');
Route::get($registration.'/get/{id}', 'App\Modules\Api\Infra\Controllers\Registration\GetRegistrationController@index');
Route::get($registration.'/search', 'App\Modules\Api\Infra\Controllers\Registration\PaginateRegistrationController@index');
Route::get($registration.'/form/create', 'App\Modules\Api\Infra\Controllers\Registration\GetRegistrationFormController@index');
Route::get($registration.'/form/edit', 'App\Modules\Api\Infra\Controllers\Registration\GetRegistrationFormEditController@index');
