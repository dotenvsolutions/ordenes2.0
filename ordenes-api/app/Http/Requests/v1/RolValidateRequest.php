<?php

namespace App\Http\Requests\v1;

use Illuminate\Foundation\Http\FormRequest;

class RolValidateRequest extends FormRequest
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
                'nombre' => 'required|string|max:500',
                'observacion' => 'nullable|string',
            ];
        }else{
            return [
                'nombre' => 'required|string|max:500',
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
            ];
        }else{
            return [
                'nombre.required' => 'Es un campo requerido (Nombre)',
            ];
        }
    }
}
