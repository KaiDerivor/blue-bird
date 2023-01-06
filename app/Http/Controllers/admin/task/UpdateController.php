<?php

namespace App\Http\Controllers\Admin\Task;

use App\Http\Requests\Task\RequestUpdate;
use App\Http\Resources\Task\TaskResource;
use App\Models\Task;

class UpdateController extends BaseController
{
    public function __invoke(RequestUpdate $request, Task $task)
    {
        $data = $request->validated();
        $response = $this->service->update($task, $data);
        if ($response instanceof Task) {
            return new TaskResource($response);
        } else {
            return response(['data' => $response]);
        }
    }
}
