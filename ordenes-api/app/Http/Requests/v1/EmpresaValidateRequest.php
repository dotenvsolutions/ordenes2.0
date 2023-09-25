<?php

namespace App\Http\Requests\v1;

use Illuminate\Foundation\Http\FormRequest;

class EmpresaValidateRequest extends FormRequest
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
                'nombre' => 'required|string|max:500',
                'telefono' => 'nullable|string|max:15',
                'direccion' => 'nullable|string',
                'email' => 'required|email|max:250',
                'observacion' => 'nullable|string',
                'periodo' => 'required|string|max:4'
            ];
        }else{
            return [
                'nombre' => 'required|string|max:500',
                'telefono' => 'nullable|string|max:15',
                'direccion' => 'nullable|string',
                'email' => 'required|string|max:250',
                'observacion' => 'nullable|string',
                'periodo' => 'required|string|max:4'
            ];
        }   
    }

    public function messages()
    {
        if(request()->isMethod('post')){
            return [
                'nombre.required' => 'Es un campo requerido (Nombre)',
                'email.required' => 'Es un campo requerido (email)',
                'periodo.required' => 'Es un campo requerido (periodo)'
            ];
        }else{
            return [
                'nombre.required' => 'Es un campo requerido (Nombre)',
                'email.required' => 'Es un campo requerido (email)',
                'periodo.required' => 'Es un campo requerido (periodo)'
            ];
        }
    }
}
