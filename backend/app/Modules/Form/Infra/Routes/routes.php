<?php

use Illuminate\Support\Facades\Route;
 
$modulePath = 'Form';

$formRoutePath = '/form';
$formEntity = 'Form';
Route::post($formRoutePath.'/create', 'App\Modules\\'.$modulePath.'\Infra\Controllers\\'.$formEntity.'\CreateFormController@handle');
Route::get($formRoutePath.'/name/{name}', 'App\Modules\\'.$modulePath.'\Infra\Controllers\Form\GetFormController@handle');
Route::get($formRoutePath.'/list', 'App\Modules\\'.$modulePath.'\Infra\Controllers\Form\ListFormController@handle');
Route::get($formRoutePath.'/search', 'App\Modules\\'.$modulePath.'\Infra\Controllers\Form\PaginateFormController@handle');
Route::put($formRoutePath.'/update/{id}', 'App\Modules\\'.$modulePath.'\Infra\Controllers\Form\UpdateFormController@handle');
Route::get($formRoutePath.'/form/create', 'App\Modules\\'.$modulePath.'\Infra\Controllers\Form\GetFormCreateController@handle');
Route::get($formRoutePath.'/form/edit', 'App\Modules\\'.$modulePath.'\Infra\Controllers\Form\GetFormEditController@handle');


$formFieldEntityPath = '/formField';
$formFieldEntity = 'FormField';
Route::post($formFieldEntityPath.'/create', 'App\Modules\\'.$modulePath.'\Infra\Controllers\\'.$formFieldEntity.'\Create'.$formFieldEntity.'Controller@handle');
Route::get($formFieldEntityPath.'/name/{name}', 'App\Modules\\'.$modulePath.'\Infra\Controllers\\'.$formFieldEntity.'\Get'.$formFieldEntity.'Controller@handle');
Route::get($formFieldEntityPath.'/list', 'App\Modules\\'.$modulePath.'\Infra\Controllers\\'.$formFieldEntity.'\List'.$formFieldEntity.'Controller@handle');
Route::get($formFieldEntityPath.'/search', 'App\Modules\\'.$modulePath.'\Infra\Controllers\\'.$formFieldEntity.'\Paginate'.$formFieldEntity.'Controller@handle');
Route::put($formFieldEntityPath.'/update/{id}', 'App\Modules\\'.$modulePath.'\Infra\Controllers\\'.$formFieldEntity.'\Update'.$formFieldEntity.'Controller@handle');

Route::get($formFieldEntityPath.'/form/create', 'App\Modules\\'.$modulePath.'\Infra\Controllers\\'.$formFieldEntity.'\GetFormCreateController@handle');
Route::get($formFieldEntityPath.'/form/edit', 'App\Modules\\'.$modulePath.'\Infra\Controllers\\'.$formFieldEntity.'\GetFormEditController@handle');