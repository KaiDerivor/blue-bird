<?php

namespace App\Http\Resources\User;

use App\Http\Resources\Category\CategoryIdResource;
use App\Http\Resources\Task\TaskIdResource;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'name' => $this->name,
            'email' => $this->email,
            'role' => $this->role,
            'likedTasks' => TaskIdResource::collection($this->tasks),
            'likedCategories' => CategoryIdResource::collection($this->categories),
            'chart' => $this->chart
        ];
    }
}
