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
      Category::firstOrCreate($category);
   }
}
