<?php

namespace App\Models\v1;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;

    protected $table = 'po_clientes';

    protected $fillable = [
        'uuid',
        'empresa_id',
        'tipo_identifica',
        'cedula',
        'nombres_apellidos',
        'telefono_fijo',
        'telefono_movil',
        'telefono_otro',
        'direccion_primaria',
        'direccion_secundaria',
        'email',
        'observacion',
        'fechai',
        'activo',
        'user_registro',
        'user_modifica'
    ];

    public function empresa(): BelongsTo
    {
        return $this->belongsTo(Empresa::class);
    }
}
