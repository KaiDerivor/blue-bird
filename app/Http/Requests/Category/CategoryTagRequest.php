<?php

namespace App\Http\Requests\Category;

use Illuminate\Foundation\Http\FormRequest;

class CategoryTagRequest extends FormRequest
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
            'maxTime' => 'required|string',
            'table200img' => 'nullable|file',
            'table12img' => 'nullable|file',
            'someInfo' => 'nullable|string',
            'maxPoints' => 'required|integer'
        ];
    }
}
