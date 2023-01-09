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
            'img'=>'nullable|file|mimes:jpg,bmp,png,jpeg',
            'answer'=>'required|string',
            'content'=>'nullable|string',
            'category_id'=>'required|exists:categories,id',
            'tag_id'=>'nullable|integer|exists:tags,id',
            'number_of_task'=>'required|integer',
            'task_type' => 'required|string|in:letter4,letter5,range1,range2,range3,letters4,letters3,default',
            'test_qa'=>'nullable|json',
            'rule_id' =>'nullable|integer|exists:rules,id',
            'theme_id' =>'nullable|integer|exists:themes,id',
        ];
    }
}
