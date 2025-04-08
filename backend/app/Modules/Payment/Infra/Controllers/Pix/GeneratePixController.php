<?php

namespace App\Modules\Payment\Infra\Controllers\Pix;

use App\Modules\Payment\UseCases\GeneratePix\GeneratePix;

use App\Modules\Payment\Infra\Base\BaseController;
use App\Modules\Payment\Infra\Models\Pix;

use App\Modules\Payment\Infra\Adapters\CacheAdapter\CacheAdapter;
use App\Modules\Payment\Infra\Adapters\DatabaseAdapter\DatabaseAdapter;
use App\Modules\Payment\Infra\Adapters\ModelAdapter\ModelAdapter;
use App\Modules\Payment\Infra\Adapters\PixGatewayAdapter\PixGatewayAdapter;

use Illuminate\Http\Request;


class GeneratePixController extends BaseController {
    
    protected $createRequest;

    public function handle(Request $request) {
       
        return $this->executeAction(function() use ($request) {
     
            if(isset($this->createRequest)){
                $this->createRequest->merge($request->all());
                $this->createRequest->validate($this->createRequest->rules());
            }
            
            $useCase = new GeneratePix(
               modelAdapter: new ModelAdapter(new Pix()), 
               databaseAdapter: new DatabaseAdapter,
               cacheAdapter: new CacheAdapter,
               pixGatewayAdapter: new PixGatewayAdapter()
            );
            return $useCase->execute($request->all());
        });
    }
}
