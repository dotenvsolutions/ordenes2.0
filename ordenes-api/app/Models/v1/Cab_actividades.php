<?php

namespace App\Models\v1;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cab_actividades extends Model
{
    use HasFactory;

    protected $table = 'po_cab_actividad';

    protected $fillable = [
        'uuid',
        'empresa_id',
        'proyecto_id',
        'user_id',
        'estado_id',
        'descripcion',
        'fecha_entrega',
        'observacion',
        'icono',
        'user_registro',
    ];

    public function empresa(): BelongsTo
    {
        return $this->belongsTo(Empresa::class);
    }
}
