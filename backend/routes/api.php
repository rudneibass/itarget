<?php



require_once app_path('Modules/Form/Infra/Routes/routes.php');
require_once app_path('Modules/Acl/Routes/routes.php');


use Illuminate\Support\Facades\Route;

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




