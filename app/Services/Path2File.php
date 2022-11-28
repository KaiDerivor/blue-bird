<?php

namespace App\Services;

class Path2File 
{
   protected function makePath($item){
      return storage_path() . '\app\public\\' . str_replace('/', '\\', $item);;
   }
}
