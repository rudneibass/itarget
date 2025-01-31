<?php

namespace App\Modules\Event\Infra\Base;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller;
use Illuminate\Validation\ValidationException;

use Exception;

abstract class BaseController extends Controller
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected  $responseData;
    protected int $responseHttpStatus;

    protected function executeAction(callable $action){
        try{
            $this->responseData = $action();
            $this->responseHttpStatus = 200;

        } catch (ValidationException $e) {
            $this->responseData = $e->errors();
            $this->responseHttpStatus = 422;

        } catch (Exception $e){
            $this->responseData = $e->getMessage();
            $this->responseHttpStatus = 500;
        }

        return response()->json(
            $this->responseData,
            $this->responseHttpStatus
        );
    }
}
