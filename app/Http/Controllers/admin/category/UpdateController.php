<?php

namespace App\Http\Controllers\Admin\Category;

use App\Http\Requests\Category\RequestUpdate;
use App\Http\Resources\Category\CategoryResource;
use App\Models\Category;
use App\Models\CategoryTags;

class UpdateController extends BaseController
{
    public function __invoke(RequestUpdate $request, Category $category)
    {
        $data = $request->validated();
        $msg=$this->service->update($category, $data);
        if($msg instanceof Category){
            return new CategoryResource($msg);
        }else{
            return response(['data'=>$msg]);
        }
    }
}
