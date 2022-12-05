<?php

namespace App\Services\Result;

use App\Models\Result;

class Service
{
   public function store($data)
   {
      $result=Result::firstOrCreate($data);
      return $result;
   }
   public function update($result, $data)
   {
      $result->update($data);
      return $result;
   }
}
