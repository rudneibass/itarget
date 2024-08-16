<?php

namespace App\Http\Controllers\Api;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

use Exception;

abstract class AbstractController extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected $service;
    protected $createRequest;
    protected $updateRequest;

    protected  $responseData;
    protected int $responseHttpStatus;

    protected function executeAction(callable $action){
        try{
            $this->responseData = $action();
            $this->responseHttpStatus = 200;

        }catch (ValidationException $e) {
            $this->responseData = $e->errors();
            $this->responseHttpStatus = 422;

        }catch (Exception $e){
            $this->responseData = $e->getMessage();
            $this->responseHttpStatus = 500;
        }

        return response()->json(
            $this->responseData,
            $this->responseHttpStatus
        );
    }

    public function list(){
       return $this->executeAction(function(){
            return $this->service->list();
        });
    }

    public function paginate(int $itemsPerPage){
        return $this->executeAction(function() use ($itemsPerPage){
             return $this->service->paginate($itemsPerPage);
         });
     }

    public function getById($id){
        return $this->executeAction(function() use ($id){
            return $this->service->getById((int)$id);
        });
    }

    public function update(Request $request, int $id){
        return $this->executeAction(function() use ($request, $id){
            $requestData = $request->all();
            if(isset($this->createRequest)){
                $this->createRequest->merge($request->all());
                $this->createRequest->validate($this->createRequest->rules());
            }
            return $this->service->update($requestData, $id);
        });  
    }
    
    public function delete(int $id){
        return $this->executeAction(function() use ($id){
            return $this->service->delete($id);
        });
    }

    public function create(Request $request)
    {
        return $this->executeAction(function() use ($request) {
            $requestData = $request->all();
            if(isset($this->createRequest)){
                $this->createRequest->merge($request->all());
                $this->createRequest->validate($this->createRequest->rules());
            }
            return $this->service->create($requestData);
        });
    }

    public function doc(){
        return $this->executeAction(function(){
            return $this->service->doc();
        });
    }

    public function getFormWithFields($formName){
        return $this->executeAction(function() use ($formName){
            return $this->service->getFormWithFields($formName);
        });
    }

    public function getFormWithFieldsAndValues($formName, $id){
        return $this->executeAction(function() use ($formName, $id){
            return $this->service->getFormWithFieldsAndValues($formName, $id);
        });
    }
}
