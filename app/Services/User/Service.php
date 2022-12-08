<?php

namespace App\Services\User;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class Service
{
   public function update($data)
   {
      $user = User::find(auth()->user()->id);
      $likedTasks = [];

      if (isset($data['likedTasks'])) {
         $likedTasks = $data['likedTasks'];
         unset($data['likedTasks']);
      }
      $user->update($data);
      $user->tasks()->sync($likedTasks);
      $user->fresh();
      return $user;
   }
   public function store($data)
   {
      User::create($data);
   }
}
