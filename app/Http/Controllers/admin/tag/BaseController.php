<?php

namespace App\Http\Controllers\Admin\Tag;

use App\Http\Controllers\Controller;
use App\Services\Tag\Service;

class BaseController extends Controller
{
   public $service;
   public function __construct(Service $service)
   {
      $this->service = $service;
   }
}
