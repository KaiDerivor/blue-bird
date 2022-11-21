<?php

namespace App\Http\Controllers\Admin\Category;

use App\Http\Requests\Category\Request;

class StoreController extends BaseController
{
    public function __invoke(Request $request)
    {
        $data=$request->validated();

        $this->service->store($data);

        return redirect()->route('admin.category.index');
    }
}
