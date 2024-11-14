<?php

namespace App\AppModules\Form\Infra\Models\EloquentORM;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormFieldOption extends Model
{
    use HasFactory;
    protected $table='form_field_option';
    protected $fillable = ['*'];
    protected $hidden = [''];
    protected $casts = [
        'id' => 'int',
        'form_field_id' => 'int'
    ];
}