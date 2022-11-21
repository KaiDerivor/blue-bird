<?php

namespace App\Http\Controllers\Admin\Category;

use App\Http\Requests\Category\RequestUpdate;
use App\Models\Category;

class UpdateController extends BaseController
{
    public function __invoke(RequestUpdate $request,Category $category){
        $data=$request->validated();

        $this->service->update($category,$data);

        return redirect()->route('admin.category.index');
    }
}
