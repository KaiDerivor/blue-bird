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
        $response = $this->service->store($data);
        if ($response instanceof Theme) {
            return new ThemeResource($response);
        } else {
            return response(['data' => $response]);
        }
    }
}
