<?php

namespace App\Services\Theme;

use App\Models\Theme;
use App\Services\Path2File;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Service extends Path2File
{
   public function update($theme, $data)
   {
      Log::info('Trying update theme by ' . join(" ", $data));
      try {
         DB::beginTransaction();

         if (isset($data['img'])) {
            $image_path  = $this->makePath($theme['img']);
            if (File::exists($image_path)) {
               File::delete($image_path);
            }
            $data['img'] = Storage::disk('public')->put('/img-theme', $data['img']);
         }
         if (!isset($data['slug'])) {
            $data['slug'] = Str::slug($data['title'], '-');
         }
         $theme->update($data);

         DB::commit();
      } catch (\Exception $ex) {
         DB::rollBack();
         Log::error("Can't update theme id:$theme->id Error text:" . $ex->getMessage());
         return $ex->getMessage();
      }

      return $theme;
   }
   public function store($data)
   {
      Log::info('Trying create theme by ' . join(" ", $data));

      try {
         DB::beginTransaction();
         if (isset($data['img'])) {
            $data['img'] = Storage::disk('public')->put('/img-theme', $data['img']);
         }
         if (!isset($data['slug'])) {
            $data['slug'] = Str::slug($data['title'], '-');
         }
         $theme = Theme::firstOrCreate(['slug' => $data['slug'], 'title' => $data['title']], $data);
         DB::beginTransaction();
      } catch (\Exception $ex) {
         DB::rollBack();
         Log::error("Can't create theme Error text:" . $ex->getMessage());
         return $ex->getMessage();
      }

      return $theme;
   }
}
