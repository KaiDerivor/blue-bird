<?php

namespace App\Http\Requests\Event;

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
        return [
            'title' => 'string|required|max:50',
            'description' => 'string|max:200',
            'eventType' => 'string|required|in:update,zno',
            'time' => 'nullable|string|max:50|min:8',
            'categoryId' => 'nullable|integer|exists:categories,id'
        ];
    }
}
