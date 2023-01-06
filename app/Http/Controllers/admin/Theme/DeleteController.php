<?php

namespace App\Http\Controllers\Admin\Theme;

use App\Http\Controllers\Admin\Theme\BaseController;
use App\Http\Resources\Theme\ThemeResource;
use App\Models\Theme;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class DeleteController extends BaseController
{
    public function __invoke(Theme $theme){
        $log = auth()->user() ? auth()->user()->email : request()->ip();
        Log::warning('User ' . $log  . ' delete category->id ' . $theme->id);

        $theme->delete();
        $themes=Theme::all();
        return ThemeResource::collection($themes);
    }
}
