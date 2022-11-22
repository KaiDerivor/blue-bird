<?php

namespace App\Http\Controllers\Admin\Category;

use App\Http\Requests\Category\RequestCreate;
use App\Http\Resources\Category\CategoryResource;
use App\Models\Category;

class StoreController extends BaseController
{
    public function __invoke(RequestCreate $request)
    {
        $data = $request->validated();

        $msg = $this->service->store($data);
        if ($msg) {
            return response([$msg]);
        } else {
            $categories = Category::all();
            return CategoryResource::collection($categories);
        }
    }
}
