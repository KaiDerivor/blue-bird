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
        
        $response = $this->service->store($data);
        if ($response instanceof Task) {
            return new TaskResource($response);
        } else {
            return response(['data' => $response]);
        }
    }
}
