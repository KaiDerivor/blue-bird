<?php

namespace App\Services\Result;

use App\Models\Result;
use Illuminate\Support\Facades\Log;

class Service
{
   public function store($data)
   {
      Log::info('Trying create result by ' , $data);
      $result = Result::firstOrCreate(['slig' => $data['slug']], $data);
      return $result;
   }
   public function update($result, $data)
   {
      Log::info('Trying update result by ', $data);
      $result->update($data);
      return $result;
   }
}
