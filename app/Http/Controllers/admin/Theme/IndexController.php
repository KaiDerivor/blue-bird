<?php

namespace App\Http\Controllers\Admin\Theme;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\Admin\Theme\BaseController;
use App\Http\Filters\SubFilterByCategory;
use App\Http\Requests\Theme\ThemeFilterRequest;
use App\Http\Resources\Theme\ThemeResource;
use App\Models\Theme;

class IndexController extends BaseController
{
    public function __invoke(ThemeFilterRequest $request)
    {
      
        $data = $request->validated();
        $page = $data['page'] ?? 1;
        $perPage = $data['per_page'] ?? 50;

        $filter = app()->make(SubFilterByCategory::class, ['queryParams' => array_filter($data)]);

        $filter = new SubFilterByCategory($data);
        $themes = Theme::filter($filter)->paginate($perPage,['*'],'page',$page);
        return  ThemeResource::collection(($themes));

    }
}
