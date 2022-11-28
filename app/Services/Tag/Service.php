<?php

namespace App\Services\Tag;

use App\Models\Tag;
use App\Services\Path2File;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class Service extends Path2File
{
   public function update($tag, $data)
   {
      if (isset($data['img'])) {
         $image_path  = $this->makePath($tag['img']);
         if (File::exists($image_path)) {
            File::delete($image_path);
         }
         $data['img'] = Storage::disk('public')->put('/img-tags', $data['img']);
      }
      $tag->update($data);
      return $tag;
   }
   public function store($data)
   {
      if (isset($data['img'])) {
         $data['img'] = Storage::disk('public')->put('/img-tags', $data['img']);
      }
      $tag = Tag::firstOrCreate($data);
      return $tag;
   }
}
