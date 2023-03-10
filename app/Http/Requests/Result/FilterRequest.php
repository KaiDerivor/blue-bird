<?php

namespace App\Http\Requests\Result;

use Illuminate\Foundation\Http\FormRequest;

class FilterRequest extends FormRequest
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
            'categoryId' => 'nullable|exists:categories,id',
            'tagId' => 'nullable|exists:tags,id',
        ];
    }
}
