<?php

namespace App\Http\Controllers\Admin\Tag;

use App\Http\Resources\Tag\TagResource;
use App\Models\Tag;
use Illuminate\Support\Facades\Log;

class DeleteController extends BaseController
{
    public function __invoke(Tag $tag)
    {
        $log = auth()->user() ? auth()->user()->email : request()->ip();
        Log::warning('User ' . $log . ' delete category->id ' . $tag->id);
        
        $tag->delete();
        $tags = Tag::all();
        return TagResource::collection($tags);
    }
}
