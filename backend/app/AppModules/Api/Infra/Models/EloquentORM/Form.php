<?php

namespace App\AppModules\Api\Infra\Models\EloquentORM;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Form extends Model
{
    use HasFactory;
    protected $table='form';
    protected $fillable = ['name', 'attributes'];
    protected $hidden = [''];
    protected $casts = [
        'id' => 'int',
    ];
}