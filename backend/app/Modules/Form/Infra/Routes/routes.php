<?php

use Illuminate\Support\Facades\Route;

$form = '/module-form';
Route::put($form.'/update/{id}', 'App\Modules\Form\Infra\Controllers\Form\UpdateFormController@index');
Route::get($form.'/name/{name}', 'App\Modules\Form\Infra\Controllers\Form\GetFormController@index');
Route::get($form.'/list', 'App\Modules\Form\Infra\Controllers\Form\ListFormController@index');
Route::get($form.'/search', 'App\Modules\Form\Infra\Controllers\Form\PaginateFormController@index');
Route::get($form.'/form/create', 'App\Modules\Form\Infra\Controllers\Form\GetFormCreateController@index');
Route::get($form.'/form/edit', 'App\Modules\Form\Infra\Controllers\Form\GetFormEditController@index');

$formField = '/module-formField';
Route::post($formField.'/create', 'App\Modules\Form\Infra\Controllers\FormField\CreateFormFieldController@index');
Route::put($formField.'/update/{id}', 'App\Modules\Form\Infra\Controllers\FormField\UpdateFormFieldController@index');
Route::get($formField.'/paginate', 'App\Modules\Form\Infra\Controllers\FormField\PaginateFormFieldController@index');
Route::get($formField.'/list', 'App\Modules\Form\Infra\Controllers\FormField\ListFormFieldController@index');
Route::get($formField.'/get/{id}', 'App\Modules\Form\Infra\Controllers\FormField\GetFormFieldController@index');
Route::get($formField.'/search', 'App\Modules\Form\Infra\Controllers\FormField\PaginateFormFieldController@index');
Route::get($formField.'/form/create', 'App\Modules\Form\Infra\Controllers\FormField\GetFormFieldFormController@index');
Route::get($formField.'/form/edit', 'App\Modules\Form\Infra\Controllers\FormField\GetFormFieldFormEditController@index');
