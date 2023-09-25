<?php

namespace App\Models\v1;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Empresa extends Model
{
    use HasFactory;

    protected $table = 'po_empresa';

    protected $fillable = [
        'nombre',
        'telefono',
        'direccion',
        'email',
        'logo',
        'observacion',
        'periodo'
    ];
}
