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
            'numberOfTheme' => $this->numberOfTheme,
            'textUrl' => $this->textUrl,
            // 'category' => new CategoryResource(Category::find($this->category_id))
            'categoryId'=>$this->category_id
        ];
    }
}
