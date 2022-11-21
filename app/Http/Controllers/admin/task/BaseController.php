<?php

namespace App\Http\Controllers\Admin\Task;

use App\Http\Controllers\Controller;
use App\Services\Task\Service;

class BaseController extends Controller
{
   public $service;
   public function __construct(Service $service)
   {
      $this->service = $service;
   }
}
