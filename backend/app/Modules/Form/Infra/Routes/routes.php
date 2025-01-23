<?php

use Illuminate\Support\Facades\Route;

$formRoutePath = '/form';
$formModulePath = 'Form';

Route::get($formRoutePath.'/name/{name}', 'App\Modules\\'.$formModulePath.'\Infra\Controllers\Form\GetFormController@handle');
Route::get($formRoutePath.'/list', 'App\Modules\\'.$formModulePath.'\Infra\Controllers\Form\ListFormController@handle');
Route::get($formRoutePath.'/search', 'App\Modules\\'.$formModulePath.'\Infra\Controllers\Form\PaginateFormController@handle');
Route::put($formRoutePath.'/update/{id}', 'App\Modules\\'.$formModulePath.'\Infra\Controllers\Form\UpdateFormController@handle');
Route::get($formRoutePath.'/form/create', 'App\Modules\\'.$formModulePath.'\Infra\Controllers\Form\GetFormCreateController@handle');

Route::get($formRoutePath.'/form/edit', 'App\Modules\\'.$formModulePath.'\Infra\Controllers\Form\GetFormEditController@handle');
