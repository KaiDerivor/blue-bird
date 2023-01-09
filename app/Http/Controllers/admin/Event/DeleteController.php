<?php

namespace App\Http\Controllers\Admin\Event;

use App\Http\Controllers\Admin\Event\BaseController;
use App\Http\Resources\Event\EventResource;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class DeleteController extends BaseController
{
    public function __invoke(Event $event)
    {
        $log = auth()->user() ? auth()->user()->email : request()->ip();
        Log::warning('User ' . $log . ' delete category->id ' . $event->id);

        $event->delete();
        $events = Event::orderBy('created_at', 'desc')->get();
        return EventResource::collection($events);
    }
}
