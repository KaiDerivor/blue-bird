<?php

namespace App\Http\Controllers\Admin\Category;

use App\Http\Requests\Category\RequestCreate;

class StoreController extends BaseController
{
    public function __invoke(RequestCreate $request)
    {
        // dd('ff');

        $data = $request->validated();

        $msg = $this->service->store($data);
        if ($msg) {
            return response([$msg]);
        } else {
            return response(['Created']);
        }
    }
}
