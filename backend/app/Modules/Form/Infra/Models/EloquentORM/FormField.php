<?php

namespace App\Modules\Form\Infra\Models\EloquentORM;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormField extends Model
{
    use HasFactory;
    protected $table='form_field';
    protected $fillable = ['form_id', 'name', 'attributes','rules', 'order','is_active'];
    protected $casts = [
        'id' => 'string',
        'form_id' => 'string',
        'is_active' => 'string'
    ];
}