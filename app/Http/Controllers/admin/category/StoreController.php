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
        $response = $this->service->store($data);
        if ($response instanceof Category) {
            return new CategoryResource($response);
        } else {
            return response(['data' => $response]);
        }
    }
}
