<?php

namespace App\Http\Controllers\Admin\Task;

use App\Http\Requests\Task\RequestStore;

class StoreController extends BaseController
{
    public function __invoke(RequestStore $request)
    {
        $data = $request->validated();
        return response([$data]);
        $this->service->store($data);
        return redirect()->route('admin.task.index');
    }
}
