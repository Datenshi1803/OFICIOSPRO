<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class InitiatePaymentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->role === 'technician';
    }

    public function rules(): array
    {
        return [
            'package_id' => ['required', 'integer', 'exists:bid_credit_packages,id'],
        ];
    }

    public function messages(): array
    {
        return [
            'package_id.required' => 'Debes seleccionar un paquete.',
            'package_id.exists'   => 'El paquete seleccionado no existe.',
        ];
    }
}