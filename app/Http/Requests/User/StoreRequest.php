<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name'=>'string|required',
            'email'=>'email|required|unique:users',
            'password'=>'string|required|confirmed',
            'password_confirmation'=>'string|required'
        ];
    }
    public function messages()
    {
        return [
            'email.unique'=>'Користувач з таким емейлом уже існує'
        ];
    }
}
