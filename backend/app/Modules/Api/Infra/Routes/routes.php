<?php
use Illuminate\Support\Facades\Route;

$apiModulePath = '\Api';

$registrationRoutePath = '/registration';
$registrationEntity = 'Registration';
Route::get($registrationRoutePath.'/paginate', 'App\Modules'.$apiModulePath.'\Infra\Controllers\Registration\PaginateRegistrationController@index');
Route::get($registrationRoutePath.'/list', 'App\Modules'.$apiModulePath.'\Infra\Controllers\Registration\ListRegistrationController@index');
Route::get($registrationRoutePath.'/get/{id}', 'App\Modules'.$apiModulePath.'\Infra\Controllers\Registration\GetRegistrationController@index');
Route::get($registrationRoutePath.'/search', 'App\Modules'.$apiModulePath.'\Infra\Controllers\Registration\PaginateRegistrationController@index');
Route::get($registrationRoutePath.'/form/create', 'App\Modules'.$apiModulePath.'\Infra\Controllers\Registration\GetRegistrationFormController@index');
Route::get($registrationRoutePath.'/form/edit', 'App\Modules'.$apiModulePath.'\Infra\Controllers\Registration\GetRegistrationFormEditController@index');
Route::post($registrationRoutePath.'/create', 'App\Modules'.$apiModulePath.'\Infra\Controllers\Registration\CreateRegistrationController@index');
Route::put($registrationRoutePath.'/update/{id}', 'App\Modules'.$apiModulePath.'\Infra\Controllers\Registration\UpdateRegistrationController@index');
