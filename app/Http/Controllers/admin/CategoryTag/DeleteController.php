<?php

namespace App\Http\Controllers\Admin\CategoryTag;

use  App\Http\Controllers\Admin\CategoryTag\BaseController;
use App\Http\Resources\Category\CategoryTagResource;
use App\Models\CategoryTags;
use Illuminate\Http\Request;

class DeleteController extends BaseController
{
    public function __invoke(CategoryTags $categoryTag)
    {
        $categoryTag->delete();
        $categoryTags = CategoryTags::all();
        return CategoryTagResource::collection(($categoryTags));
    }
}
