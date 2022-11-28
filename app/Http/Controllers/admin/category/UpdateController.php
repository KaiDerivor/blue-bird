<?php

namespace App\Http\Controllers\Admin\Category;

use App\Http\Requests\Category\RequestUpdate;
use App\Http\Resources\Category\CategoryResource;
use App\Models\Category;

class UpdateController extends BaseController
{
    public function __invoke(RequestUpdate $request, Category $category)
    {
        // return response('data');

        $data = $request->validated();
        $msg=$this->service->update($category, $data);
       return new CategoryResource($msg);
    }
}
