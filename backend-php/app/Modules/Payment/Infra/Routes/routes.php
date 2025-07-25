<?php

use Illuminate\Support\Facades\Route;
 
Route::post('payment/create', 'App\Modules\Payment\Infra\Controllers\Pix\GeneratePixController@handle');
