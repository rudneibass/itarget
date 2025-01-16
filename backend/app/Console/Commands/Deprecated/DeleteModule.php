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
    protected $description = 'Delete a module with routes, controller, service, and repository';

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

        $routeStart = "use App\Http\Controllers\\{$name}Controller;";
        $routePattern = "/use App\\\Http\\\Controllers\\\{$name}Controller;\nRoute::prefix\('$nameLowerCase'\)->group\(function\(\){\n\s*Route::controller\({$name}Controller::class\)->group\(function\(\){\n\s*Route::get\(\/list\', \'list\'\);\n\s*Route::get\(\/paginate\/\{itemsPerPage\}\', \'paginate\'\);\n\s*Route::get\(\/get\/\{id\}\', \'get\'\);\n\s*Route::post\(\/search\', \'findByParams\'\);\n\s*Route::post\(\/create\', \'create\'\);\n\s*Route::put\(\/update\/\{id\}\', \'update\'\);\n\s*Route::delete\(\/delete\/\{id\}\', \'delete\'\);\n\s*}\);\n\s*}\);\n\n/";

        $routesContent = File::get($routesPath);
        $routesContent = preg_replace($routePattern, '', $routesContent);

        File::put($routesPath, $routesContent);
        $this->info("Deleted routes for $name in routes/api.php");
    }

    protected function deleteController($name)
    {
        $controllerPath = app_path("Http/Controllers/{$name}Controller.php");

        if (File::exists($controllerPath)) {
            File::delete($controllerPath);
            $this->info("Deleted app/Http/Controllers/{$name}Controller.php");
        }
    }

    protected function deleteService($name)
    {
        $serviceDirectory = app_path("Services/$name");

        if (File::exists($serviceDirectory)) {
            File::deleteDirectory($serviceDirectory);
            $this->info("Deleted app/Services/$name");
        }
    }

    protected function deleteRepository($name)
    {
        $repositoryDirectory = app_path("Repositories/{$name}Repository.php");

        if (File::exists($repositoryDirectory)) {
            File::delete($repositoryDirectory);
            $this->info("Deleted app/Repositories/{$name}Repository.php");
        }
    }

    protected function deleteModel($name)
    {
        $modelPath = app_path("Models/{$name}.php");

        if (File::exists($modelPath)) {
            File::delete($modelPath);
            $this->info("Deleted app/Models/{$name}.php");
        }
    }

    protected function deleteMigration($name)
    {
        $tableName = strtolower($name);
        $migrationFiles = File::files(database_path('migrations'));

        foreach ($migrationFiles as $file) {
            if (strpos($file->getFilename(), "create_{$tableName}_table") !== false) {
                File::delete($file->getPathname());
                $this->info("Deleted migration " . $file->getFilename());
            }
        }
    }
}