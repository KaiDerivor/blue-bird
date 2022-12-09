<?php


namespace App\Http\Controllers\Admin\Event;

use App\Http\Controllers\Admin\Event\BaseController;
use App\Http\Resources\Event\EventResource;
use App\Models\Event;
use Illuminate\Http\Request;

class IndexController extends BaseController
{
    public function __invoke()
    {
        $events = Event::all();
        return EventResource::collection($events);
    }
}
