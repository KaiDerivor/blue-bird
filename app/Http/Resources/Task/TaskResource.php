<?php

namespace App\Http\Resources\Task;

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
            'id'=>$this->id,
            'task'=>$this->task,
            'answer'=>$this->answer,
            'content'=>$this->content,
            'category_id'=>$this->category_id,
            'tag_id'=>$this->tag_id,
            'task_type'=>$this->task_type,
            'number_of_task'=>$this->number_of_task
        ];
    }
}
