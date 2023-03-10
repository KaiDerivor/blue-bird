<?php

namespace App\Http\Requests\Category;

use Illuminate\Foundation\Http\FormRequest;

class RequestCreate extends FormRequest
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
            'title' => 'required|string|max:50|min:4|unique:categories',
            'img' => 'required|file|mimes:jpg,bmp,png,jpeg,svg',
            'description' => 'nullable|string',
            'tags' => 'array',
            'tags.*' => 'nullable|exists:tags,id',
            'slug' => 'nullable|string|max:20|unique:categories'
        ];
    }
}
