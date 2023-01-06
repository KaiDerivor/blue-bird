<?php

namespace App\Services\Result;

use App\Models\Result;
use Illuminate\Support\Facades\Log;

class Service
{
   public function store($data)
   {
      Log::info('Trying create result by ' . join(" ",$data));
      $result=Result::firstOrCreate($data);
      return $result;
   }
   public function update($result, $data)
   {
      Log::info('Trying update result by ' . join(" ",$data));
      $result->update($data);
      return $result;
   }
}
