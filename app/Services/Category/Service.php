<?php

namespace App\Services\Category;

use App\Models\Category;

class Service
{
   public function update($category, $data)
   {
      $category->update($data);
      return $category;
   }
   public function store($category)
   {
        return Category::firstOrCreate($category);
   }

}
