<?php

namespace App\Http\Controllers\Admin\Result;

use App\Http\Controllers\Admin\Result\BaseController;
use App\Http\Requests\Result\StoreRequest;
use App\Http\Resources\Result\ResultResource;
use Illuminate\Http\Request;

class StoreController extends BaseController
{
    public function __invoke(StoreRequest $request)
    {
        $data = $request->validated();
        $data = $this->service->store($data);
        return new ResultResource($data);
    }
}
