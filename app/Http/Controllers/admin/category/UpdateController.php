<?php

namespace App\Http\Controllers\Admin\Category;

use App\Http\Requests\Category\RequestUpdate;
use App\Models\Category;

class UpdateController extends BaseController
{
    public function __invoke(RequestUpdate $request)
    {
        $data = $request->validated();
        
        $this->service->update($data);
        return response(['Crefghnated']);
        // return response([$data]);



    }
}
