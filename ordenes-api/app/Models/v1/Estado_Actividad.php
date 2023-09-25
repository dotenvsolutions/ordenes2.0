<?php

namespace App\Models\v1;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Estado_Actividad extends Model
{
    use HasFactory;

    protected $table = 'po_estado_actividad';

    protected $fillable = [
        'empresa_id',
        'nombre',
        'observacion',
    ];

    public function empresa(): BelongsTo
    {
        return $this->belongsTo(Empresa::class);
    }
}
