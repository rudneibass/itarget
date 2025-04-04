<?php declare(strict_types=1);

namespace App\Modules\Form\Domain\Repositories\Field\Database\Tests;

use PHPUnit\Framework\TestCase;
use App\Modules\Form\Domain\Entities\Field\Field;
use App\Modules\Form\Domain\Interfaces\Model;
use App\Modules\Form\Domain\Interfaces\Database;
use App\Modules\Form\Domain\Repositories\Field\Database\FieldRepository;
use Exception;

class FindAllByParamsTest extends TestCase
{
    private Model $fieldModelAdapter;
    private Database $databaseAdapter;
    private FieldRepository $fieldRepository;

    protected function setUp(): void
    {
        $this->databaseAdapter = new class implements Database {
            public function rawQuery(string $query, array $bindings = []): array
            {
                return [
                    [
                        'id' => '1',
                        'form_id' => '1',
                        'name' => 'test_field',
                        'rules' => 'required',
                        'is_active' => '1',
                        'attributes' => '{}',
                        'order' => '1'
                    ]
                ];
            }
        };

        $this->fieldModelAdapter = new class implements Model {
            public function where(array $params): array {
                return [];
            }
            public function find(int $id): array {
                return [];
            }
            public function create(array $data): array {
                return [];
            }
            public function update(int $id, array $data): bool {
                return true;
            }
            public function delete(int $id): bool {
                return true;
            }
            public function all(): array {
                return [];
            }
        };

        $this->fieldRepository = new FieldRepository($this->fieldModelAdapter, $this->databaseAdapter);
    }

    public function testFindAllByParamsWithAllParams()
    {
        $params = [
            'id' => '1',
            'form_id' => '1',
            'name' => 'test',
            'order' => 'name',
            'limit' => 10,
            'offset' => 0
        ];

        $result = $this->fieldRepository->findAllByParams($params);

        $this->assertIsArray($result);
        $this->assertCount(1, $result);
        $this->assertInstanceOf(Field::class, $result[0]);
        $this->assertEquals('1', $result[0]->id);
        $this->assertEquals('test_field', $result[0]->name);
    }

    public function testFindAllByParamsWithEmptyParams()
    {
        $result = $this->fieldRepository->findAllByParams([]);

        $this->assertIsArray($result);
        $this->assertCount(1, $result);
        $this->assertInstanceOf(Field::class, $result[0]);
    }

    public function testFindAllByParamsWithOnlyId()
    {
        $params = ['id' => '1'];
        $result = $this->fieldRepository->findAllByParams($params);

        $this->assertIsArray($result);
        $this->assertCount(1, $result);
        $this->assertInstanceOf(Field::class, $result[0]);
    }

    public function testFindAllByParamsWithOnlyFormId()
    {
        $params = ['form_id' => '1'];
        $result = $this->fieldRepository->findAllByParams($params);

        $this->assertIsArray($result);
        $this->assertCount(1, $result);
        $this->assertInstanceOf(Field::class, $result[0]);
    }

    public function testFindAllByParamsWithOnlyName()
    {
        $params = ['name' => 'test'];
        $result = $this->fieldRepository->findAllByParams($params);

        $this->assertIsArray($result);
        $this->assertCount(1, $result);
        $this->assertInstanceOf(Field::class, $result[0]);
    }

    public function testFindAllByParamsWithOnlyOrder()
    {
        $params = ['order' => 'name'];
        $result = $this->fieldRepository->findAllByParams($params);

        $this->assertIsArray($result);
        $this->assertCount(1, $result);
        $this->assertInstanceOf(Field::class, $result[0]);
    }

    public function testFindAllByParamsWithOnlyLimit()
    {
        $params = ['limit' => 10];
        $result = $this->fieldRepository->findAllByParams($params);

        $this->assertIsArray($result);
        $this->assertCount(1, $result);
        $this->assertInstanceOf(Field::class, $result[0]);
    }

    public function testFindAllByParamsWithOnlyOffset()
    {
        $params = ['offset' => 0];
        $result = $this->fieldRepository->findAllByParams($params);

        $this->assertIsArray($result);
        $this->assertCount(1, $result);
        $this->assertInstanceOf(Field::class, $result[0]);
    }
} 