<?php declare(strict_types=1);

namespace App\Modules\Form\Domain\Repositories\Field\Database\Delete;

use PHPUnit\Framework\TestCase;
use App\Modules\Form\Domain\Interfaces\Model;
use App\Modules\Form\Domain\Interfaces\Database;
use App\Modules\Form\Domain\Repositories\Field\Database\FieldRepository;
use Exception;

class DeleteTest extends TestCase
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
                return [];
            }
            public function find(int $id): array
            {
                return [];
            }
            public function create(array $data): array
            {
                return [];
            }
            public function update(int $id, array $data): bool
            {
                return true;
            }
            public function delete(int $id): bool
            {
                return true;
            }
            public function all(): array{
                return [];
            }
        };

        $this->fieldRepository = new FieldRepository($this->fieldModelAdapter, $this->databaseAdapter);
    }

    public function testDeleteSuccess()
    {
        $id = '1';
        $result = $this->fieldRepository->delete($id);
        $this->assertEquals(1, $result);
    }
} 