<?php

namespace App\Http\Resources\Theme;

use App\Http\Resources\Category\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Resources\Json\JsonResource;

class ThemeResource extends JsonResource
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
            'numberOfTheme' => $this->number_of_theme,
            'slug' => $this->slug,
            'categoryId'=>$this->category_id
        ];
    }
}
