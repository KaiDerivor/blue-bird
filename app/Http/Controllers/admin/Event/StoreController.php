<?php


namespace App\Http\Controllers\Admin\Event;

use App\Http\Controllers\Admin\Event\BaseController;
use App\Http\Requests\Event\StoreRequest;
use App\Http\Resources\Event\EventResource;
use App\Models\Event;
use Illuminate\Http\Request;

class StoreController extends BaseController
{
    public function __invoke(StoreRequest $request)
    {
        $data=$request->validated();
        $msg=$this->service->store($data);
        if($msg instanceof Event){
            return new EventResource($msg);
        }else{
            return response(['data'=>$msg]);
        }
    }
}
