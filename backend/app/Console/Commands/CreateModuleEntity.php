<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class CreateModuleEntity extends Command
{
    protected $signature = 'make:module-entity {module} {entity}';
    protected $description = 'Cria estrutura de arquivos para uma nova entidade dentro de um módulo.';

    public function handle()
    {
        $module = ucfirst($this->argument('module'));
        $entity = ucfirst($this->argument('entity'));
        $basePath = base_path("app/Modules/$module");
        $entityPath = "$basePath/$entity";

        // Criar estrutura de pastas
        $paths = [
            $basePath,
            "$basePath/Base",
            $entityPath,
            "$entityPath/Controllers",
            "$entityPath/Services",
            "$entityPath/Models",
            "$entityPath/Daos",
            "$entityPath/Routes",
        ];

        foreach ($paths as $path) {
            if (!File::exists($path)) {
                File::makeDirectory($path, 0755, true);
                $this->info("Criada pasta: $path");
            }
        }

        // Criar arquivos base
        $baseFiles = [
            "$basePath/Base/BaseController.php" => $this->getBaseControllerContent(),
            "$basePath/Base/BaseDao.php" => $this->getBaseDaoContent(),
            "$basePath/Base/BaseService.php" => $this->getBaseServiceContent(),
            "$basePath/README.md" => $this->getReadmePtBrContent()
        ];

        foreach ($baseFiles as $file => $content) {
            if (!File::exists($file)) {
                File::put($file, $content);
                $this->info("Criado arquivo base: $file");
            }
        }

        // Criar arquivos da entidade
        $entityFiles = [
            "$entityPath/Controllers/{$entity}Controller.php" => $this->getEntityControllerContent($entity),
            "$entityPath/Services/{$entity}Service.php" => $this->getEntityServiceContent($entity),
            "$entityPath/Models/{$entity}.php" => $this->getEntityModelContent($entity),
            "$entityPath/Daos/{$entity}Dao.php" => $this->getEntityDaoContent($entity),
            "$entityPath/Routes/routes.php" => $this->getRoutesContent($entity)
        ];

        foreach ($entityFiles as $file => $content) {
            if (!File::exists($file)) {
                File::put($file, $content);
                $this->info("Criado arquivo da entidade: $file");
            }
        }

        // Atualizar ou criar o arquivo routes.php
        /*$routesFile = "$basePath/routes.php";
        $newRoutes = $this->getRoutesContent($entity);

        if (!File::exists($routesFile)) {
            File::put($routesFile, "<?php\n\n" . $newRoutes);
            $this->info("Criado arquivo de rotas: $routesFile");
        } else {
            File::append($routesFile, "\n" . $newRoutes);
            $this->info("Rotas adicionadas ao arquivo existente: $routesFile");
        }*/

        $this->info("Estrutura criada para a entidade $entity no módulo $module.");
    }

    // Conteúdo para arquivos base
    protected function getBaseControllerContent(): string
    {
        return "<?php\n\nnamespace App\\Modules\\Base;\n\nclass BaseController {}\n";
    }

    protected function getBaseDaoContent(): string
    {
        return "<?php\n\nnamespace App\\Modules\\Base;\n\nclass BaseDao {}\n";
    }

    protected function getBaseServiceContent(): string
    {
        return "<?php\n\nnamespace App\\Modules\\Base;\n\nclass BaseService {}\n";
    }

    // Conteúdo para arquivos da entidade
    protected function getEntityControllerContent($entity): string
    {
        return "<?php\n\nnamespace App\\Modules\\$entity\\Controllers;\n\nuse App\\Modules\\Base\\BaseController;\n\nclass {$entity}Controller extends BaseController {}\n";
    }

    protected function getEntityServiceContent($entity): string
    {
        return "<?php\n\nnamespace App\\Modules\\$entity\\Services;\n\nuse App\\Modules\\Base\\BaseService;\n\nclass {$entity}Service extends BaseService {}\n";
    }

    protected function getEntityModelContent($entity): string
    {
        return "<?php\n\nnamespace App\\Modules\\$entity\\Models;\n\nuse Illuminate\\Database\\Eloquent\\Model;\n\nclass {$entity} extends Model {}\n";
    }

    protected function getEntityDaoContent($entity): string
    {
        return "<?php\n\nnamespace App\\Modules\\$entity\\Daos;\n\nuse App\\Modules\\Base\\BaseDao;\n\nclass {$entity}Dao extends BaseDao {}\n";
    }

    // Conteúdo para as rotas
    protected function getRoutesContent($entity): string
    {
        return "<?php // Rotas para a entidade $entity\nRoute::resource('$entity', '{$entity}Controller');";
    }

    // Conteúdo para o README.md
    protected function getReadmePtBrContent(): string
    {
        return 
        "
# Estrutura de Arquivos Gerados pelo Comando CreateModuleEntity

O comando CreateModuleEntity é usado para criar uma nova entidade dentro de um módulo específico na arquitetura do sistema. Ele automatiza a criação de arquivos e pastas, garantindo a organização e padronização. Abaixo, segue a descrição de cada arquivo gerado e sua função:

## Estrutura de Pastas e Arquivos

```plaintext
Modules/
└── <ModuleName>/
    └── Base/
        ├── BaseController.php
        ├── BaseDao.php
        └── BaseService.php
    ├── <EntityName>/
        ├── Controllers/
            └── <EntityName>Controller.php
        ├── Dao/
            └── <EntityName>Dao.php
        ├── Services/
            └── <EntityName>Service.php
        ├── Models/
            └── <EntityName>.php
        └── Routes/    
            └── routes.php    
```

### Descrição dos Arquivos Base

1. `Base/BaseController.php`

       Arquivo base para todos os controladores do módulo. Fornece métodos e propriedades comuns que podem ser utilizados por controladores específicos, como manipulação de respostas ou middleware.

2. `Base/BaseService.php`

       Classe base para os serviços do módulo.Contém lógica de negócios compartilhada entre múltiplos serviços.
    
3. `Base/BaseDao.php`

       Classe base para as operações de acesso a dados (DAO).Fornece métodos reutilizáveis para consultas e manipulação de dados no banco.

### Descrição dos Arquivos da Entidade

1. `Controllers/<EntityName>Controller.php`

       Controlador específico para a entidade criada.Gerencia as requisições HTTP relacionadas à entidade (ex.: listar, criar, atualizar, deletar).Exemplos de métodos comuns:
         - index(): Lista todos os registros.
         - store(): Cria um novo registro.
         - update(): Atualiza um registro existente.
         - destroy(): Remove um registro.
        
2. `Daos/<EntityName>Dao.php`

       Classe DAO específica para a entidade criada.Contém métodos para consultas específicas ao banco de dados, relacionadas à entidade 

3. `Services/<EntityName>Service.php`

       Classe de serviço específica para a entidade. Implementa a lógica de negócios relacionada à entidade. Exemplo: validações/comparações antes decriar ou atualizar registros.

4. `Models/<EntityName>.php`
    
       Modelo que representa a entidade no banco de dados. Contém definições como: Nome da tabela.Campos preenchíveis (fillable). Relacionamentos (hasMany, belongsTo, etc.).

5. `Routes/routes.php`

       Arquivo de rotas específico do módulo. Define as rotas relacionadas à entidade criada. Se o arquivo já existir, as rotas da nova entidade serão adicionadas automaticamente.

        Exemplo de rota gerada:

        Route::prefix('<entity-name>')->group(function () {
            Route::get('/', '<EntityName>Controller@index');
            Route::post('/', '<EntityName>Controller@store');
            Route::put('/{id}', '<EntityName>Controller@update');
            Route::delete('/{id}', '<EntityName>Controller@destroy');
        });


## Exemplo Prático
Se você criar uma entidade chamada Product no módulo Inventory, a estrutura gerada será:

```plaintext
Modules/
└── Inventory/
    └── Base/
        ├── BaseController.php
        ├── BaseDao.php
        └── BaseService.php
    ├── Product/
        ├── Controllers/
            └── ProductController.php
        ├── Daos/
            └── ProductDao.php
        ├── Services/
            └── ProductService.php
        ├── Models/
            └── Product.php
        └── Routes/    
            └── routes.php    
```


Esse comando é projetado para acelerar o desenvolvimento e manter a padronização do código em sistemas modulares.
        ";
    }
}
