<?php

namespace App\Http\Requests\Task;

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
            'file' => '',
            'answer' => '',
            'content' => '',
            'category_id' => 'required',
            'tags' => '',
            'number_of_task' => ''
        ];
    }
    public function messages()
    {
        return [
            'category_id' => 'Choose category, please',

        ];
    }
}
