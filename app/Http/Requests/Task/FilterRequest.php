<?php

namespace App\Http\Requests\Task;

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
            'ids' => 'nullable',
            'ids.*' => 'nullable|integer|exists:tasks,id',
            'tag_id' => 'nullable|exists:tags,id',
            'category_id' => 'nullable|exists:categories,id',
            'theme_id' => 'nullable|exists:themes,id',

            'page' => 'nullable|integer',
            'per_page' => 'nullable|integer'
        ];
    }
}
