<?php

namespace App\Http\Controllers\Admin\Theme;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\Admin\Theme\BaseController;
use App\Http\Requests\Theme\ThemeRequestStore;
use App\Http\Resources\Theme\ThemeResource;
use App\Models\Theme;

class StoreController extends BaseController
{
    public function __invoke(ThemeRequestStore $request)
    {
        $data = $request->validated();
        $theme = $this->service->store($data);
        if ($theme instanceof Theme) {
            return new ThemeResource($theme);
        } else {
            return response(['data' => $theme]);
        }
    }
}
