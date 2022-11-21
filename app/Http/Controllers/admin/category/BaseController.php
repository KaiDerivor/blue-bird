<?php

namespace App\Http\Controllers\Admin\Category;

use App\Http\Controllers\Controller;
use App\Services\Category\Service;

class BaseController extends Controller
{
   public $service;
   public function __construct(Service $service)
   {
      $this->service = $service;
   }
}
