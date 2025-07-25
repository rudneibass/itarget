<?php declare(strict_types=1);

namespace App\Modules\Form\Domain\Repositories\Field\Database\GetFormCreateByName;

use PHPUnit\Framework\TestCase;
use App\Modules\Form\Domain\Entities\Form\Form;
use App\Modules\Form\Domain\Interfaces\Model;
use App\Modules\Form\Domain\Interfaces\Database;
use App\Modules\Form\Domain\Repositories\Field\Database\FieldRepository;
use Exception;

class GetFormCreateByNameTest extends TestCase
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
                if (strpos($query, "SELECT * FROM 'form'") !== false) {
                    return [
                        [
                            'id' => (int)'1',
                            'name' => 'test_form',
                            'attributes' => '{}'
                        ]
                    ];
                } else {
                    return [
                        [
                            'id' => (int)'1',
                            'form_id' => '1',
                            'name' => 'test_field',
                            'rules' => 'required',
                            'order' => '1',
                            'attributes' => '{}'
                        ]
                    ];
                }
            }
        };

        $this->fieldRepository = new FieldRepository($this->fieldModelAdapter, $this->databaseAdapter);
    }

    public function testGetFormCreateByNameSuccess()
    {
        $name = 'test_form';
        $form = $this->fieldRepository->getFormCreateByName($name);

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
        $this->assertEquals('1', $field['order']);
        $this->assertEquals('{}', $field['attributes']);
    }

    public function testGetFormCreateByNameNotFound()
    {
        $name = 'non_existent_form';
        $this->databaseAdapter = new class implements Database {
            public function rawQuery(string $query, array $bindings = []): array
            {
                return [];
            }
        };

        $this->fieldRepository = new FieldRepository($this->fieldModelAdapter, $this->databaseAdapter);

        $this->expectException(Exception::class);
        $this->expectExceptionMessage("Não foi possivel localizar formulário com nome = '{$name}'");

        $this->fieldRepository->getFormCreateByName($name);
    }
} 