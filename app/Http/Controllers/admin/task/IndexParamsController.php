<?php

namespace App\Http\Controllers\admin\task;

use App\Http\Controllers\Controller;
use App\Http\Resources\Task\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;

class IndexParamsController extends Controller
{
    public function __invoke($category, $tag)
    {
        // $tasks=Task::where('category_id',$category)->where('tag_id',$tag)->orderBy('number_of_task','asc')->get();
        dd('ddd');
        // return TaskResource::collection($tasks);
    }
}
