<?php

namespace App\Http\Controllers\Admin\Tag;

use App\Http\Resources\Tag\TagResource;
use App\Models\Tag;

class DeleteController extends BaseController
{
    public function __invoke(Tag $tag)
    {
       $tag->delete();
       
       $tags = Tag::all();
        return response(TagResource::collection($tags));
    }
}
