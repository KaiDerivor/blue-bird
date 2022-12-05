<?php

namespace App\Http\Controllers\Admin\Result;

use App\Http\Controllers\Controller;
use App\Http\Requests\Result\StoreRequest;
use App\Http\Resources\Result\ResultResource;
use App\Models\Result;
use Illuminate\Http\Request;

class UpdateController extends Controller
{
    public function __invoke(StoreRequest $request, Result $result)
    {
        $resultUpd = $this->service->update($request, $result);
        return new ResultResource($resultUpd);
    }
}
