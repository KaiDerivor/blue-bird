<?php

namespace App\Http\Controllers\Personal\Like;

use App\Http\Controllers\Controller;
use App\Models\Task;

class DeleteController extends Controller
{
    public function __invoke(Task $task)
    {
        // dd($task);
        auth()->user()->likedTasks()->detach($task->id);

        return redirect()->route('personal.like.index');
    }
}
