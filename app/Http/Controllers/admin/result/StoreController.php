<?php

namespace App\Http\Controllers\Admin\Result;

use App\Http\Controllers\Admin\Result\BaseController;
use App\Http\Requests\Result\StoreRequest;
use App\Http\Resources\Result\ResultResource;
use App\Models\Result;
use Illuminate\Http\Request;

class StoreController extends BaseController
{
    public function __invoke(StoreRequest $request)
    {
        $data = $request->validated();
        $response = $this->service->store($data);
        if ($response instanceof Result) {
            return new ResultResource($response);
        } else {
            return response(['data' => $response]);
        }
    }
}
