<?php

namespace App\Http\Resources\Task;

use App\Http\Resources\Rule\RuleResource;
use App\Http\Resources\Theme\ThemeResource;
use App\Models\Rule;
use App\Models\Theme;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'img' => $this->image,
            'answer' => $this->answer,
            'content' => $this->content,
            'category_id' => $this->category_id,
            'tag_id' => $this->tag_id,
            'task_type' => $this->task_type,
            'number_of_task' => $this->number_of_task,
            'test_qa' => $this->test_qa,
            'rule' => new RuleResource(Rule::find($this->rule_id)),
            'theme' => new ThemeResource(Theme::find($this->theme_id))
        ];
    }
}
