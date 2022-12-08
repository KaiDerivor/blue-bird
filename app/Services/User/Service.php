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
      $likedCategories=[];

      if (isset($data['likedTasks'])) {
         $likedTasks = $data['likedTasks'];
         unset($data['likedTasks']);
         $user->tasks()->sync($likedTasks);
      }
      
      if (isset($data['likedCategories'])) {
         $likedCategories = $data['likedCategories'];
         unset($data['likedCategories']);
         $user->categories()->sync($likedCategories);
      }
      $user->update($data);
      $user->fresh();
      return $user;
   }
   public function store($data)
   {
      User::create($data);
   }
}
