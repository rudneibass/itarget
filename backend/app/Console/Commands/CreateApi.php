<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class CreateApi extends Command
{

    protected $signature = 'create:api {name}';
    protected $description = 'Create a new api with routes, controller, service, and repository';

    public function handle()
    {
        $name = $this->argument('name');
        $this->createRoutes($name);
        $this->createController($name);
        $this->createService($name);
        $this->createRepository($name);
        $this->createModel($name);
        $this->createMigration($name);
        $this->info("Api $name created successfully!");
        return 0;
    }

    protected function createRoutes($name)
    {
        $nameLowerCase = strtolower($name);
        $routesPath = base_path('routes/api.php');
        $routeContent =
"
use App\Http\Controllers\\Api\\{$name}Controller;
Route::prefix('$nameLowerCase')->group(function(){
    Route::controller({$name}Controller::class)->group(function(){
        # Default routes
        Route::get('/', 'list');
        Route::get('/doc', 'doc');
        Route::get('/list', 'list');
        Route::get('/id/{id}', 'getById');
        Route::get('/paginate/{itemsPerPage}', 'paginate');
        Route::get('/form/{formName}', 'getFormWithFields');
        Route::get('/edit/{formName}/{id}', 'getFormWithFieldsAndValues');
        
        Route::put('/update/{id}', 'update');
        Route::post('/create', 'create');
        Route::delete('/delete/{id}', 'delete');

        # Custom routes
        # custom routes here...
    });
});

";
        File::append($routesPath, $routeContent);
        $this->info("Created routes for $name in routes/api.php");
    }

    protected function createController($name)
    {
        $controllerPath = app_path("Http/Controllers/Api/{$name}Controller.php");
        $controllerTemplate = 
"<?php

namespace App\Http\Controllers\Api;

use App\Services\\Api\\{$name}\\{$name}Service;

class {$name}Controller extends AbstractController
{
    protected \$service;
    protected \$createRequest;
    protected \$updateRequest;

    public function __construct(){
        \$this->service = new {$name}Service;
    }

    # Custom action exemple:
    #public function search(Request \$request){
    #    return \$this->executeAction(function() use (\$request){
    #        return \$this->service->search(\$request->all());
    #    });
    #}

}";

        File::put($controllerPath, $controllerTemplate);
        $this->info("Created app/Http/Controllers/Api/{$name}Controller.php");
    }

    protected function createService($name)
    {
        $serviceDirectory = app_path("Services/Api/$name");
        File::makeDirectory($serviceDirectory, 0755, true);
        $servicePath = "$serviceDirectory/{$name}Service.php";
        
        $serviceTemplate = 
"<?php

namespace App\Services\\Api\\{$name};

use App\Services\Api\AbstractService;
use App\Repositories\Api\\{$name}Repository;

class {$name}Service extends AbstractService
{
    protected \$repository;

    public function __construct(){
        \$this->repository = new {$name}Repository;
    }

}";

        File::put($servicePath, $serviceTemplate);
        $this->info("Created app/Services/Api/$name/{$name}Service.php");
    }

    protected function createRepository($name)
    {
        $repositoryPath = app_path("Repositories/Api/{$name}Repository.php");
        $repositoryTemplate = 
"<?php

namespace App\Repositories\Api;

use App\Models\\{$name};

class {$name}Repository extends AbstractRepository
{
    public function __construct() {
        parent::__construct(new {$name});
    }
}";

        File::put($repositoryPath, $repositoryTemplate);
        $this->info("Created app/Repositories/Api/{$name}Repository.php");
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
