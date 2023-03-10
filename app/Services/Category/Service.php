<?php

namespace App\Services\Category;

use App\Http\Resources\Category\CategoryTagResource;
use App\Models\Category;
use App\Models\CategoryTags;
use App\Services\Path2File;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Service extends Path2File
{
   public function update($category, $data)
   {
      Log::info('Trying update categoryTag by ' , $data);
      try {
         DB::beginTransaction();
         if (isset($data['tags'])) {

            $tags = $data['tags'];
            unset($data['tags']);
            $category->tags()->sync($tags);
         }
         if (isset($data['img'])) {
            $image_path  = $this->makePath($category['img']);
            if (File::exists($image_path)) {
               File::delete($image_path);
            }
            $data['img'] = Storage::disk('public')->put('/img-categories', $data['img']);
         }
         if (!isset($data['slug'])) {
            $data['slug'] = Str::slug($data['title'], '-');
         }
         $category->update($data);
         $category->fresh();
         DB::commit();
      } catch (\Exception $ex) {
         DB::rollBack();
         Log::error("Can not update category id:$category->id. Error:" . $ex->getMessage());
         return $ex->getMessage();
      }
      return $category;
   }
   public function store($category)
   {
      Log::info('Trying create category by ' , $category);
      try {
         DB::beginTransaction();
         $tags = $category['tags'];
         unset($category['tags']);
         if (!isset($category['slug'])) {
            $category['slug'] = Str::slug($category['title'], '-');
         }
         $category['img'] = Storage::disk('public')->put('/img-categories', $category['img']);

         $category = Category::firstOrCreate($category);
         $category->tags()->attach($tags);
         DB::commit();
      } catch (\Exception $ex) {
         DB::rollBack();
         Log::error("Can't create category. Error text:" . $ex->getMessage());
         return $ex->getMessage();
      }
      return $category;
   }
   public function updateCategoryTags($categoryTag, $data)
   {
      Log::info('Trying update categoryTag by ' , $data);
      try {
         DB::beginTransaction();
         if (isset($data['table200img'])) {
            $image_path  = $this->makePath($data['table200img']);
            if (File::exists($image_path)) {
               File::delete($image_path);
            }
            $data['table200img'] = Storage::disk('public')->put('/img-category-tags', $data['table200img']);
         }
         if (isset($data['table12img'])) {
            $image_path  = $this->makePath($data['table12img']);
            if (File::exists($image_path)) {
               File::delete($image_path);
            }
            $data['table12img'] = Storage::disk('public')->put('/img-category-tags', $data['table12img']);
         }
         $categoryTag->update($data);
         DB::commit();
      } catch (\Exception $ex) {
         DB::rollBack();
         Log::error("Can't update categoryTag id:$categoryTag->id Error text: " . $ex->getMessage());
         return $ex->getMessage();
      }
      return new CategoryTagResource($categoryTag);
   }
}
