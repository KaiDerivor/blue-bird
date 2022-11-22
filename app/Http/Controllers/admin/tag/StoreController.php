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
        $msg = $this->service->store($data);

        $tags = Tag::all();
        return response(TagResource::collection($tags));
    }
}
