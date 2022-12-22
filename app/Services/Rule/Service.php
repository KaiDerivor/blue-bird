<?php

namespace App\Services\Rule;

use App\Models\Rule;
use App\Services\Path2File;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class Service extends Path2File
{
   public function update($rule, $data)
   {
      $rule->update($data);
      return $rule;
   }
   public function store($data)
   {
      $theme = Rule::firstOrCreate(['title' => $data['title'],'category_id'=>$data['category_id']], $data);
      return $theme;
   }
}
