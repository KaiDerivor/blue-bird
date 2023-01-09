<?php

namespace App\Http\Controllers\Admin\Tag;

use App\Http\Requests\Tag\Request;
use App\Http\Requests\Tag\RequestUpdate;
use App\Http\Resources\Tag\TagResource;
use App\Models\Tag;

class UpdateController extends BaseController
{
    public function __invoke(RequestUpdate $request, Tag $tag)
    {
        $data = $request->validated();
        $response = $this->service->update($tag, $data);
        if ($response instanceof Tag) {
            return new TagResource($response);
        } else {
            return response(['data' => $response]);
        }
    }
}
