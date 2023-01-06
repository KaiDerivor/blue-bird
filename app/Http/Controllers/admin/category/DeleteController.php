<?php

namespace App\Http\Controllers\Admin\Category;

use App\Http\Requests\Category\DeleteRequest;
use App\Http\Resources\Category\CategoryResource;
use App\Models\Category;
use Illuminate\Support\Facades\Log;

class DeleteController extends BaseController
{
    public function __invoke(Category $category)
    {
        $log = auth()->user() ? auth()->user()->email : request()->ip();
        Log::warning('User ' .$log. ' delete category->id ' . $category->id);
        
        $category->tags()->sync([]);
        $category->delete();
        $categories = Category::orderBy('title', 'asc')->get();
        return CategoryResource::collection($categories);
    }
}
