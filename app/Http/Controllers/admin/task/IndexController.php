<?php

namespace App\Http\Controllers\Admin\Task;

use App\Models\Category;
use App\Models\Task;

class IndexController extends BaseController
{
    public function __invoke(){
        $tasks=Task::all();
        $categories=Category::all();
        $categories=$categories->toArray();
        return view('admin.task.index',compact('tasks','categories'));
    }
}
