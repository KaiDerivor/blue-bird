<?php

namespace App\Services\User;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class Service
{
   public function update($data)
   {
      if (auth()->user() == null) {
         abort(401);
      }
      $user = User::find(auth()->user()->id);
      $chart = (array) json_decode($user->chart);
      $likedCategories = [];
      if (isset($data['password'])) {
         $data['passsword'] = Hash::make($data['passsword']);
      }
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
