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


$fieldEntityPath = '/field';
$fieldEntity = 'Field';
Route::post($fieldEntityPath.'/create', 'App\Modules\\'.$modulePath.'\Infra\Controllers\\'.$fieldEntity.'\Create'.$fieldEntity.'Controller@handle');
Route::get($fieldEntityPath.'/name/{name}', 'App\Modules\\'.$modulePath.'\Infra\Controllers\\'.$fieldEntity.'\Get'.$fieldEntity.'Controller@handle');
Route::get($fieldEntityPath.'/list', 'App\Modules\\'.$modulePath.'\Infra\Controllers\\'.$fieldEntity.'\List'.$fieldEntity.'Controller@handle');
Route::get($fieldEntityPath.'/search', 'App\Modules\\'.$modulePath.'\Infra\Controllers\\'.$fieldEntity.'\Paginate'.$fieldEntity.'Controller@handle');
Route::put($fieldEntityPath.'/update/{id}', 'App\Modules\\'.$modulePath.'\Infra\Controllers\\'.$fieldEntity.'\Update'.$fieldEntity.'Controller@handle');
Route::get($fieldEntityPath.'/form/create', 'App\Modules\\'.$modulePath.'\Infra\Controllers\\'.$fieldEntity.'\Get'.$fieldEntity.'CreateFormController@handle');
Route::get($fieldEntityPath.'/form/edit', 'App\Modules\\'.$modulePath.'\Infra\Controllers\\'.$fieldEntity.'\Get'.$fieldEntity.'EditFormController@handle');