<?php

namespace App\Models\v1;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mov_actividades extends Model
{
    use HasFactory;

    protected $table = 'po_act_moviento';

    protected $fillable = [
        'empresa_id',
        'actividad_id',
        'estado_id',
        'estado_id',
        'fecha_entrega',
        'descripcion',
        'user_registro',
        'user_modifica',
    ];

    public function empresa(): BelongsTo
    {
        return $this->belongsTo(Empresa::class);
    }
}
