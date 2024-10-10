<?php

use Illuminate\Support\Facades\Route;

$form = '/form';
Route::get($form.'/name/{name}', 'App\AppModules\Api\Infra\Controllers\Form\GetFormController@index');
Route::get($form.'/list', 'App\AppModules\Api\Infra\Controllers\Form\ListFormController@index');
Route::get($form.'/search', 'App\AppModules\Api\Infra\Controllers\Form\PaginateFormController@index');
Route::get($form.'/create', 'App\AppModules\Api\Infra\Controllers\Form\GetFormCreateController@index');
Route::get($form.'/edit', 'App\AppModules\Api\Infra\Controllers\Form\GetFormEditController@index');
Route::get($form.'form/create', 'App\AppModules\Api\Infra\Controllers\Form\GetFormCreateController@index');
Route::get($form.'form/edit', 'App\AppModules\Api\Infra\Controllers\Form\GetFormEditController@index');

$formField = '/formField';
Route::get($formField.'/list', 'App\AppModules\Api\Infra\Controllers\FormField\ListFormFieldController@index');
Route::get($formField.'/get/{id}', 'App\AppModules\Api\Infra\Controllers\FormField\GetFormFieldController@index');
Route::post($formField.'/create', 'App\AppModules\Api\Infra\Controllers\FormField\CreateFormFieldController@index');
Route::post($formField.'/paginate', 'App\AppModules\Api\Infra\Controllers\FormField\PaginateFormFieldController@index');
Route::get($formField.'/search', 'App\AppModules\Api\Infra\Controllers\FormField\PaginateFormFieldController@index');
Route::get($formField.'/form/create', 'App\AppModules\Api\Infra\Controllers\FormField\GetFormFieldFormController@index');
Route::get($formField.'/form/edit', 'App\AppModules\Api\Infra\Controllers\FormField\GetFormFieldFormEditController@index');

$registration = '/registration';
Route::get($registration.'/list', 'App\AppModules\Api\Infra\Controllers\Registration\ListRegistrationController@index');
Route::get($registration.'/get/{id}', 'App\AppModules\Api\Infra\Controllers\Registration\GetRegistrationController@index');
Route::post($registration.'/create', 'App\AppModules\Api\Infra\Controllers\Registration\CreateRegistrationController@index');
Route::post($registration.'/paginate', 'App\AppModules\Api\Infra\Controllers\Registration\PaginateRegistrationController@index');
Route::get($registration.'/search', 'App\AppModules\Api\Infra\Controllers\Registration\PaginateRegistrationController@index');
Route::get($registration.'/form/create', 'App\AppModules\Api\Infra\Controllers\Registration\GetRegistrationFormController@index');
Route::get($registration.'/form/edit', 'App\AppModules\Api\Infra\Controllers\Registration\GetRegistrationFormEditController@index');




