<?php

namespace App\Http\Controllers\Admin\Category;

use App\Http\Requests\Category\DeleteRequest;
use App\Http\Resources\Category\CategoryResource;
use App\Models\Category;

class DeleteController extends BaseController
{
    public function __invoke(Category $category)
    {
        $category->delete();
        $categories = Category::all();
        return CategoryResource::collection($categories);
    }
}
