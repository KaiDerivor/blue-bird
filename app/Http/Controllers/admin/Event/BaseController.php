<?php


namespace App\Http\Controllers\Admin\Event;

use App\Http\Controllers\Controller;
use App\Services\Event\Service;
use Illuminate\Http\Request;

class BaseController extends Controller
{
    protected $service;

    public function __construct(Service $service)
    {
        $this->service = $service;
    }
}
