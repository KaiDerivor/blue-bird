<?php

namespace App\Http\Controllers\Admin\Task;

use App\Http\Resources\Task\TaskResource;
use App\Models\Task;
use Illuminate\Support\Facades\Log;

class DeleteController extends BaseController
{
    public function __invoke(Task $task)
    {
      $log = auth()->user() ? auth()->user()->email : request()->ip();
      Log::warning('User ' .$log. ' delete category->id ' . $task->id);

      $task->delete();
      $tasks=Task::all();
      return TaskResource::collection($tasks);
    }
}
