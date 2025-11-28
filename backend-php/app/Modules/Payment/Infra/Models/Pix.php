<?php

namespace App\Modules\Payment\Infra\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pix extends Model
{
    use HasFactory;
    protected $table='pix';
    protected $fillable = ['description', 'product_id', 'user_id','value', 'status','qr_code','tx_id', 'api_response'];
    protected $hidden = [''];
    protected $casts = [
        'id' => 'string',
    ];
}