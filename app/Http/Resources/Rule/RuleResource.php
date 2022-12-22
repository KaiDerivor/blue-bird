<?php

namespace App\Http\Resources\Rule;

use App\Http\Resources\Category\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Resources\Json\JsonResource;

class RuleResource extends JsonResource
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
            'title' => $this->title,
            'description' => $this->description,
            // 'category' => new CategoryResource(Category::find($this->category_id))
            'categoryId'=>$this->category_id
        ];
    }
}
