<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ConfirmPaymentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->role === 'technician';
    }

    public function rules(): array
    {
        return [
            'payment_id' => ['required', 'integer', 'exists:payments,id'],
            'cod_oper'   => ['required', 'string', 'max:255'],
        ];
    }

    public function messages(): array
    {
        return [
            'payment_id.required' => 'El ID del pago es requerido.',
            'payment_id.exists'   => 'El pago no existe.',
            'cod_oper.required'   => 'El código de operación de PagueloFácil es requerido.',
        ];
    }
}