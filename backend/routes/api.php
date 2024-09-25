<?php

use Illuminate\Support\Facades\Route;

$registrationPath = '/registration';
Route::get($registrationPath.'/list', 'App\AppModules\Api\Infra\Controllers\$registrationPath\List$registrationPathController@index');
Route::get($registrationPath.'/get/{id}', 'App\AppModules\Api\Infra\Controllers\$registrationPath\Get$registrationPathController@index');
Route::post($registrationPath.'/create', 'App\AppModules\Api\Infra\Controllers\$registrationPath\Create$registrationPathController@index');
Route::post($registrationPath.'/paginate', 'App\AppModules\Api\Infra\Controllers\$registrationPath\Paginate$registrationPathController@index');
Route::get($registrationPath.'/search', 'App\AppModules\Api\Infra\Controllers\$registrationPath\Paginate$registrationPathController@index');
Route::get($registrationPath.'/form', 'App\AppModules\Api\Infra\Controllers\$registrationPath\Get$registrationPathFormController@index');
Route::get($registrationPath.'/form/edit/{id}', 'App\AppModules\Api\Infra\Controllers\$registrationPath\Get$registrationPathFormEditController@index');

$formPath = '/form';
Route::get($formPath.'/name/{name}', 'App\AppModules\Api\Infra\Controllers\Form\GetFormController@index');
