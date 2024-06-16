<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class DeleteModule extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'delete:module {name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Delete a module with its routes, controller, service, repository, model, and migration';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $name = $this->argument('name');
        $this->deleteRoutes($name);
        $this->deleteController($name);
        $this->deleteService($name);
        $this->deleteRepository($name);
        $this->deleteModel($name);
        $this->deleteMigration($name);

        $this->info("Module $name deleted successfully!");

        return 0;
    }

    protected function deleteRoutes($name)
    {
        $routesPath = base_path('routes/api.php');
        $nameLowerCase = strtolower($name);
        $routeContent = 
"Route::prefix('$nameLowerCase')->group(function(){
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

        $routesFileContent = File::get($routesPath);
        $routesFileContent = str_replace($routeContent, '', $routesFileContent);
        File::put($routesPath, $routesFileContent);

        $this->info("Routes for $name removed from routes/api.php");
    }

    protected function deleteController($name)
    {
        $nameCamelCase =  lcfirst($name);
        $controllerPath = app_path("Http/Controllers/{$nameCamelCase}Controller.php");
        if (File::exists($controllerPath)) {
            File::delete($controllerPath);
            $this->info("Controller for $name deleted at app/Http/Controllers/{$nameCamelCase}Controller.php");
        }
    }

    protected function deleteService($name)
    {
        $nameCamelCase =  lcfirst($name);
        $serviceDirectory = app_path("Services/$nameCamelCase");

        if (File::exists($serviceDirectory)) {
            File::deleteDirectory($serviceDirectory);
            $this->info("Service directory for $name deleted at app/Services/$nameCamelCase");
        }
    }

    protected function deleteRepository($name)
    {
        $repositoryPath = app_path("Repositories/{$name}Repository.php");
        if (File::exists($repositoryPath)) {
            File::delete($repositoryPath);
            $this->info("Repository for $name deleted at app/Repositories/{$name}Repository.php");
        }
    }

    protected function deleteModel($name)
    {
        $modelPath = app_path("Models/{$name}.php");
        if (File::exists($modelPath)) {
            File::delete($modelPath);
            $this->info("Model for $name deleted at app/Models/{$name}.php");
        }
    }

    protected function deleteMigration($name)
    {
        $tableName = strtolower($name);
        $migrationFiles = File::files(database_path('migrations'));

        foreach ($migrationFiles as $file) {
            if (strpos($file->getFilename(), "create_{$tableName}_table") !== false) {
                File::delete($file->getPathname());
                $this->info("Migration file {$file->getFilename()} deleted.");
            }
        }
    }
}
