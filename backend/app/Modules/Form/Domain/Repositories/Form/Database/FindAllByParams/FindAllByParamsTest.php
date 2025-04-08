<?php declare(strict_types=1);

namespace App\Modules\Form\Domain\Repositories\Form\Database\FindAllByParams;

use PHPUnit\Framework\TestCase;
use App\Modules\Form\Domain\Repositories\Form\Database\FormRepository;
use App\Modules\Form\Domain\Entities\Form\Form;
use App\Modules\Form\Domain\Interfaces\Model;
use App\Modules\Form\Domain\Interfaces\Database;
use Exception;

class FindAllByParamsTest extends TestCase
{
    private Model $formModelAdapter;
    private Database $databaseAdapter;
    private FormRepository $formRepository;

    protected function setUp(): void
    {
        $this->formModelAdapter = new class implements Model {
            public function create(array $data): array {
                return [];
            }
            public function find(int $id): array {
                return [];
            }
            public function update(int $id, array $data): bool {
                return true;
            }
            public function delete(int $id): bool{
                return true;
            }
            public function all(): array {
                return [];
            }
            public function where(array $params): array {
                return [];
            }
        };

        $this->databaseAdapter = new class implements Database {
            public function rawQuery(string $query, array $bindings = []): array
            {
                return [
                    [
                        'id' => '1',
                        'name' => 'test_form',
                        'attributes' => '{}'
                    ],
                    [
                        'id' => '2',
                        'name' => 'another_form',
                        'attributes' => '{}'
                    ]
                ];
            }
        };

        $this->formRepository = new FormRepository($this->formModelAdapter, $this->databaseAdapter);
    }

    public function testFindAllByParamsWithAllParams()
    {
        $params = [
            'id' => '1',
            'name' => 'test',
            'order' => 'name',
            'limit' => 10,
            'offset' => 0
        ];

        $result = $this->formRepository->findAllByParams($params);

        $this->assertIsArray($result);
        $this->assertCount(2, $result);
        $this->assertInstanceOf(Form::class, $result[0]);
        $this->assertEquals('1', $result[0]->id);
        $this->assertEquals('test_form', $result[0]->name);
    }

    public function testFindAllByParamsWithEmptyParams()
    {
        $result = $this->formRepository->findAllByParams([]);

        $this->assertIsArray($result);
        $this->assertCount(2, $result);
        $this->assertInstanceOf(Form::class, $result[0]);
    }

    public function testFindAllByParamsWithOnlyId()
    {
        $params = ['id' => '1'];
        $result = $this->formRepository->findAllByParams($params);

        $this->assertIsArray($result);
        $this->assertCount(2, $result);
        $this->assertInstanceOf(Form::class, $result[0]);
    }

    public function testFindAllByParamsWithOnlyName()
    {
        $params = ['name' => 'test'];
        $result = $this->formRepository->findAllByParams($params);

        $this->assertIsArray($result);
        $this->assertCount(2, $result);
        $this->assertInstanceOf(Form::class, $result[0]);
    }

    public function testFindAllByParamsWithOnlyOrder()
    {
        $params = ['order' => 'name'];
        $result = $this->formRepository->findAllByParams($params);

        $this->assertIsArray($result);
        $this->assertCount(2, $result);
        $this->assertInstanceOf(Form::class, $result[0]);
    }

    public function testFindAllByParamsWithOnlyLimit()
    {
        $params = ['limit' => 10];
        $result = $this->formRepository->findAllByParams($params);

        $this->assertIsArray($result);
        $this->assertCount(2, $result);
        $this->assertInstanceOf(Form::class, $result[0]);
    }

    public function testFindAllByParamsWithOnlyOffset()
    {
        $params = ['offset' => 0];
        $result = $this->formRepository->findAllByParams($params);

        $this->assertIsArray($result);
        $this->assertCount(2, $result);
        $this->assertInstanceOf(Form::class, $result[0]);
    }
} 