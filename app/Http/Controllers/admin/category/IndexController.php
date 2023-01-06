<?php

namespace App\Http\Controllers\Admin\Category;

use App\Http\Requests\Category\CategoryTagRequest;
use App\Http\Resources\Category\CategoryResource;
use App\Models\Category;
use Illuminate\Support\Facades\Log;

class IndexController extends BaseController
{
    public function __invoke()
    {
        $log = auth()->user() ? auth()->user()->email : request()->ip();
        Log::info('User requested categories ' . $log);

        $categories = Category::orderBy('title', 'asc')->get();
        return CategoryResource::collection($categories);
    }
}
