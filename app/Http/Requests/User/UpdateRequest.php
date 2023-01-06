<?php

namespace App\Http\Requests\User;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
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
            'name' => 'nullable|string',
            'email' => 'nullable|email|unique:users',
            'role' => "nullable|string|in:$admin,$user",
            'likedTasks' => 'array',
            'likedTasks.*' => 'nullable|numeric|exists:tasks,id',
            'likedCategories' => 'array|max:5',
            'likedCategories.*' => 'nullable|numeric|exists:categories,id',
            'chart' => 'json',
            'password' => 'string'
        ];
    }
}
