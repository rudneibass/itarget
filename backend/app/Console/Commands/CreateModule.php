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
        $this->createMigration($name);

        $this->info("Module $name created successfully!");

        return 0;
    }

    protected function createRoutes($name)
    {
        $nameLowerCase = strtolower($name);

        $routesPath = base_path('routes/api.php');
        $routeContent =
"
use App\Http\Controllers\\{$name}Controller;
Route::prefix('$nameLowerCase')->group(function(){
    Route::controller({$name}Controller::class)->group(function(){
        # Default routes
        Route::get('/', 'list');
        Route::get('/list', 'list');
        Route::get('/paginate/{itemsPerPage}', 'paginate');
        Route::get('/get/{id}', 'get');
        Route::post('/create', 'create');
        Route::put('/update/{id}', 'update');
        Route::delete('/delete/{id}', 'delete');

        # Custom routes
    });
});

";
        File::append($routesPath, $routeContent);
        $this->info("Created routes for $name in routes/api.php");
    }

    protected function createController($name)
    {
       
        $controllerPath = app_path("Http/Controllers/{$name}Controller.php");
        $controllerTemplate = 
"<?php

namespace App\Http\Controllers;

use App\Services\\{$name}\\{$name}Service;

class {$name}Controller extends AbstractController
{
    protected \$service;
    protected \$createRequest;
    protected \$updateRequest;

    public function __construct(){
        \$this->service = new {$name}Service;
    }
}";

        File::put($controllerPath, $controllerTemplate);
        $this->info("Created app/Http/Controllers/{$name}Controller.php");
    }

    protected function createService($name)
    {
        $serviceDirectory = app_path("Services/$name");
        File::makeDirectory($serviceDirectory, 0755, true);
        $servicePath = "$serviceDirectory/{$name}Service.php";
        
        $serviceTemplate = 
"<?php

declare(strict_types=1);
namespace App\Services\\{$name};

use App\Services\AbstractService;
use App\Repositories\\{$name}Repository;

class {$name}Service extends AbstractService
{
    protected \$repository;

    public function __construct(){
        \$this->repository = new {$name}Repository;
    }
}";

        File::put($servicePath, $serviceTemplate);
        $this->info("Created app/Services/$name/{$name}Service.php");
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
}";

        File::put($repositoryPath, $repositoryTemplate);
        $this->info("Created app/Repositories/{$name}Repository.php");
    }

    protected function createModel($name)
    {
        $nameLowerCase = strtolower($name);
        $modelPath = app_path("Models/{$name}.php");
        $modelTemplate =   
"<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class {$name} extends Model
{
    use HasFactory;
    protected \$table='{$nameLowerCase}';
    protected \$fillable = ['*'];
    protected \$hidden = [''];
    protected \$casts = [''];
}";

        File::put($modelPath, $modelTemplate);
        $this->info("Created app/Models/{$name}.php. (WARNING! Access the model and fill in the \$fillable attribute and check \$table name)");
    }   
    
    
    protected function createMigration($name)
    {
        $tableName = strtolower($name);
        $migrationName = "create_{$tableName}_table";

        $this->call('make:migration', [
            'name' => $migrationName,
            '--create' => $tableName
        ]);

        $this->info("Created migration at database/migrations.");
    }
}
