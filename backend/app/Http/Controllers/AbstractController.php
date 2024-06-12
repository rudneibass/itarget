<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;

use App\Http\Requests\Registration\RegistrationCreateRequest;
use App\Http\Requests\Registration\RegistrationUpdateRequest;
use Exception;

abstract class AbstractController extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected $service;
    
    protected  $responseData;
    protected int $responseHttpStatus;
    protected string $responseMessage;

    public function list(){
       return $this->executeAction(function(){
            return $this->service->list();
        });
    }

    public function get($id){
        return $this->executeAction(function() use ($id){
            return $this->service->get((int)$id);
        });
    }

    public function findByParams(Request $request){
        return $this->executeAction(function() use ($request){
            return $this->service->findByParams($request->all());
        });
    }

    public function create(RegistrationCreateRequest $request){
        return $this->executeAction(function() use ($request){
            return $this->service->create($request->validated());
        });
    }

    public function update(Request $request, int $id){
        return $this->executeAction(function() use ($request, $id){
            return $this->service->update($request->all(), $id);
        });  
    }
    
    public function delete(int $id){
        return $this->executeAction(function() use ($id){
            return $this->service->delete($id);
        });
    }

    private function executeAction(callable $action){
        try{
            $this->responseData = $action();
            $this->responseHttpStatus = 200;
            $this->responseMessage = '200';

        }catch (Exception $e){
            $this->responseData = [];
            $this->responseHttpStatus = 500;
            $this->responseMessage = 'Erro ao tentar realizar operação. Exeption: '.$e->getMessage();
        }

        return response()->json([
            'response_message' => $this->responseMessage,
            'response_data' => $this->responseData,
        ], $this->responseHttpStatus);
    }
}
