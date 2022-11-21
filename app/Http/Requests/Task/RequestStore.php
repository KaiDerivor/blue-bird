<?php

namespace App\Http\Requests\Task;

use Illuminate\Foundation\Http\FormRequest;

class RequestStore extends FormRequest
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
            'file'=>'required|file',
            'answer'=>'string',
            'content'=>'string',
            'category_id'=>'required',
            'tags'=>'',
            'number_of_task'=>''

        ];
    }
    public function messages()
    {
        return [
            'file.required'=>'Unload file, please',
            'answer.required'=>'Input answer, please',
            'category_id'=>'Choose category, please',

        ];
    }
}
