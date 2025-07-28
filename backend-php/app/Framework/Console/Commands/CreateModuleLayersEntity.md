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
    
       Modelo que representa a entidade no banco de dados. Contém definições como: Nome da tabela.Campos preenchíveis ($fillable). Relacionamentos (hasMany, belongsTo, etc.).

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