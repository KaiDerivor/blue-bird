<?php

namespace App\Http\Controllers\Admin\Task;

use App\Http\Requests\Task\RequestStore;
use App\Http\Resources\Task\TaskResource;
use App\Models\Task;

class StoreController extends BaseController
{
    public function __invoke(RequestStore $request)
    {
        $data = $request->validated();
        
        $msg = $this->service->store($data);
        // return response([$msg['test_qa']]);
        return new TaskResource($msg);
    }
}
