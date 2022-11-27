<?php

namespace App\Http\Controllers\Admin\Task;

use App\Http\Resources\Task\TaskResource;
use App\Models\Task;

class DeleteController extends BaseController
{
    public function __invoke(Task $task)
    {
      $task->delete();
      $tasks=Task::all();
      return TaskResource::collection($tasks);
    }
}
