<?php

namespace App\Services\User;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class Service
{
   public function update($data)
   {
      $user = User::find(auth()->user()->id);
      // $chart = (array) json_decode($data['chart']);
      $chart = (array) json_decode($user->chart);
      // $chart=$user->chart;
      // dd($chart);
      // dd(array_key_exists(1,$chart));
      $likedCategories = [];

      if (isset($data['likedTasks'])) {
         $likedTasks = $data['likedTasks'];

         unset($data['likedTasks']);
         $user->tasks()->sync($likedTasks);
      }
      if (isset($data['likedCategories'])) {
         $likedCategories = $data['likedCategories'];
         $chartKeys = array_keys($chart);
         foreach ($chartKeys as $key) {
            if (!in_array($key, $likedCategories)) {
               unset($chart[$key]);
            }
         }
         foreach ($likedCategories as  $value) {
            if (!in_array($value, array_values($chartKeys))) {
               $chart[$value] = [];
            }
         }
       
         $data['chart'] = json_encode($chart);
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
