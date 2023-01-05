<?php

namespace App\Http\Requests\Category;

use Illuminate\Foundation\Http\FormRequest;

class RequestUpdate extends FormRequest
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
            'title' => 'required|string|max:50|min:4',
            'img' => '',
            'description' => '',
            'tags' => '',
            'slug' => 'nullable|string|max:20',
        ];
    }
}
