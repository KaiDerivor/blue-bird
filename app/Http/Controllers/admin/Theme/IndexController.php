<?php

namespace App\Http\Controllers\Admin\Theme;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\Admin\Theme\BaseController;
use App\Http\Requests\Theme\ThemeFilterRequest;
use App\Http\Resources\Theme\ThemeResource;
use App\Models\Theme;

class IndexController extends BaseController
{
    public function __invoke(ThemeFilterRequest $request)
    {
        $dataRequest=$request->validated();

        $themes = isset($dataRequest['categoryId'])
        ?Theme::where(['category_id'=>$dataRequest['categoryId']])->get()
        :Theme::all();

        return ThemeResource::collection($themes);
    }
}
