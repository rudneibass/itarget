<?php declare(strict_types=1);

namespace App\Modules\Form\Domain\Repositories\Form\Database\Update;

use PHPUnit\Framework\TestCase;
use App\Modules\Form\Domain\Repositories\Form\Database\FormRepository;
use App\Modules\Form\Domain\Entities\Form\Form;
use App\Modules\Form\Domain\Entities\Form\FormDto;
use App\Modules\Form\Domain\Interfaces\Model;
use App\Modules\Form\Domain\Interfaces\Database;
use Exception;

class UpdateTest extends TestCase
{
    private Model $formModelAdapter;
    private Database $databaseAdapter;
    private FormRepository $formRepository;

    protected function setUp(): void
    {
        $this->formModelAdapter = new class implements Model {
            public function where(array $params): array {
                return [];
            }
            public function find(int $id): array {
                return [
                    'id' => '1',
                    'name' => 'updated_form',
                    'attributes' => '{"new": "value"}'
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

        $this->formRepository = new FormRepository($this->formModelAdapter, $this->databaseAdapter);
    }

    public function testUpdateSuccess()
    {
        $formDto = new FormDto([
            'id' => (int)'1',
            'name' => 'updated_form',
            'attributes' => '{"new": "value"}'
        ]);
        $form = new Form($formDto);

        $result = $this->formRepository->update($form);

        $this->assertTrue($result);
    }
} 