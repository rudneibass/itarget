<?php

namespace App\AppModules\Api\Domain\Entities\Form;

use App\AppModules\Api\Domain\Entities\Form\Form;
use App\AppModules\Api\Domain\Entities\Form\FormDto;
use PHPUnit\Framework\TestCase;

class FormTest extends TestCase {

    public function test_construct_sets_properties_correctly() {
        $form = 
        new Form( 
            new FormDto([
                'id' => '1',
                'name' => 'Form Name',
                'is_active' => '1',
                'metadata' => '{\"id\":\"form-id\",\"name\": \"form-name\"}'
            ])
        );

        $this->assertEquals('1', $form->id);
        $this->assertEquals('Form Name', $form->name);
        $this->assertEquals('1', $form->isActive);
        $this->assertEquals('{\"id\":\"form-id\",\"name\": \"form-name\"}', $form->metadata);
    }

    
    public function test_construct_sets_properties_correctly_without_id() {
        $form = 
        new Form(
            new FormDto([
                'name' => 'Form Name',
                'is_active' => '1',
                'metadata' => '{\"id\":\"form-id\",\"name\": \"form-name\"}'
            ])
        );

        $this->assertEquals(null, $form->id);
        $this->assertEquals('Form Name', $form->name);
        $this->assertEquals('1', $form->isActive);
        $this->assertEquals('{\"id\":\"form-id\",\"name\": \"form-name\"}', $form->metadata);
    }

    public function test_toArray_method_returns_correct_structure() {
        $form = 
        new Form(
            new FormDto([
                'id' => '1',
                'name' => 'Form Name',
                'is_active' => '1',
                'metadata' => '{\"id\":\"form-id\",\"name\": \"form-name\"}'
            ])
        );

        $array = $form->toArray();

        $this->assertEquals('1', $form->id);
        $this->assertEquals('Form Name', $form->name);
        $this->assertEquals('1', $form->isActive);
        $this->assertEquals('{\"id\":\"form-id\",\"name\": \"form-name\"}', $form->metadata);
    }

    public function test_toArray_method_returns_correct_structure_without_id(){
        $form = 
        new Form(
            new FormDto([
                'name' => 'Form Name',
                'is_active' => '1',
                'metadata' => '{\"id\":\"form-id\",\"name\": \"form-name\"}'
            ])
        );

        $array = $form->toArray();

        $this->assertIsArray($array);
        $this->assertEquals(null, $array['id']);
        $this->assertEquals('Form Name', $array['name']);
        $this->assertEquals('{\"id\":\"form-id\",\"name\": \"form-name\"}', $array['metadata']);
        $this->assertEquals('1', $array['is_active']);
    }

}
