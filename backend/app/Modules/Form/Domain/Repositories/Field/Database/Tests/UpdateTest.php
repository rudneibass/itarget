<?php declare(strict_types=1);

namespace App\Modules\Form\Domain\Repositories\Field\Database\Tests;

use PHPUnit\Framework\TestCase;
use App\Modules\Form\Domain\Entities\Field\Field;
use App\Modules\Form\Domain\Entities\Field\FieldDto;
use App\Modules\Form\Domain\Interfaces\Model;
use App\Modules\Form\Domain\Interfaces\Database;
use App\Modules\Form\Domain\Repositories\Field\Database\FieldRepository;
use Exception;

class UpdateTest extends TestCase
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
                return [
                    'id' => '1',
                    'form_id' => '1',
                    'name' => 'test_field',
                    'rules' => 'required',
                    'is_active' => '1',
                    'attributes' => '{}',
                    'order' => '1'
                ];
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
                return [];
            }
        };

        $this->fieldRepository = new FieldRepository($this->fieldModelAdapter, $this->databaseAdapter);
    }

    public function testUpdateSuccess()
    {
        $fieldDto = new FieldDto([
            'id' => '1',
            'form_id' => '1',
            'name' => 'updated_field',
            'rules' => 'required',
            'is_active' => '1',
            'attributes' => '{}',
            'order' => '1'
        ]);
        $field = new Field($fieldDto);

        $result = $this->fieldRepository->update($field);

        $this->assertTrue($result);
    }
} 