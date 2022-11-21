<?php

namespace App\Services\Tag;

use App\Models\Tag;

class Service
{
   public function update($tag,$data)
   {
      $tag->update($data);
   }
   public function store($data)
   {
      Tag::firstOrCreate($data);
   }
}
