<?php

namespace App\Http\Controllers\Admin\Tag;

use App\Http\Resources\Tag\TagResource;
use App\Models\Tag;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class IndexController extends BaseController
{
    public function __invoke()
    {
        $log = auth()->user() ? auth()->user()->email : request()->ip();
        Log::info('User requested tag ' . $log);

        return TagResource::collection($this->getCasheOrStore());
    }
    private function getCasheOrStore()
    {
        $tagsFromCashe = Cache::get('tags');
        if ($tagsFromCashe) {
            return $tagsFromCashe;
        } else {
            $tags = Tag::all();
            Cache::forever('tags',$tags);
            return $tags;
        }
    }
}
