<?php

use Illuminate\Support\Facades\Route;

require_once app_path('Modules/Form/Infra/Routes/routes.php');
require_once app_path('Modules/Event/Infra/Routes/routes.php');

$registrationRoutePath = '/registration';
$registrationModulePath = 'Api';
Route::post($registrationRoutePath.'/create', 'App\Modules\\'.$registrationModulePath.'\Infra\Controllers\Registration\CreateRegistrationController@index');
Route::put($registrationRoutePath.'/update/{id}', 'App\Modules\\'.$registrationModulePath.'\Infra\Controllers\Registration\UpdateRegistrationController@index');
Route::get($registrationRoutePath.'/paginate', 'App\Modules\\'.$registrationModulePath.'\Infra\Controllers\Registration\PaginateRegistrationController@index');
Route::get($registrationRoutePath.'/list', 'App\Modules\\'.$registrationModulePath.'\Infra\Controllers\Registration\ListRegistrationController@index');
Route::get($registrationRoutePath.'/get/{id}', 'App\Modules\\'.$registrationModulePath.'\Infra\Controllers\Registration\GetRegistrationController@index');
Route::get($registrationRoutePath.'/search', 'App\Modules\\'.$registrationModulePath.'\Infra\Controllers\Registration\PaginateRegistrationController@index');
Route::get($registrationRoutePath.'/form/create', 'App\Modules\\'.$registrationModulePath.'\Infra\Controllers\Registration\GetRegistrationFormController@index');
Route::get($registrationRoutePath.'/form/edit', 'App\Modules\\'.$registrationModulePath.'\Infra\Controllers\Registration\GetRegistrationFormEditController@index');


# Criado na mão
//require_once app_path('Modules/Acl/Routes/routes.php');

# Criado com o comando CreateModuleEntity
# require_once app_path('Modules/Acl/User/Routes/routes.php');

/*
$formRoutePath = '/form';
$formModulePath = 'Api';
Route::put($formRoutePath.'/update/{id}', 'App\Modules\\'.$formModulePath.'\Infra\Controllers\Form\UpdateFormController@index');
Route::get($formRoutePath.'/name/{name}', 'App\Modules\\'.$formModulePath.'\Infra\Controllers\Form\GetFormController@index');
Route::get($formRoutePath.'/list', 'App\Modules\\'.$formModulePath.'\Infra\Controllers\Form\ListFormController@index');
Route::get($formRoutePath.'/search', 'App\Modules\\'.$formModulePath.'\Infra\Controllers\Form\PaginateFormController@index');
Route::get($formRoutePath.'/form/create', 'App\Modules\\'.$formModulePath.'\Infra\Controllers\Form\GetFormCreateController@index');
Route::get($formRoutePath.'/form/edit', 'App\Modules\\'.$formModulePath.'\Infra\Controllers\Form\GetFormEditController@index');

$formFieldRoutePath = '/formField';
$formFieldModulePath = 'Api';
Route::post($formFieldRoutePath.'/create', 'App\Modules\\'.$formFieldModulePath.'\Infra\Controllers\FormField\CreateFormFieldController@index');
Route::put($formFieldRoutePath.'/update/{id}', 'App\Modules\\'.$formFieldModulePath.'\Infra\Controllers\FormField\UpdateFormFieldController@index');
Route::get($formFieldRoutePath.'/paginate', 'App\Modules\\'.$formFieldModulePath.'\Infra\Controllers\FormField\PaginateFormFieldController@index');
Route::get($formFieldRoutePath.'/list', 'App\Modules\\'.$formFieldModulePath.'\Infra\Controllers\FormField\ListFormFieldController@index');
Route::get($formFieldRoutePath.'/get/{id}', 'App\Modules\\'.$formFieldModulePath.'\Infra\Controllers\FormField\GetFormFieldController@index');
Route::get($formFieldRoutePath.'/search', 'App\Modules\\'.$formFieldModulePath.'\Infra\Controllers\FormField\PaginateFormFieldController@index');
Route::get($formFieldRoutePath.'/form/create', 'App\Modules\\'.$formFieldModulePath.'\Infra\Controllers\FormField\GetFormFieldFormController@index');
Route::get($formFieldRoutePath.'/form/edit', 'App\Modules\\'.$formFieldModulePath.'\Infra\Controllers\FormField\GetFormFieldFormEditController@index');
*/


