<?php


namespace App\Http\Controllers\Admin\Event;

use App\Http\Controllers\Admin\Event\BaseController;
use App\Http\Requests\Event\UpdateRequest;
use App\Http\Resources\Event\EventResource;
use App\Models\Event;
use Illuminate\Http\Request;

class UpdateController extends BaseController
{
    public function __invoke(UpdateRequest $request, Event $event)
    {
        $data = $request->validated();
        $response = $this->service->update($event, $data);
        if ($response instanceof Event) {
            return new EventResource($response);
        } else {
            return response(['data' => $response]);
        }
    }
}
