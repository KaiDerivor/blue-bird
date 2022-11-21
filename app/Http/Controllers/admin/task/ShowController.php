<?php

namespace App\Http\Controllers\Admin\Task;

use App\Models\Task;

class ShowController extends BaseController
{
    public function __invoke($id)
    {
        $task = Task::find($id);
        $tags = $task->tags;
        $category = $task->category;
        return view('admin.task.show', compact('task', 'tags','category'));
    }
}
