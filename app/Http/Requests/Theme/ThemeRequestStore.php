<?php

namespace App\Http\Requests\Theme;

use Illuminate\Foundation\Http\FormRequest;

class ThemeRequestStore extends FormRequest
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
            'title'=>'required|string|min:3|unique:themes',
            'description'=>'nullable|string',
            'slug'=>'nullable|string|unique:themes',
            'numberOfTheme'=>'required|integer',
            'category_id'=>'nullable|exists:categories,id'
        ];
    }
}
