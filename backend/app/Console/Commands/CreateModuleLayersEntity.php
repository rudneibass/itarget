<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class CreateModuleLayersEntity extends Command
{
    protected $signature = 'make:module-layers-entity {module} {entity}';
    protected $description = 'Cria estrutura de arquivos para uma nova entidade dentro de um módulo.';

    public function handle()
    {
        $module = ucfirst($this->argument('module'));
        $entity = ucfirst($this->argument('entity'));
        $basePath = base_path("app/Modules/$module");

        // Criar estrutura de pastas
        $paths = [
            $basePath,
            "$basePath/Base/",
            "$basePath/Controllers/{$entity}",
            "$basePath/Services/{$entity}",
            "$basePath/Models/{$entity}",
            "$basePath/Daos/{$entity}",
            "$basePath/Routes/{$entity}",
        ];

        foreach ($paths as $path) {
            if (!File::exists($path)) {
                File::makeDirectory($path, 0755, true);
                $this->info("Criada pasta: $path");
            }
        }

        // Criar arquivos base
        $baseFiles = [
            "$basePath/Base/BaseController.php" => $this->getBaseControllerContent($module),
            "$basePath/Base/BaseDao.php" => $this->getBaseDaoContent($module),
            "$basePath/Base/BaseService.php" => $this->getBaseServiceContent($module),
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
            "$basePath/Controllers/{$entity}/{$entity}Controller.php" => $this->getEntityControllerContent($module, $entity),
            "$basePath/Services/{$entity}/{$entity}Service.php" => $this->getEntityServiceContent($module, $entity),
            "$basePath/Models/{$entity}/{$entity}.php" => $this->getEntityModelContent($module, $entity),
            "$basePath/Daos/{$entity}/{$entity}Dao.php" => $this->getEntityDaoContent($module, $entity),
            "$basePath/Routes/{$entity}/routes.php" => $this->getRoutesContent($module, $entity)
        ];

        foreach ($entityFiles as $file => $content) {
            if (!File::exists($file)) {
                File::put($file, $content);
                $this->info("Criado arquivo da entidade: $file");
            }
        }

        $this->info("Estrutura criada para a entidade $entity no módulo $module.");
    }

    // Conteúdo para arquivos base
    protected function getBaseControllerContent($module): string
    {
        return "<?php

namespace App\Modules\\$module\\Base;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

use Exception;

abstract class BaseController extends Controller
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected \$service;
    protected \$createRequest;
    protected \$updateRequest;

    protected  \$responseData;
    protected int \$responseHttpStatus;

    protected function execute(callable \$action){
        try{
            \$this->responseData = \$action();
            \$this->responseHttpStatus = 200;

        }catch (ValidationException \$e) {
            \$this->responseData = \$e->errors();
            \$this->responseHttpStatus = 422;

        }catch (Exception \$e){
            \$this->responseData = \$e->getMessage();
            \$this->responseHttpStatus = 500;
        }

        return response()->json(
            \$this->responseData,
            \$this->responseHttpStatus
        );
    }

    public function getAll(){
       return \$this->execute(function(){
            return \$this->service->getAll();
        });
    }

    public function paginate(int \$itemsPerPage){
        return \$this->execute(function() use (\$itemsPerPage){
             return \$this->service->paginate(\$itemsPerPage);
         });
     }

    public function getById(\$id){
        return \$this->execute(function() use (\$id){
            return \$this->service->getById((int)\$id);
        });
    }

    public function update(Request \$request, int \$id){
        return \$this->execute(function() use (\$request, \$id){
            \$requestData = \$request->all();
            if(isset(\$this->createRequest)){
                \$this->createRequest->merge(\$request->all());
                \$this->createRequest->validate(\$this->createRequest->rules());
            }
            return \$this->service->update(\$requestData, \$id);
        });  
    }
    
    public function delete(int \$id){
        return \$this->execute(function() use (\$id){
            return \$this->service->delete(\$id);
        });
    }

    public function create(Request \$request)
    {
        return \$this->execute(function() use (\$request) {
            \$requestData = \$request->all();
            if(isset(\$this->createRequest)){
                \$this->createRequest->merge(\$request->all());
                \$this->createRequest->validate(\$this->createRequest->rules());
            }
            return \$this->service->create(\$requestData);
        });
    }

    public function getDoc(){
        return \$this->execute(function(){
            return \$this->service->getDoc();
        });
    }

    public function getFormCreate(\$formName){
        return \$this->execute(function() use (\$formName){
            return \$this->service->getFormCreate(\$formName);
        });
    }

    public function getFormEdit(\$formName, \$id){
        return \$this->execute(function() use (\$formName, \$id){
            return \$this->service->getFormEdit(\$formName, \$id);
        });
    }
}";
    }

    protected function getBaseDaoContent($module): string
    {
        return "<?php

namespace App\Modules\\$module\\Base;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Schema;

abstract class BaseDao  {

    protected Model \$model;

    public function __construct(Model \$model) {
        \$this->model = \$model;
    }
    
    public function getAll(): ?array {
        return \$this->model::all()->toArray();
    }

    public function paginate(int \$itemsPerPage): ?LengthAwarePaginator {
        return \$this->model::paginate(\$itemsPerPage);
    }

    public function getById(int \$id): ?Model {
        return \$this->model::find(\$id);
    }

    public function create(array \$request = []): ?Model {
        return \$this->model::query()->create(\$request);
    }
    
    public function update(array \$request, int \$id): int {
        return \$this->model::findOrFail(\$id)->update(\$request);
    }

    public function delete(int \$id): int {
        return \$this->model::findOrFail(\$id)->delete();
    }

    public function getDoc(){
        \$table = \$this->model->getTable();
        \$columns = Schema::getColumnListing(\$table);
        \$fields = [];
        foreach (\$columns as \$column) {
            \$type = Schema::getColumnType(\$table, \$column);
            \$fields[\$column] = \$type;
        }
        return \$fields;
    }
}";
    }

    protected function getBaseServiceContent($module): string
    {
        return "<?php

namespace App\Modules\\$module\\Base;

abstract class BaseService {

    protected \$dao;
    protected \$formDao;
    protected \$fieldDao;
    
    public function getAll(): ?array {
        return \$this->dao->getAll();
    }

    public function paginate(int \$itemsPerPage = 10): ?array {
        return [\$this->dao->paginate(\$itemsPerPage)];
    }

    public function getById(int \$id): ?object {
        return \$this->dao->getById(\$id);
    }

    public function create(array \$request): ?array {
        return [\$this->dao->create(\$request)];
    }

    public function update(array \$request, int \$id): int {
        return \$this->dao->update(\$request, \$id);
    }

    public function delete(int \$id): int {
        return \$this->dao->delete(\$id);
    }

    public function getDoc(): array {
        return \$this->dao->getDoc();
    }

    public function getFormCreate(string \$name){
        \$form_sdtClass = \$this->formDao->findAllByParams(array('name' => \$name));
        \$form_array = get_object_vars(\$form_sdtClass[0]);
        \$form_array['attributes'] = json_decode(\$form_array['attributes'], true);

        \$form_array['fields'] = \$this->fieldDao->findAllByParams(array('form_id' => \$form_array['id'], 'order' => 'order'));
        \$fields_array = array_map(function(\$item){
            \$item->attributes = json_decode(\$item->metadata, true);
            return \$item;
        }, \$form_array['fields']);
        
        \$form_array['fields'] = \$fields_array;
        return \$form_array;
    }

    public function getFormEdit(\$formName, \$id){
        \$form = \$this->getFormCreate(\$formName);
        \$data = \$this->getById(\$id);
        foreach(\$form['fields'] as &\$field){
            \$fieldName = \$field->name;
            \$field->value = \$data->\$fieldName;
        }
        return \$form;
    }
    
}";
    }

    // Conteúdo para arquivos da entidade
    protected function getEntityControllerContent($module, $entity): string
    {
        return "<?php

namespace App\Modules\\$module\\Controllers\\$entity;

use Illuminate\Http\Request;

use App\Modules\\$module\\Base\BaseController;
use App\Modules\\$module\\Services\\$entity\\{$entity}Service;

class {$entity}Controller extends BaseController
{
    protected \$service;
    protected \$createRequest;
    protected \$updateRequest;
    
    public function __construct(){
        \$this->service = new {$entity}Service;
        \$this->createRequest = null;
    }

    public function findAllByParams(Request \$request){
        return \$this->execute(function() use (\$request){
            return \$this->service->findAllByParams(\$request->all());
        });
    }

    public function search(Request \$request){
        return \$this->execute(function() use (\$request){
            return \$this->service->search(\$request->all());
        });
    }
}";
    }

    protected function getEntityServiceContent($module, $entity): string
    {
        return "<?php 

namespace App\Modules\\$module\\Services\\$entity;

use Illuminate\Pagination\LengthAwarePaginator;
use App\Modules\\$module\\Base\BaseService;
use App\Modules\\$module\\Daos\\$entity\\{$entity}Dao;

class {$entity}Service extends BaseService
{
    public function __construct(){
        \$this->dao = new {$entity}Dao;
    }

    public function findAllByParams(array \$params){
        return \$this->dao->findAllByParams(\$params);
    }

    public function search(array \$params = []): ?LengthAwarePaginator {
        \$perPage = isset(\$params['paginate']) && !empty(\$params['paginate']) ? (int)\$params['paginate'] : 10;
        \$page = isset(\$params['page']) ? (int)\$params['page'] : 1;
        \$total = count(\$this->dao->findAllByParams(\$params));
        \$offset = (\$page - 1) * \$perPage;
        \$params['limit'] = \$perPage;
        \$params['offset'] = \$offset;
        \$result = \$this->dao->findAllByParams(\$params);

        return 
        new LengthAwarePaginator(\$result,\$total, \$perPage, \$page, [
            'path' => request()->url(),
            'query' => request()->query(),
        ]);
    }
}";
    }

    protected function getEntityDaoContent($module, $entity): string
    {
        return "<?php declare(strict_types=1);

namespace App\Modules\\$module\\Daos\\$entity;

use App\Modules\\$module\\Base\BaseDao;
use App\Modules\\$module\\Models\\$entity\\{$entity} as {$entity}Model;
use Illuminate\Support\Facades\DB;

class {$entity}Dao extends BaseDao {
    
    public function __construct() {
        parent::__construct(new {$entity}Model);
    }
        
    public function findAllByParams(array \$params = []): ?array {
        \$query = 
        \"SELECT * 
            FROM '".strtolower($entity)."'
            WHERE 1 = 1\"
            .(isset(\$params['id']) && !empty(\$params['id']) ? \" AND id = {\$params['id']}\" : \"\" )
            .(isset(\$params['order']) && !empty(\$params['order']) ? \" ORDER BY {\$params['order']}\" : \" ORDER BY id\" )
            .(isset(\$params['limit']) && !empty(\$params['limit']) ? \" LIMIT {\$params['limit']}\" : \"\" )
            .(isset(\$params['offset']) && !empty(\$params['offset']) ? \" OFFSET {\$params['offset']}\" : \"\" );

        return DB::select(\$query);
    }
}";
    }

    protected function getEntityModelContent($module,$entity): string
    {
        return "<?php

namespace App\Modules\\$module\\Models\\$entity;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class {$entity} extends Model
{
    use HasFactory;
    protected \$table= '".strtolower($entity)."';
    protected \$fillable = ['*'];
    protected \$casts = ['id' => 'string'];
}";
    }


    // Conteúdo para as rotas
    protected function getRoutesContent($module, $entity): string
    {
        return "<?php

use Illuminate\Support\Facades\Route;
use App\Modules\\$module\\Controllers\\$entity\\{$entity}Controller;

Route::prefix('user')->group(function(){
    Route::controller({$entity}Controller::class)->group(function(){
        # Default routes
            Route::get('/', 'getAll');
            Route::get('/all', 'getAll');
            Route::get('/doc', 'getDoc');
            Route::get('/id/{id}', 'getById');
            Route::get('/paginate/{itemsPerPage}', 'paginate');
            Route::get('/all/paginate/{itemsPerPage}', 'paginate');
            Route::get('/form-create/{formName}', 'getFormCreate');
            Route::get('/form-edit/{formName}/{id}', 'getFormEdit');

            Route::put('/update/{id}', 'update');
            Route::post('/create', 'create');
            Route::delete('/delete/{id}', 'delete');
        
        # Custom routes
            Route::get('/search', 'search');
    });
});";
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
    ├── Controllers/
        └── <EntityName>/
            └── <EntityName>Controller.php
    ├── Daos/
        └── <EntityName>/
            └── <EntityName>Dao.php
    ├── Services/
        └── <EntityName>/
            └── <EntityName>Service.php
    ├── Models/
        └── <EntityName>/
            └── <EntityName>.php
    └── Routes/
        └── <EntityName>/
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
    ├── Controllers/
        └── Product/
            └── ProductController.php
    ├── Daos/
        └── Product/
            └── ProductDao.php
    ├── Services/
        └── Product/
            └── ProductService.php
    ├── Models/
        └── Product/
            └── Product.php
    └── Routes/
        └── Product/
            └── routes.php    
```


Esse comando é projetado para acelerar o desenvolvimento e manter a padronização do código em sistemas modulares.
        ";
    }
}
