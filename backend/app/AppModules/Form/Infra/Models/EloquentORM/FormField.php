<?php

namespace App\AppModules\Form\Infra\Models\EloquentORM;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormField extends Model
{
    use HasFactory;
    protected $table='form_field';
    protected $fillable = ['form_id', 'name', 'attributes','rules', 'order'];
    protected $casts = [
        'id' => 'string',
        'form_id' => 'string'
    ];
}