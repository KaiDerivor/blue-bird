<?php

namespace App\Http\Controllers\Admin\Tag;

use App\Http\Resources\Tag\TagResource;
use App\Models\Tag;
use Illuminate\Support\Facades\Log;

class IndexController extends BaseController
{
    public function __invoke()
    {
        $log = auth()->user() ? auth()->user()->email : request()->ip();
        Log::info('User requested tag ' . $log);

        $tags = Tag::all();
        return TagResource::collection($tags);
    }
}
