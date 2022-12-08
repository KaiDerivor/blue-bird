<?php

namespace App\Services\Task;

use App\Models\Task;
use App\Services\Path2File;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class Service extends Path2File
{

   public function update($task, $data)
   {

         if (isset($data['task'])) {
            $image_path  = $this->makePath($task['task']);
            if (File::exists($image_path)) {
               File::delete($image_path);
            }
            $data['task'] = Storage::disk('public')->put('/img-tasks', $data['task']);
         }
      // return $task;
      if (strip_tags($data['content']) === 'NONE') {
         $data['content'] = '';
      }

      $task->update($data);
      return $task;
   }
   public function store($data)
   {
      $task = Task::where([
         ['category_id', '=', $data['category_id']],
         ['tag_id', '=', $data['tag_id']],
         ['number_of_task', '=', $data['number_of_task']]
      ])->first();
      if ($task) {
         return "This records alredy exists. ID:" . $task->id;
      }
 
      try {
         DB::beginTransaction();
         if(isset($data['task']))
         $data['task'] = Storage::disk('public')->put('/img-tasks', $data['task']);

         $data = Task::create($data);

         DB::commit();
      } catch (\Exception $th) {
         DB::rollBack();
         dd($th->getMessage());
         return $th->getMessage();
      }
      return $data;
   }
}
