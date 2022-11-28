<?php

namespace App\Http\Controllers\Admin\Category;

use App\Http\Requests\Category\DeleteRequest;
use App\Http\Resources\Category\CategoryResource;
use App\Models\Category;

class DeleteController extends BaseController
{
    public function __invoke(Category $category)
    {
        $category->tags()->sync([]);
        $category->delete();
        $categories = Category::orderBy('title','asc')->get();
        return CategoryResource::collection($categories);
    }
}
