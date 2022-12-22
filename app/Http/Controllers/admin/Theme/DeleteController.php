<?php

namespace App\Http\Controllers\Admin\Theme;

use App\Http\Controllers\Admin\Theme\BaseController;
use App\Http\Resources\Theme\ThemeResource;
use App\Models\Theme;
use Illuminate\Http\Request;

class DeleteController extends BaseController
{
    public function __invoke(Theme $theme){
        $theme->delete();
        $themes=Theme::all();
        return ThemeResource::collection($themes);
    }
}
