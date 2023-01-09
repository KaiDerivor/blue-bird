<?php

namespace App\Services\Rule;

use App\Models\Rule;
use App\Services\Path2File;
use Doctrine\DBAL\Platforms\Keywords\DB2Keywords;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class Service extends Path2File
{
   public function update($rule, $data)
   {
      Log::info('Trying update rule by ' . join(" ", $data));
      $rule->update($data);
      return $rule;
   }
   public function store($data)
   {
      Log::info('Trying create rule by ' . join(" ", $data));
      try {
         DB::beginTransaction();
         $theme = Rule::firstOrCreate(['title' => $data['title'], 'category_id' => $data['category_id']], $data);
         DB::commit();
      } catch (\Exception $ex) {
         DB::rollBack();
         Log::error("Can't create rule Error text:" . $ex->getMessage());
         return $ex->getMessage();
      }
      return $theme;
   }
}
