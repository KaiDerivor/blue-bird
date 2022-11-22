<?php

namespace App\Http\Controllers\Admin\Tag;

use App\Http\Resources\Tag\TagResource;
use App\Models\Tag;

class IndexController extends BaseController
{
    public function __invoke()
    {
        $tags = Tag::all();
        return response(TagResource::collection($tags));
    }
}
