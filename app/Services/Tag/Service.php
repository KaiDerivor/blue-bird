<?php

namespace App\Services\Tag;

use App\Models\Tag;

class Service
{
   public function update($tag, $data)
   {
      if ($tag) {
         $tag->update($data);
         return 'Updated';
      } else {
         return 'Noy found such record';
      }
   }
   public function store($data)
   {
      if (Tag::where('tag', $data)->exists()) {
         return 'Record alredy exist';
      } else {
         Tag::firstOrCreate($data);
         return 'Created';
      }
   }
}
