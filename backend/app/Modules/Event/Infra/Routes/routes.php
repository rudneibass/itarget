<?php

use Illuminate\Support\Facades\Route;
 
$eventModulePath = '\Event';

$registrationPath = '/registration';
$registrationEntityPath = '\Registration';
$registrationEntityName = 'Registration';

//Route::get($registrationPath.'/list', 'App\Modules\Event\Infra\Controllers\Registration\ListRegistrationController@handle');

Route::get($registrationPath.'/list', 'App\Modules'.$eventModulePath.'\Infra\Controllers'.$registrationEntityPath.'\List'.$registrationEntityName.'Controller@handle');
Route::get($registrationPath.'/search', 'App\Modules'.$eventModulePath.'\Infra\Controllers'.$registrationEntityPath.'\Paginate'.$registrationEntityName.'Controller@handle');
Route::get($registrationPath.'/id/{id}', 'App\Modules'.$eventModulePath.'\Infra\Controllers'.$registrationEntityPath.'\Get'.$registrationEntityName.'Controller@handle');
Route::get($registrationPath.'/form/create', 'App\Modules'.$eventModulePath.'\Infra\Controllers'.$registrationEntityPath.'\Get'.$registrationEntityName.'CreateController@handle');
Route::get($registrationPath.'/form/edit/id/{id}', 'App\Modules'.$eventModulePath.'\Infra\Controllers'.$registrationEntityPath.'\Get'.$registrationEntityName.'EditController@handle');

Route::put($registrationPath.'/update/id/{id}', 'App\Modules'.$eventModulePath.'\Infra\Controllers'.$registrationEntityPath.'\Update'.$registrationEntityName.'Controller@handle');
Route::post($registrationPath.'/create', 'App\Modules'.$eventModulePath.'\Infra\Controllers'.$registrationEntityPath.'\Create'.$registrationEntityName.'Controller@handle');