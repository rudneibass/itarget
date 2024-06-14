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

        $this->info("Module $name created successfully!");

        return 0;
    }

    protected function createRoutes($name)
    {
        $routesPath = base_path('routes/api.php');
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
        $controllerPath = app_path("Http/Controllers/{$name}Controller.php");
        $controllerTemplate = 
        "<?php

            namespace App\Http\Controllers;

            use App\Services\Registration\\{$name}Service;

            class {$name}Controller extends AbstractController
            {
                protected \$service;

                public function __construct(){
                    \$this->service = new {$name}Service;
                }
            }
        ";

        File::put($controllerPath, $controllerTemplate);
        $this->info("Controller for $name created at app/Http/Controllers/{$name}Controller.php");
    }

    protected function createService($name)
    {
        $serviceDirectory = app_path("Services/Registration/$name");
        File::makeDirectory($serviceDirectory, 0755, true);

        $servicePath = "$serviceDirectory/{$name}Service.php";
        $serviceTemplate = 
        "<?php

            declare(strict_types=1);
            namespace App\Services\Registration;

            use App\Services\AbstractService;
            use App\Repositories\\{$name}Repository;

            class {$name}Service extends AbstractService
            {
                protected \$repository;

                public function __construct(){
                    \$this->repository = new {$name}Repository;
                }
            }
        ";

        File::put($servicePath, $serviceTemplate);
        $this->info("Service for $name created at app/Services/Registration/$name/{$name}Service.php");
    }

    protected function createRepository($name)
    {
        $repositoryPath = app_path("Repositories/{$name}Repository.php");
        $repositoryTemplate = 
        "<?php

            declare(strict_types=1);
            namespace App\Repositories;

            use Illuminate\Support\Facades\DB;
            use App\Models\\{$name};

            class {$name}Repository extends AbstractRepository
            {
                public function __construct() {
                    parent::__construct(new {$name});
                }
            }
        ";

        File::put($repositoryPath, $repositoryTemplate);
        $this->info("Repository for $name created at app/Repositories/{$name}Repository.php");
    }
}
