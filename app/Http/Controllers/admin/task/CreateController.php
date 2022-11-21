<?php

namespace App\Http\Controllers\Admin\Task;

use App\Models\Category;
use App\Models\Tag;

class CreateController extends BaseController
{
    public function __invoke()
    {
        $tags = Tag::all();
        $categories = Category::all();
        return view('admin.task.create', compact('tags', 'categories'));
    }
}
