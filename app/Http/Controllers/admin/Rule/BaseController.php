<?php

namespace App\Http\Controllers\Admin\Rule;

use App\Http\Controllers\Controller;
use App\Services\Rule\Service;
use Illuminate\Http\Request;

class BaseController extends Controller
{
    protected $service;
    public function __construct(Service $service)
    {
        $this->service = $service;
    }
}
