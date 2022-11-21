<?php

namespace App\Services\Category;

use App\Models\Category;

class Service
{
   public function update($data)
   {
      $category = Category::find($data['id']);
      $category->update(['category' => $data['category']]);
   }
   public function store($category)
   {
      if (Category::where('category', $category)->exists()) {
         return 'Record alredy exist';
      } else {
         Category::firstOrCreate($category);
      }
   }
   public function delete($id)
   {
      $category = Category::find($id);
      if (count($category) >= 1) {
         $category[0]->delete();
         return 'Deleted';
      } else {
         return 'Such category not found';
      }
   }
}
