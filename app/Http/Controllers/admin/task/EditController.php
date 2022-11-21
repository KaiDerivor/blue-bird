<?php

namespace App\Http\Controllers\Admin\Task;

use App\Models\Task;
use App\Models\Tag;
use App\Models\Category;

class EditController extends BaseController
{
    public function __invoke($id)
    {
        $task = Task::find($id);
        $tags = Tag::all();
        $categories = Category::all();
        $tagTasks = $task->tags;
        $selectedTags = [];
        foreach ($tagTasks as $tag) {
            $selectedTags[] = $tag->id;
        }
        return view('admin.task.edit', compact('task', 'tags', 'categories', 'selectedTags'));
    }
}
