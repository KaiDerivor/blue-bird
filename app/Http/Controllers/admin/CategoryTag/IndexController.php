<?php

namespace App\Http\Controllers\Admin\CategoryTag;

use  App\Http\Controllers\Admin\CategoryTag\BaseController;
use App\Http\Controllers\Controller;
use App\Http\Filters\ResultSubFilter;
use App\Http\Requests\Category\FilterCategoryTagRequest;
use App\Http\Resources\Category\CategoryTagResource;
use App\Models\CategoryTags;
use Illuminate\Http\Request;

class IndexController extends BaseController
{
    public function __invoke(FilterCategoryTagRequest $request)
    {
        $data = $request->validated();
        $page = $data['page'] ?? 1;
        $perPage = $data['per_page'] ?? 1050;

        $filter = app()->make(ResultSubFilter::class, ['queryParams' => array_filter($data)]);

        $filter = new ResultSubFilter ($data);
        $subjects = CategoryTags::filter($filter)->paginate($perPage,['*'],'page',$page);
        return  CategoryTagResource::collection(($subjects));


    }
}