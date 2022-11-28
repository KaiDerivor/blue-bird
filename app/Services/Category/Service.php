<?php

namespace App\Services\Category;

use App\Models\Category;
use App\Services\Path2File;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class Service extends Path2File
{
   public function update($category, $data)
   {
      $tags=$data['tags'];
      unset($data['tags']);
      if (isset($data['img'])) {
         $image_path  = $this->makePath($category['img']);

         if (File::exists($image_path)) {
            File::delete($image_path);
         }
         $data['img'] = Storage::disk('public')->put('/img-categories', $data['img']);
      }

      $category->update($data);
      $category->tags()->sync($tags);
      $category->fresh();
      return $category;
   }
   public function store($category)
   {
      $tags=$category['tags'];
      unset($category['tags']);

      $category['img'] = Storage::disk('public')->put('/img-categories', $category['img']);

      $category= Category::firstOrCreate($category);
      $category->tags()->attach($tags);
   }
}
