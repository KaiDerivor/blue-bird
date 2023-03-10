<?php

namespace App\Services\Tag;

use App\Models\Tag;
use App\Services\Path2File;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Service extends Path2File
{
   public function update($tag, $data)
   {
      Log::info('Trying update tag by ' , $data);
      try {
         DB::beginTransaction();
         DB::commit();
         if (isset($data['img'])) {
            $image_path  = $this->makePath($tag['img']);
            if (File::exists($image_path)) {
               File::delete($image_path);
            }
            $data['img'] = Storage::disk('public')->put('/img-tags', $data['img']);
         }
         if (!isset($data['slug'])) {
            $data['slug'] = Str::slug($data['title'], '-');
         }
         $tag->update($data);
      } catch (\Exception $ex) {
         DB::rollBack();
         Log::error("Can't update tag id:$tag->id Error text:" . $ex->getMessage());
         return $ex->getMessage();
      }
      return $tag;
   }
   public function store($data)
   {
      Log::info('Trying create tag by ' , $data);
      try {
         DB::beginTransaction();
         if (isset($data['img'])) {
            $data['img'] = Storage::disk('public')->put('/img-tags', $data['img']);
         }
         if (!isset($data['slug'])) {
            $data['slug'] = Str::slug($data['title'], '-');
         }
         $tag = Tag::firstOrCreate(['slug' => $data['slug']], $data);
         DB::commit();
      } catch (\Exception $ex) {
         DB::rollBack();
         Log::error("Can't create tag Error text:" . $ex->getMessage());
         return $ex->getMessage();
      }
      return $tag;
   }
}
