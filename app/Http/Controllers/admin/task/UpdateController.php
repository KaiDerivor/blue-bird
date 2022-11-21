<?php

namespace App\Http\Controllers\Admin\Task;

use App\Http\Requests\Task\RequestUpdate;
use App\Models\Task;

class UpdateController extends BaseController
{
    public function __invoke(RequestUpdate $request, $id)
    {
        $task=Task::find($id);
        $data=$request->validated();
        $this->service->update($task,$data);
        return redirect()->route('admin.task.index');
    }
}
