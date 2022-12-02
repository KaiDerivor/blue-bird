<?php

namespace App\Http\Resources\Category;

use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
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
            "title" => $this->title,
            'id'=>$this->id,
            'tags'=>$this->tags,
            'description'=>$this->description,
            'img'=>$this->img,
            'textUrl'=>$this->textUrl
        ];
    }
}