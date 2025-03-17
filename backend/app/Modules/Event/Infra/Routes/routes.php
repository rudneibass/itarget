<?php

use Illuminate\Support\Facades\Route;
 
$eventModulePath = '\Event';

$registrationEntityPath = '\Registration';
$registrationEntityName = 'Registration';
$registrationPath = '/registration';

Route::get($registrationPath.'/list', 'App\Modules'.$eventModulePath.'\Infra\Controllers'.$registrationEntityPath.'\List'.$registrationEntityName.'Controller@handle');
Route::get($registrationPath.'/search', 'App\Modules'.$eventModulePath.'\Infra\Controllers'.$registrationEntityPath.'\Paginate'.$registrationEntityName.'Controller@handle');