<?php

namespace App\Services\Tag;

use App\Models\Tag;

class Service
{
   public function update($tag, $data)
   {
      $tag->update($data);
      return $tag;
   }
   public function store($data)
   {
      $tag = Tag::firstOrCreate($data);
      return $tag;
   }
}
