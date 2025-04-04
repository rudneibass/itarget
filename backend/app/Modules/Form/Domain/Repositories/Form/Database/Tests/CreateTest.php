<?php declare(strict_types=1);

namespace App\Modules\Form\Domain\Repositories\Form\Database\Tests;

use PHPUnit\Framework\TestCase;
use App\Modules\Form\Domain\Repositories\Form\Database\FormRepository;
use App\Modules\Form\Domain\Entities\Form\Form;
use App\Modules\Form\Domain\Entities\Form\FormDto;
use App\Modules\Form\Domain\Interfaces\Model;
use App\Modules\Form\Domain\Interfaces\Database;
use Exception;

class CreateTest extends TestCase
{
    private Model $formModelAdapter;
    private Database $databaseAdapter;
    private FormRepository $formRepository;

    protected function setUp(): void
    {
        $this->formModelAdapter = new class implements Model {
            public function create(array $data): array {
                return [
                    'id' => (int)'1',
                    'name' => 'test_form',
                    'attributes' => '{}'
                ];
            }
            public function find(int $id): array {
                return [
                    'id' => (int)'1',
                    'name' => 'test_form',
                    'attributes' => '{}'
                ];
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
                return [];
            }
        };

        $this->formRepository = new FormRepository($this->formModelAdapter, $this->databaseAdapter);
    }

    public function testCreateSuccess()
    {
        $formDto = new FormDto([
            'id' => (int)'1',
            'name' => 'test_form',
            'attributes' => '{}'
        ]);
        $form = new Form($formDto);

        $result = $this->formRepository->create($form);

        $this->assertInstanceOf(Form::class, $result);
        $this->assertEquals('1', $result->id);
        $this->assertEquals('test_form', $result->name);
        $this->assertEquals('{}', $result->attributes);
    }
} 