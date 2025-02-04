<?php

namespace App\Modules\Payment\Infra\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pix extends Model
{
    use HasFactory;
    protected $table='pix_transaction';
    protected $fillable = ['*'];
    protected $hidden = [''];
    protected $casts = [
        'id' => 'string',
    ];
}