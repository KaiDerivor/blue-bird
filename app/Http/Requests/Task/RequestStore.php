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
            'task'=>'file',
            'answer'=>'string',
            'content'=>'',
            'category_id'=>'required',
            'tag_id'=>'string',
            'number_of_task'=>'required',
            'task_type' => 'required|string|in:letter4,letter5,range1,range2,range3,letters4,letters3,default',
            'test_qa'=>'json',
            'rule_id' =>'integer',
            'theme_id' =>'integer'
        ];
    }

}
