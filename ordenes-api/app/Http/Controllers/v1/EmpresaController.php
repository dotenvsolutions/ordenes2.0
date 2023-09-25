<?php

namespace App\Http\Controllers\v1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\V1\Empresa as Empresas;
use App\Http\Requests\V1\EmpresaValidateRequest;

use Illuminate\Support\Facades\DB;

class EmpresaController extends Controller
{
    
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $empresas = Empresas::all();

        if(!$empresas || empty($empresas)){
            return response()->json([
                'status' => false,
                'message' => 'NO existen informacion de Empresas '
            ],404);
        }
        return response()->json([
            'status' => true,
            'message' => '',
            'empresas' => $empresas
        ],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $empresa =  DB::table('po_empresa')
                    ->selectRaw('*')
                    ->whereRaw('codigo = ?',[$id])
                    ->get();
        if(!$empresa){
            return response()->json([
                'status' => false,
                'message' => 'NO existen informacion de esta empresa'
            ],404);
        }   

        return response()->json([
            'status' => true,
            'message' => '',
            'empresa' => $empresa[0]
        ],200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EmpresaValidateRequest $request, string $id)
    {
        try {
            $update = DB::table('po_empresa')
                ->where('codigo',$id)
                ->update([
                    'nombre'=>$request->nombre,
                    'telefono' => $request->telefono,
                    'direccion' => $request->direccion,
                    'email' => $request->email,
                    'observacion' => $request->observacion,
                    'periodo' => $request->periodo,
                ]);
            return response()->json(['message' => 'Empresa actualizada con exito',],200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Ha ocurrido un error al actualizar la Empresa: '.$e
            ],203);
        }  
    }


}
