<?php

namespace App\Http\Controllers\Admin\Category;

use App\Http\Requests\Category\CategoryTagRequest;
use App\Http\Resources\Category\CategoryResource;
use App\Models\Category;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class IndexController extends BaseController
{
    public function __invoke()
    {
        $log = auth()->user() ? auth()->user()->email : request()->ip();
        Log::info('User requested categories ' . $log);

      
        return CategoryResource::collection($this->getCasheOrStore());
    }
    private function getCasheOrStore()
    {
        $categoriesFromCashe = Cache::get('categories');
        if ($categoriesFromCashe) {
            return $categoriesFromCashe;
        } else {
            $categories = Category::orderBy('title', 'asc')->get();
            Cache::forever('categories', $categories);
            return $categories;
        }
    }
}
