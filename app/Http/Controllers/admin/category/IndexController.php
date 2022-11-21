<?php

namespace App\Http\Controllers\Admin\Category;

use App\Http\Resources\Category\CategoryResource;
use App\Models\Category;

class IndexController extends BaseController
{
    public function __invoke()
    {
        $categories = Category::all();
        return CategoryResource::collection($categories);
    }
}
