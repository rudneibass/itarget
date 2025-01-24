<?php declare(strict_types=1);

namespace App\Modules\Form\Domain\Base;

use Exception;
use ReflectionClass;
use ReflectionProperty;

abstract class DtoBase
{
    public function __construct(array $data)
    {
        $this->validateRequiredProperties($data);
        $this->populateProperties($data);
    }

    private function validateRequiredProperties(array $data): void
    {
        $reflection = new ReflectionClass($this);
        $properties = $reflection->getProperties(ReflectionProperty::IS_PUBLIC);

        foreach ($properties as $property) {
            $type = $property->getType();

            if ($type !== null && !$type->allowsNull()) {
                $propertyName = $property->getName();

                if (!array_key_exists($propertyName, $data)) {
                    throw new Exception("A propriedade obrigatória '{$propertyName}' está ausente no array de entrada. " . get_class($this));
                }
            }
        }
    }

    private function populateProperties(array $data): void
    {
        $reflection = new ReflectionClass($this);

        foreach ($data as $key => $value) {
            if (mb_strstr($key, '_') !== false) { $key = lcfirst(str_replace('_', '', ucwords($key, '_'))); }

            if (!$reflection->hasProperty($key)) { throw new Exception('Propriedade $' . $key . ' não existe. \n' . get_class($this));}

            $property = $reflection->getProperty($key);
            $type = $property->getType();

            if ($type !== null) {
                $typeName = $type->getName();
                $allowsNull = $type->allowsNull();

                if ($value === null && !$allowsNull) {
                    throw new Exception("A propriedade '{$key}' não permite valores nulos. " . get_class($this));
                }

                if ($value !== null && !$this->isValueOfType($value, $typeName)) {
                    throw new Exception("Tipo inválido para a propriedade '{$key}'. Esperado: {$typeName}, recebido: " . gettype($value) . " \n" . get_class($this));
                }
            }

            $this->{$key} = $value;
        }
    }

    private function isValueOfType($value, string $type): bool
    {
        switch ($type) {
            case 'int':
                return is_int($value);
            case 'float':
                return is_float($value);
            case 'string':
                return is_string($value);
            case 'bool':
                return is_bool($value);
            case 'array':
                return is_array($value);
            case 'object':
                return is_object($value);
            default:
                return $value instanceof $type;
        }
    }
}
