<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User as Usuarios;
use App\Http\Requests\V1\UserValidateRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class UsuarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(int $empresa)
    {
        $usuarios =  DB::table('po_usuarios')
                    ->selectRaw('*')
                    ->whereRaw('empresa_id = ?',[$empresa])
                    ->get();
        if(!$usuarios || count($usuarios) == 0){
            return response()->json([
                'status' => false,
                'message' => 'NO existen informacion de usuarios '
            ],404);
        }
        return response()->json([
            'status' => true,
            'message' => '',
            'usuarios' => $usuarios
        ],200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserValidateRequest $request)
    {
        try{       
            $sql = DB::table('po_usuarios')->selectRaw('count(user_name) as veces')
                ->whereRaw('user_name = ? AND empresa_id = ?',[$request->nombre,$request->empresa_id])->get();
            if(intval($sql[0]->veces)>0){
                return response()->json([
                    'status' => false,
                    'msg' => 'Nombre de usuario previamente creado!'
                ],403);
            }
            DB::table('po_usuarios')->insert([
                'uuid' => Str::uuid(),
                'empresa_id' => $request->empresa_id,
                'rol_id' => $request->rol_id,
                'nombre'=>$request->nombre,
                'user_name'=>$request->user_name,
                'user_pass'=>$request->user_pass,
                'email' => $request->email,
                'observacion' => $request->observacion
            ]);     
            return response()->json([
                'status' => true,
                'msg' => 'Usuario añadido con exito'
            ],200);
            
        }catch(\Exception $e){
            return response()->json([
                'status' => false,
                'msg' => 'Ocurrio un error al crear el Usuario: '.$e
            ],500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(int $empresa, string $id)
    {
        $user =  DB::table('po_usuarios')
                ->selectRaw('*')
                ->whereRaw('uuid = ? AND empresa_id = ?',[$id, $empresa])
                ->get();
        if(!$user || count($user) == 0){
            return response()->json([
                'status' => false,
                'message' => "NO existe informacion de esta rol [$id]"
            ],404);
        }   

        return response()->json([
            'status' => true,
            'message' => '',
            'rol' => $user[0]
        ],200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserValidateRequest $request, int $empresa, string $id)
    {
        try {
            $update = DB::table('po_usuarios')
                ->whereRaw('uuid = ? AND empresa_id = ?',[$id,$empresa])
                ->update([
                    'rol_id' => $request->rol_id,
                    'nombre'=>$request->nombre,
                    'user_name'=>$request->user_name,
                    'user_pass'=>$request->user_pass,
                    'observacion' => $request->observacion
                ]);
            return response()->json(['status' => true,'message' => 'Usuario actualizado con exito',],200);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Ha ocurrido un error al actualizar el Usuario: '.$e
            ],500);
        }  
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $empresa, string $id)
    {
        //
    }
}
