<?php

namespace App\Services\Theme;

use App\Models\Theme;
use App\Services\Path2File;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
class Service extends Path2File
{
   public function update($tag, $data)
   {
      Log::info('Trying update theme by ' . join(" ",$data));

      if (isset($data['img'])) {
         $image_path  = $this->makePath($tag['img']);
         if (File::exists($image_path)) {
            File::delete($image_path);
         }
         $data['img'] = Storage::disk('public')->put('/img-theme', $data['img']);
      }
      if (!isset($data['slug'])) {
         $data['slug'] = Str::slug($data['title'], '-');
      }
      $tag->update($data);
      return $tag;
   }
   public function store($data)
   {
      Log::info('Trying create theme by ' . join(" ",$data));

      if (isset($data['img'])) {
         $data['img'] = Storage::disk('public')->put('/img-theme', $data['img']);
      }
      if (!isset($data['slug'])) {
         $data['slug'] = Str::slug($data['title'], '-');
      }
      $theme = Theme::firstOrCreate(['textUrl' => $data['textUrl'], 'title' => $data['title']], $data);
      return $theme;
   }
}
