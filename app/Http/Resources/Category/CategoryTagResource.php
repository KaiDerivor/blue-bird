<?php

namespace App\Http\Resources\Category;

use App\Http\Resources\Tag\TagResource;
use App\Models\Category;
use App\Models\Tag;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryTagResource extends JsonResource
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
            'category' => new CategoryTagCategoryResource(Category::find($this->category_id)),
            'tag' => new TagResource(Tag::find($this->tag_id)),
            'maxTime' => $this->maxTime,
            'table200img' => $this->table200img,
            'table12img' => $this->table12img
        ];
    }
}
