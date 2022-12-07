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
        $resultUpd = $this->service->update($result, $data);
        return new ResultResource($resultUpd);
    }
}
