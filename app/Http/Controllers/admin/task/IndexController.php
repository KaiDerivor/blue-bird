<?php

namespace App\Http\Controllers\Admin\Task;

use App\Http\Filters\SubFilter;
use App\Http\Requests\Task\FilterRequest;
use App\Http\Resources\Task\TaskResource;
use App\Http\Resources\Task\TaskSavedResource;
use App\Models\Category;
use App\Models\Task;
use Illuminate\Support\Facades\Log;

class IndexController extends BaseController
{

    public function __invoke(FilterRequest $request)
    {
        $log = auth()->user() ? auth()->user()->email : request()->ip();
        $data = $request->validated();
        if (isset($data['ids'])) {
            Log::info('User requested liked tasks ' . $log);
            $ids = explode(',', $data['ids']);
            $tasks = Task::find($ids);
            return  TaskSavedResource::collection(($tasks));
        }
        Log::info('User requested tasks/test ' . $log);

        $page = $data['page'] ?? 1;
        $perPage = $data['per_page'] ?? 50;

        $filter = app()->make(SubFilter::class, ['queryParams' => array_filter($data)]);

        $filter = new SubFilter($data);
        $subjects = Task::filter($filter)->paginate($perPage, ['*'], 'page', $page);
        $subjects->map(function ($subject, $key) {
            $subject->number_of_task = $key + 1;

            return $subject;
        });
        return  TaskResource::collection(($subjects));
    }
}
