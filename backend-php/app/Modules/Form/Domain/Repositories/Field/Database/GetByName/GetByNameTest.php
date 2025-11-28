<?php declare(strict_types=1);

namespace App\Modules\Form\Domain\Repositories\Field\Database\GetByName;

use PHPUnit\Framework\TestCase;
use App\Modules\Form\Domain\Entities\Field\Field;
use App\Modules\Form\Domain\Interfaces\Model;
use App\Modules\Form\Domain\Interfaces\Database;
use App\Modules\Form\Domain\Repositories\Field\Database\FieldRepository;
use Exception;

class GetByNameTest extends TestCase
{
    private Model $fieldModelAdapter;
    private Database $databaseAdapter;
    private FieldRepository $fieldRepository;

    protected function setUp(): void
    {
        $this->databaseAdapter = new class implements Database {
            public function rawQuery(string $query, array $bindings = []): array
            {
                return [];
            }
        };
        
        $this->fieldModelAdapter = new class implements Model {
            public function where(array $params): array
            {
                if ($params['name'] === 'test_field') {
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

    public function testGetByNameSuccess()
    {
        $name = 'test_field';
        $field = $this->fieldRepository->getByName($name);

        $this->assertInstanceOf(Field::class, $field);
        $this->assertEquals('1', $field->id);
        $this->assertEquals('test_field', $field->name);
        $this->assertEquals('1', $field->formId);
        $this->assertEquals('required', $field->rules);
        $this->assertEquals('1', $field->isActive);
        $this->assertEquals('{}', $field->attributes);
        $this->assertEquals('1', $field->order);
    }

    public function testGetByNameNotFound()
    {
        $name = 'non_existent_field';

        $this->expectException(Exception::class);
        $this->expectExceptionMessage("Não foi possivel localizar campo com nome = '{$name}'");

        $this->fieldRepository->getByName($name);
    }
} 