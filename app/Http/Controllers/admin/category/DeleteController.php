<?php

namespace App\Http\Controllers\Admin\Category;

use App\Http\Requests\Category\DeleteRequest;
use App\Models\Category;

class DeleteController extends BaseController
{
    public function __invoke(DeleteRequest $request)
    {
        $id = $request->validated();
        $msg = $this->service->delete($id);
        // return response([$id]);
        return response([$msg]);
    }
}
