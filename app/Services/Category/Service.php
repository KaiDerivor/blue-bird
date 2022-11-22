<?php

namespace App\Services\Category;

use App\Models\Category;

class Service
{
   public function update($category, $data)
   {
      $category->update($data);
   }
   public function store($category)
   {
      if (Category::where('category', $category)->exists()) {
         return 'Record alredy exist';
      } else {
         Category::firstOrCreate($category);
      }
   }

}
