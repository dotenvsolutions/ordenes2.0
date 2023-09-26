<?php

namespace App\Models\v1;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Proyecto extends Model
{
    use HasFactory;

    protected $table = 'po_proyectos';

    protected $fillable = [
        'uuid',
        'empresa_id',
        'cliente_id',
        'nombre',
        'descripcion_corta',
        'fecha_entrega',
        'icono',
        'activo',
        'user_registro',
        'user_modifica'
    ];

    public function empresa(): BelongsTo
    {
        return $this->belongsTo(Empresa::class);
    }
}
