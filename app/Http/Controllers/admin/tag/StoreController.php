<?php

namespace App\Http\Controllers\Admin\Tag;

use App\Http\Requests\Tag\RequestCreate;
use App\Http\Resources\Tag\TagResource;
use App\Models\Tag;

class StoreController extends BaseController
{
    public function __invoke(RequestCreate $request)
    {
        $data = $request->validated();
        $response = $this->service->store($data);
        if ($response instanceof Tag) {
            return new TagResource($response);
        } else {
            return response(['data' => $response]);
        }
    }
}
