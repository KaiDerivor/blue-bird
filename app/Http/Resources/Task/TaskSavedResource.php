<?php

namespace App\Http\Resources\Task;

use App\Http\Resources\Category\CategoryResource;
use App\Http\Resources\Tag\TagResource;
use App\Models\Category;
use App\Models\Tag;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskSavedResource extends JsonResource
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
            'category'=> new CategoryResource(Category::find($this->category_id)),
            'tag'=>new TagResource(Tag::find($this->tag_id)),
            'task_type'=>$this->task_type,
            'numberOfTask'=>$this->number_of_task,
            'test_qa'=>$this->test_qa
        ];
    }
}
