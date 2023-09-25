<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\V1\Rol as Roles;
use App\Http\Requests\V1\RolValidateRequest;
use Illuminate\Support\Facades\DB;

class RolController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(int $empresa)
    {
        $roles =  DB::table('po_roles')
                    ->selectRaw('*')
                    ->whereRaw('empresa_id = ?',[$empresa])
                    ->get();
        if(!$roles || count($roles) == 0){
            return response()->json([
                'status' => false,
                'message' => 'NO existen informacion de roles '
            ],404);
        }
        return response()->json([
            'status' => true,
            'message' => '',
            'roles' => $rol
        ],200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RolValidateRequest $request)
    {
        try{       
            $sql = DB::table('po_roles')->selectRaw('count(nombre) as veces')->whereRaw('nombre = ?',[$request->nombre])->get();
            if(intval($sql[0]->veces)>0){
                return response()->json([
                    'msg' => 'Rol previamente creado!'
                ],403);
            }
            DB::table('po_roles')->insert([
                'empresa_id' => $request->empresa_id,
                'nombre'=>$request->nombre,
                'observacion' => $request->observacion
            ]);     
            return response()->json([
                'msg' => 'Rol añadido con exito'
            ],200);
            
        }catch(\Exception $e){
            return response()->json([
                'msg' => 'Ocurrio un error al crear el Rol: '.$e
            ],500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(int $empresa,int $id)
    {
        $rol =  DB::table('po_roles')
                ->selectRaw('*')
                ->whereRaw('codigo = ? AND empresa_id = ?',[$id, $empresa])
                ->get();
        if(!$rol || count($rol) == 0){
            return response()->json([
                'status' => false,
                'message' => "NO existe informacion de esta rol [$id]"
            ],404);
        }   

        return response()->json([
            'status' => true,
            'message' => '',
            'rol' => $rol[0]
        ],200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(RolValidateRequest $request, int $empresa, int $id)
    {
        try {
            $update = DB::table('po_roles')
                ->whereRaw('codigo = ? AND empresa_id = ?',[$id,$empresa])
                ->update([
                    'nombre'=>$request->nombre,
                    'observacion' => $request->observacion
                ]);
            return response()->json(['status' => true,'message' => 'Rol actualizado con exito',],200);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Ha ocurrido un error al actualizar el Rol: '.$e
            ],500);
        }  
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $empresa,int $id)
    {
        try {
            $deleted = DB::table('po_roles')->whereRaw('codigo = ? AND empresa_id = ?',[$id,$empresa])->delete();
            return response()->json([
                'status' => true,
                'msg' => 'Rol eliminado con exito'
            ],200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => "Ha ocurrido un error al eliminar el Rol[{$id}]: " .$e
            ],500);
        }
    }
}
