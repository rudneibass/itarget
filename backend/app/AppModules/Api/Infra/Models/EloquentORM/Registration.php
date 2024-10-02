<?php

namespace App\AppModules\Api\Infra\Models\EloquentORM;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Registration extends Model
{
    use HasFactory;
    protected $table='registrations';
    protected $fillable = ['name', 'email', 'cpf', 'event_id', 'registration_id', 'published'];
    protected $hidden = [''];
    protected $casts = ['id' => 'string'];

    public function events() {
        return $this->belongsToMany(Event::class);
    }
}
