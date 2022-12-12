<?php

namespace App\Http\Controllers\Admin\CategoryTag;

use  App\Http\Controllers\Admin\CategoryTag\BaseController;
use App\Http\Requests\Category\CategoryTagRequest;
use App\Models\CategoryTags;
use Illuminate\Http\Request;

class UpdateController extends BaseController
{
    public function __invoke(CategoryTagRequest $request, CategoryTags $categoryTag)
    {
        $dataRequest = $request->validated();
        $response = $this->service->updateCategoryTags($categoryTag, $dataRequest);
        if ($response instanceof CategoryTags) {
            return $response;
        } else {
            return response(['data' => $response]);
        }
    }
}
