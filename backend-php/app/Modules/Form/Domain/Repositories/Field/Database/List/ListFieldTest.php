<?php declare(strict_types=1);

namespace App\Modules\Form\Domain\Repositories\Field\Database\ListField;

use PHPUnit\Framework\TestCase;
use App\Modules\Form\Domain\Entities\Field\Field;
use App\Modules\Form\Domain\Interfaces\Model;
use App\Modules\Form\Domain\Interfaces\Database;
use App\Modules\Form\Domain\Repositories\Field\Database\FieldRepository;

class ListFieldTest extends TestCase
{
    private Model $fieldModelAdapter;
    private Database $databaseAdapter;
    private FieldRepository $fieldRepository;

    protected function setUp(): void
    {
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
                    ],
                    [
                        'id' => '2',
                        'form_id' => '1',
                        'name' => 'another_field',
                        'rules' => 'required',
                        'is_active' => '1',
                        'attributes' => '{}',
                        'order' => '2'
                    ]
                ];
            }
        };

        $this->fieldRepository = new FieldRepository($this->fieldModelAdapter, $this->databaseAdapter);
    }

    public function testListSuccess()
    {
        $result = $this->fieldRepository->list();

        $this->assertIsArray($result);
        $this->assertCount(2, $result);
        
        $this->assertInstanceOf(Field::class, $result[0]);
        $this->assertEquals('1', $result[0]->id);
        $this->assertEquals('test_field', $result[0]->name);
        $this->assertEquals('1', $result[0]->formId);
        $this->assertEquals('required', $result[0]->rules);
        $this->assertEquals('1', $result[0]->isActive);
        $this->assertEquals('{}', $result[0]->attributes);
        $this->assertEquals('1', $result[0]->order);

        $this->assertInstanceOf(Field::class, $result[1]);
        $this->assertEquals('2', $result[1]->id);
        $this->assertEquals('another_field', $result[1]->name);
        $this->assertEquals('1', $result[1]->formId);
        $this->assertEquals('required', $result[1]->rules);
        $this->assertEquals('1', $result[1]->isActive);
        $this->assertEquals('{}', $result[1]->attributes);
        $this->assertEquals('2', $result[1]->order);
    }
} 