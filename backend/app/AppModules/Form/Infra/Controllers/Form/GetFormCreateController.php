<?php

namespace App\AppModules\Form\Infra\Controllers\Form;

use App\AppModules\Form\Infra\Repositories\Form\Database\FormRepository;
use App\AppModules\Form\Domain\UseCases\Form\GetFormCreate\GetFormCreate;
use App\AppModules\Form\Infra\Controllers\BaseController;
use Illuminate\Http\Request;

class GetFormCreateController extends BaseController {
    public function index(Request $request) {
        return $this->executeAction(function() use ($request){
            $useCase = new  GetFormCreate(new FormRepository ); 
            return $useCase->execute($request->get('form_name', null));
        });
    }
}
