<?php

namespace App\Http\Requests\User;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class UserSearch extends FormRequest
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
        $admin = User::ROLE_ADMIN;
        $user = User::ROLE_USER;

        return [
            'name' => 'nulable|string|max:50',
            'email' => 'nullable|string|max:70',
            'role' => "nullable|string|in:$admin,$user,",

            'page' => 'nullable|integer',
            'per_page' => 'nullable|integer'
        ];
    }
}
