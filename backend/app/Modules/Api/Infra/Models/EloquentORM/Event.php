<?php

namespace App\Modules\Api\Infra\Models\EloquentORM;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;
    protected $table='events';
    protected $fillable = [''];
    protected $hidden = [''];
    protected $casts = ['id' => 'int'];
}