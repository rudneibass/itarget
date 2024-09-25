<?php

namespace Database\Factories\AppModules\Api\Infra\Models\EloquentORM;

use App\AppModules\Api\Infra\Models\EloquentORM\Registration;
use Illuminate\Database\Eloquent\Factories\Factory;

class RegistrationFactory extends Factory
{
    protected $model = Registration::class;

    public function definition()
    {
        return [
            'name' => $this->faker->name,
            'email' => $this->faker->unique()->safeEmail,
            'cpf' => $this->faker->numerify('###########'), // 11 dígitos para CPF fictício
            'event_id' => $this->faker->randomNumber(),
        ];
    }
}
