<?php declare(strict_types=1);

namespace App\AppModules\Api\Domain\Entities;

use Exception;

abstract class DtoBase 
{
    public function __construct(array $data)
    {
        foreach ($data as $key => $value) {
            if (mb_strstr($key, '_') !== false) {
                $key = lcfirst(str_replace('_', '', ucwords($key, '_')));
            }

            if (!property_exists($this, $key)) {
                throw new Exception('Proproedade $'.$key. ' não existe no Dto.'. get_class($this));
            }

            $this->{$key} = $value;
        }
    }
}