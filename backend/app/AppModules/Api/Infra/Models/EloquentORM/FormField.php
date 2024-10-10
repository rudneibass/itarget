<?php

namespace App\AppModules\Api\Infra\Models\EloquentORM;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormField extends Model
{
    use HasFactory;
    protected $table='form_field';
    protected $fillable = ['*'];
    protected $hidden = [''];
    protected $casts = [
        'id' => 'string',
        'form_id' => 'string'
    ];
}