<?php declare(strict_types=1);

namespace App\Modules\Payment\Domain\Base;

use Exception;
use ReflectionClass;
use ReflectionProperty;

abstract class DtoBase
{
    public function __construct(array $data)
    {
        $this->validateExistingProperties($this->snakeCaseToCamelCase($data));
        $this->validateRequiredProperties($this->snakeCaseToCamelCase($data));
        $this->validateNotNullProperties($this->snakeCaseToCamelCase($data));
        $this->validatePropertiesTypes($this->snakeCaseToCamelCase($data));
        $this->populateProperties($this->snakeCaseToCamelCase($data));
    }

    private static function snakeCaseToCamelCase(array $data): array
    {
        $result = [];
        foreach ($data as $key => $value) {
            if (mb_strstr($key, '_')) { 
                $key = lcfirst(str_replace('_', '', ucwords($key, '_'))); 
            }
            $result[$key] = $value;
        }
        return $result;
    }

    private function validateExistingProperties(array $data): void
    {
        $reflection = new ReflectionClass($this);

        foreach ($data as $key => $value) {
            if (!$reflection->hasProperty($key)) { 
                throw new Exception('Propriedade $' . $key . ' não existe. \n' . get_class($this));
            }
        }
    }

    private function validateRequiredProperties(array $data): void
    {
        $reflection = new ReflectionClass($this);
        $properties = $reflection->getProperties(ReflectionProperty::IS_PUBLIC);

        foreach ($properties as $property) {
            if ($property->getType() !== null && !$property->getType()->allowsNull()) {
                if (!array_key_exists($property->getName(), $data)) {
                    throw new Exception("A propriedade obrigatória '{$property->getName()}' está ausente no array de entrada. " . get_class($this));
                }
            }
        }
    }

    private function validateNotNullProperties(array $data): void
    {
        $reflection = new ReflectionClass($this);

        foreach ($data as $key => $value) {
            if (!$reflection->hasProperty($key)) { continue; }

            $property = $reflection->getProperty($key);
            
            if ($value === null && !$property->getType()->allowsNull()) {
                throw new Exception("A propriedade '{$key}' não permite valores nulos. " . get_class($this));
            }
        }
    }

    private function validatePropertiesTypes(array $data): void
    {
        $reflection = new ReflectionClass($this);

        foreach ($data as $key => $value) {
            if (!$reflection->hasProperty($key)) { continue; }

            $property = $reflection->getProperty($key);
            
            if ($property->getType() !== null) {
                if ($value !== null && !$this->isValueOfType($value, $property->getType()->getName())) {
                    throw new Exception("Tipo inválido para a propriedade '{$key}'. Esperado: {$property->getType()->getName()}, recebido: " . gettype($value) . " \n" . get_class($this));
                }
            }
        }
    }

    private function populateProperties(array $data): void
    {
        $reflection = new ReflectionClass($this);
        
        foreach ($data as $key => $value) {
            if (!$reflection->hasProperty($key)) { continue; }
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
