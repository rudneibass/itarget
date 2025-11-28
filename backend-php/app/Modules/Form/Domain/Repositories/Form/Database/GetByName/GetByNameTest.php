<?php declare(strict_types=1);

namespace App\Modules\Form\Domain\Repositories\Form\Database\GetByName;

use PHPUnit\Framework\TestCase;
use App\Modules\Form\Domain\Repositories\Form\Database\FormRepository;
use App\Modules\Form\Domain\Entities\Form\Form;
use App\Modules\Form\Domain\Interfaces\Model;
use App\Modules\Form\Domain\Interfaces\Database;
use Exception;

class GetByNameTest extends TestCase
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
            public function where(array $params): array
            {
                if ($params['name'] === 'test_form') {
                    return [
                        [
                            'id' => (int)'1',
                            'name' => 'test_form',
                            'attributes' => '{}'
                        ]
                    ];
                }
                return [];
            }
        };

        $this->databaseAdapter = new class implements Database {
            public function rawQuery(string $query, array $bindings = []): array
            {
                return [
                    [
                        'id' => (int)'1',
                        'form_id' => '1',
                        'name' => 'test_field',
                        'rules' => 'required',
                        'attributes' => '{}'
                    ]
                ];
            }
        };

        $this->formRepository = new FormRepository($this->formModelAdapter, $this->databaseAdapter);
    }

    public function testGetByNameSuccess()
    {
        $name = 'test_form';
        $form = $this->formRepository->getByName($name);

        $this->assertInstanceOf(Form::class, $form);
        $this->assertEquals('1', $form->id);
        $this->assertEquals('test_form', $form->name);
        $this->assertEquals('{}', $form->attributes);
        
        $this->assertIsArray($form->fields);
        $this->assertCount(1, $form->fields);
        
        $field = $form->fields[0];
        $this->assertEquals('1', $field['id']);
        $this->assertEquals('1', $field['form_id']);
        $this->assertEquals('test_field', $field['name']);
        $this->assertEquals('required', $field['rules']);
        $this->assertEquals('{}', $field['attributes']);
    }

    public function testGetByNameNotFound()
    {
        $name = 'non_existent_form';

        $this->expectException(Exception::class);
        $this->expectExceptionMessage("Não foi possivel localizar formulário com nome = '{$name}'");

        $this->formRepository->getByName($name);
    }
} 