<?php

namespace App\Http\Controllers\Admin\Result;

use App\Http\Controllers\Admin\Result\BaseController;
use App\Http\Requests\Result\StoreRequest;
use App\Http\Resources\Result\ResultResource;
use App\Models\Result;
use Illuminate\Http\Request;

class UpdateController extends BaseController
{
    public function __invoke(StoreRequest $request, Result $result)
    {
        $data = $request->validated();
        $response = $this->service->update($result, $data);
        if ($response instanceof Result) {
            return new ResultResource($response);
        } else {
            return response(['data' => $response]);
        }
    }
}
