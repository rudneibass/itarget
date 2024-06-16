<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class CreateModule extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'create:module {name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new module with routes, controller, service, and repository';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $name = $this->argument('name');
        $this->createRoutes($name);
        $this->createController($name);
        $this->createService($name);
        $this->createRepository($name);
        $this->createModel($name);

        $this->info("Module $name created successfully!");

        return 0;
    }

    protected function createRoutes($name)
    {
        $routesPath = base_path('routes/api.php');
        $name = strtolower($name);
        $routeContent =
"Route::prefix('$name')->group(function(){
    Route::controller({$name}Controller::class)->group(function(){
        Route::get('/list', 'list');
        Route::get('/paginate/{itemsPerPage}', 'paginate');
        Route::get('/get/{id}', 'get');
        Route::post('/search', 'findByParams');
        Route::post('/create', 'create');
        Route::put('/update/{id}', 'update');
        Route::delete('/delete/{id}', 'delete');
    });
});";

        File::append($routesPath, $routeContent);
        $this->info("Routes for $name added to routes/api.php");
    }

    protected function createController($name)
    {
        $nameLowerCase = strtolower($name);
        $nameCamelCase =  lcfirst($name);

        $controllerPath = app_path("Http/Controllers/{$nameCamelCase}Controller.php");
        $controllerTemplate = 
"<?php

namespace App\Http\Controllers;

use App\Services\Registration\\{$nameCamelCase}Service;

class {$nameCamelCase}Controller extends AbstractController
{
    protected \$service;
    protected \$createRequest;
    protected \$updateRequest;

    public function __construct(){
        \$this->service = new {$nameCamelCase}Service;
    }
}";

        File::put($controllerPath, $controllerTemplate);
        $this->info("Controller for $name created at app/Http/Controllers/{$nameCamelCase}Controller.php");
    }

    protected function createService($name)
    {
        $nameLowerCase = strtolower($name);
        $nameCamelCase =  lcfirst($name);

        $serviceDirectory = app_path("Services/$nameCamelCase");
        File::makeDirectory($serviceDirectory, 0755, true);

        $servicePath = "$serviceDirectory/{$nameCamelCase}Service.php";
        $serviceTemplate = 
"<?php

declare(strict_types=1);
namespace App\Services\Registration;

use App\Services\AbstractService;
use App\Repositories\\{$nameCamelCase}Repository;

class {$nameCamelCase}Service extends AbstractService
{
    protected \$repository;

    public function __construct(){
        \$this->repository = new {$nameCamelCase}Repository;
    }
}";

        File::put($servicePath, $serviceTemplate);
        $this->info("Service for $name created at app/Services/$nameCamelCase/{$nameCamelCase}Service.php");
    }

    protected function createRepository($name)
    {
        $nameLowerCase = strtolower($name);
        $nameCamelCase =  lcfirst($name);
        $repositoryPath = app_path("Repositories/{$nameCamelCase}Repository.php");
        $repositoryTemplate = 
"<?php

declare(strict_types=1);
namespace App\Repositories;

use Illuminate\Support\Facades\DB;
use App\Models\\{$nameCamelCase};

class {$nameCamelCase}Repository extends AbstractRepository
{
    public function __construct() {
        parent::__construct(new {$nameCamelCase});
    }
}";

        File::put($repositoryPath, $repositoryTemplate);
        $this->info("Repository for $name created at app/Repositories/{$nameCamelCase}Repository.php");
    }

    protected function createModel($name)
    {
        $nameLowerCase = strtolower($name);
        $nameCamelCase =  lcfirst($name);
        $modelPath = app_path("Models/{$name}.php");
        $modelTemplate =   
"<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class {$nameCamelCase} extends Model
{
    use HasFactory;
    protected \$table='{$nameLowerCase}';
    protected \$fillable = [''];
    protected \$hidden = [''];
    protected \$casts = [''];
}";

        File::put($modelPath, $modelTemplate);
        $this->info("Model for $name created at app/Models/{$nameCamelCase}.php");
    }    
}
