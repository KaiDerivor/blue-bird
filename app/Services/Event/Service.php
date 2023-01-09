<?php

namespace App\Services\Event;

use App\Models\Event;
use Illuminate\Support\Facades\Log;

class Service
{
   public function store($data)
   {
      Log::info('Trying create event by ' ,$data);
      $result=Event::firstOrCreate($data);
      return $result;
   }
   public function update($result, $data)
   {
      Log::info('Trying update event by ' ,$data);
      $result->update($data);
      return $result;
   }
}
