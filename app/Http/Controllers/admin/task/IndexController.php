<?php

namespace App\Http\Controllers\Admin\Task;

use App\Http\Filters\SubFilter;
use App\Http\Requests\Task\FilterRequest;
use App\Http\Resources\Task\TaskResource;
use App\Models\Category;
use App\Models\Task;

class IndexController extends BaseController
{
    // public function __invoke(){
    //     $tasks=Task::all();
    //     return TaskResource::collection($tasks);
    // }
    public function __invoke(FilterRequest $request)
    {
        $data = $request->validated();
        $page = $data['page'] ?? 1;
        $perPage = $data['per_page'] ?? 50;

        $filter = app()->make(SubFilter::class, ['queryParams' => array_filter($data)]);

        $filter = new SubFilter($data);
        $subjects = Task::filter($filter)->orderBy('number_of_task','asc')->paginate($perPage,['*'],'page',$page);
        return  TaskResource::collection(($subjects));
    }
}
