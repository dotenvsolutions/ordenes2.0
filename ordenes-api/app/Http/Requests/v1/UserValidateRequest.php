<?php

namespace App\Http\Requests\v1;

use Illuminate\Foundation\Http\FormRequest;

class UserValidateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        if(request()->isMethod('post')){
            return [
                'empresa_id' => 'required|integer',
                'rol_id' => 'required|integer',
                'user_name' => 'required|string|max:250',
                'user_pass' => 'required|string|max:250',
                'nombre' => 'required|string|max:500',
                'email' => 'required|email|max:250',
                'email_verified_at' => 'nullable|string',
                'observacion' => 'nullable|string',
            ];
        }else{
            return [
                'rol_id' => 'required|integer',
                'user_name' => 'required|string|max:250',
                'user_pass' => 'required|string|max:250',
                'nombre' => 'required|string|max:500',
                'email_verified_at' => 'nullable|string',
                'observacion' => 'nullable|string',
            ];
        }   
    }

    public function messages()
    {
        if(request()->isMethod('post')){
            return [
                'nombre.required' => 'Es un campo requerido (Nombre)',
                'empresa_id.required' => 'Es un campo requerido (Empresa)',
                'rol_id.required' => 'Es un campo requerido (Rol)',
                'user_name.required' => 'Es un campo requerido (Usuario)',
                'user_pass.required' => 'Es un campo requerido (Contraseña)',
                'email.required' => 'Es un campo requerido (Email)',
            ];
        }else{
            return [
                'nombre.required' => 'Es un campo requerido (Nombre)',
                'user_name.required' => 'Es un campo requerido (Usuario)',
                'user_pass.required' => 'Es un campo requerido (Contraseña)',
            ];
        }
    }
}
