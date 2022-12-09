<?php

namespace App\Services\Event;

use App\Models\Event;

class Service
{
   public function store($data)
   {
      $result=Event::firstOrCreate($data);
      return $result;
   }
   public function update($result, $data)
   {
      $result->update($data);
      return $result;
   }
}
