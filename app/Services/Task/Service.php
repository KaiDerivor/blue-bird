<?php

namespace App\Services\Task;

use App\Models\Task;
use App\Services\Tag\Service as TagService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class Service
{

   public function update($task, $data)
   {
      if (isset($data['file'])) {
         $data['task'] = Storage::disk('public')->put('/img-tasks', $data['file']);
         unset($data['file']);
      }


      if (strip_tags($data['content']) === 'NONE') {
         $data['solution'] = '';
      } elseif ($data['content']) {
         $data['solution'] = $data['content'];
      }

      $tags = $data['tags'];
      unset($data['tags']);
      unset($data['content']);
      // $t=Task::where('category_id',$data['category_id'],'number_of_task',$data['number_of_task']);
      // dd($t);
      $task->update($data);

      $task->tags()->sync($tags);
      // return $subject->fresh();
   }
   public function store($data)
   {
      try {
         DB::beginTransaction();
         if (isset($data['tags'])) {
            $tags = $data['tags'];
            unset($data['tags']);
         }

         if (isset($data['content'])) {
            $data['solution'] = $data['content'];
            unset($data['content']);
         }

         $data['task'] = Storage::disk('public')->put('/img-tasks', $data['file']);
         unset($data['file']);


         $data = Task::create($data);


         $data->tags()->attach($tags);
         DB::commit();
      } catch (\Exception $th) {
         DB::rollBack();
         dd($th->getMessage());
         return $th->getMessage();
      }
   }
}
