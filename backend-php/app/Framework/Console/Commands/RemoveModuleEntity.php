<?php

namespace App\Framework\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class RemoveModuleEntity extends Command
{
    protected $signature = 'remove:module-entity {module} {entity}';
    protected $description = 'Remove a estrutura de arquivos de uma entidade dentro de um módulo.';

    public function handle()
    {
        $module = ucfirst($this->argument('module'));
        $entity = ucfirst($this->argument('entity'));
        $basePath = base_path("app/Modules/$module");
        $entityPath = "$basePath/$entity";

        // Remover pastas e arquivos da entidade
        if (File::exists($entityPath)) {
            File::deleteDirectory($entityPath);
            $this->info("Estrutura da entidade $entity removida do módulo $module.");
        } else {
            $this->warn("A estrutura da entidade $entity não foi encontrada no módulo $module.");
        }

        // Atualizar o arquivo routes.php para remover as rotas da entidade
        $routesFile = "$basePath/routes.php";
        if (File::exists($routesFile)) {
            $routesContent = File::get($routesFile);
            $routePattern = "/\/\/ Rotas para a entidade $entity.*?Route::resource\('$entity', '{$entity}Controller'\);\n/s";

            if (preg_match($routePattern, $routesContent)) {
                $updatedRoutes = preg_replace($routePattern, '', $routesContent);
                File::put($routesFile, $updatedRoutes);
                $this->info("Rotas da entidade $entity removidas do arquivo de rotas.");
            } else {
                $this->warn("Nenhuma rota encontrada para a entidade $entity no arquivo routes.php.");
            }
        }

        // Verificar se o módulo não possui outras entidades
        $remainingEntities = collect(File::directories($basePath))
            ->filter(fn($dir) => basename($dir) !== 'Base');

        if ($remainingEntities->isEmpty()) {
            $this->info("Nenhuma entidade restante no módulo $module. Você pode remover o módulo manualmente, se necessário.");
        }
    }
}
