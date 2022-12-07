<?php

namespace App\Http\Controllers\Admin\Result;

use App\Http\Controllers\Admin\Result\BaseController;
use App\Http\Resources\Result\ResultResource;
use App\Models\Result;
use Illuminate\Http\Request;

class DeleteController extends BaseController
{
    public function __invoke(Result $result)
    {
        $result->delete();
        $results=Result::all();
        return ResultResource::collection($results);
    }
}
