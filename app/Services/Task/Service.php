<?php

namespace App\Services\Task;

use App\Models\Task;
use App\Services\Path2File;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class Service extends Path2File
{

   public function update($task, $data)
   {
      Log::info('Trying update task by ' . join(" ",$data));
      if (isset($data['img'])) {
         $image_path  = $this->makePath($task['img']);
         if (File::exists($image_path)) {
            File::delete($image_path);
         }
         $data['img'] = Storage::disk('public')->put('/img-tasks', $data['img']);
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
      Log::info('Trying create task by ' . join(" ",$data));

      // $task = Task::where([
      //    ['category_id', '=', $data['category_id']],
      //    ['tag_id', '=', $data['tag_id']],
      //    ['number_of_task', '=', $data['number_of_task']]
      // ])->first();
      // if ($task) {
      //    return "This records alredy exists. ID:" . $task->id;
      // }

      try {
         DB::beginTransaction();
         if (isset($data['img']))
            $data['img'] = Storage::disk('public')->put('/img-tasks', $data['img']);

         $data = Task::firstOrCreate([
            'category_id' => $data['category_id'],
            'tag_id' => $data['tag_id'],
            'number_of_task' => $data['number_of_task']
         ], $data);

         DB::commit();
      } catch (\Exception $th) {
         DB::rollBack();
         Log::error("Can't to create task by " . join(" ",$data) . '. Error text:' . $th->getMessage());
         return 'Something went wrong';
      }
      return $data;
   }
}
