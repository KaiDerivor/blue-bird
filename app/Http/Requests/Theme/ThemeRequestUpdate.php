<?php

namespace App\Http\Requests\Theme;

use Illuminate\Foundation\Http\FormRequest;

class ThemeRequestUpdate extends FormRequest
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
            'title'=>'required|string|min:3',
            'description'=>'nullable|string',
            'slug'=>'nullable|string',
            'numberOfTheme'=>'required|integer',
            'category_id'=>'nullable|exist:categories,id'
        ];
    }
}
